import { Helmet } from 'react-helmet-async';
import { redsysScript } from '../../pages/Order/redsys';
import styles from './paymentForm.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDeleteCartMutation } from '../../store/api/cart.api';
import { initialReq, EMV3DS, baseUrl, localUrl } from '../../utils/vars';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/modalSlice';
import { deleteDiscountCode, fetchData } from '../../utils';
import { PaymentAuth } from '../PaymentAuth';

export function PaymentForm({ setOrder, orderNo, totalPrice, discountCode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);
  const iframePage = useRef(null);

  const [threeDSMethod, setThreeDSMethod] = useState(null);
  const [timer, setTimer] = useState(null);
  const [authorizationObj, setAuthorizationObj] = useState(null);
  const [creq, setCreq] = useState(null);

  const [deleteCart] = useDeleteCartMutation();

  const reqAuthorization = useCallback(async function (authObj) {
    try {
      const resPaymentAuth = await fetchData(`${baseUrl}payment/authorization`,
        {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify(authObj)
        })
      // console.log(`ANSWER from ${baseUrl}payment/authorization`, resPaymentAuth);
      if (resPaymentAuth.message === 'Response 0000') {
        navigate('/');
        dispatch(showModal('order'))
        await deleteCart().unwrap();
        if (discountCode) await deleteDiscountCode(discountCode);
      } else if (resPaymentAuth.threeDSInfo === "ChallengeRequest") {
        setCreq({ creq: resPaymentAuth.creq, acsURL: resPaymentAuth.acsURL })
      }
    } catch (error) {
      console.log(error);
    }
  }, [deleteCart, discountCode, dispatch, navigate])

  async function receiveMessage() {
    try {
      if (document.getElementById('token')?.value) {
        const token = document.getElementById('token').value;
        const amount = (totalPrice * 100).toFixed();
        const reqObj = initialReq(amount, token, orderNo)

        document.getElementById('token').value = null

        const resPayment = await fetchData(`${baseUrl}payment/`,
          {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(reqObj)
          })

        const DS_MERCHANT_EMV3DS = EMV3DS(resPayment.protocolVersion, resPayment.threeDSServerTransID);
        const authObj = { ...reqObj, "DS_MERCHANT_EMV3DS": { ...DS_MERCHANT_EMV3DS } };

        if (resPayment.threeDSMethodURL) {
          setThreeDSMethod({
            threeDSMethodURL: resPayment.threeDSMethodURL,
            threeDSMethodData: resPayment.threeDSMethodData
          });
          setAuthorizationObj(authObj);
        } else {
          reqAuthorization(authObj);
        }
        // window.removeEventListener("message", receiveMessage);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleMessage = (event) => {
    if (iframeRef && event.source === iframeRef.current?.contentWindow) {
      //====================== Timer - start ============================
      window.removeEventListener('message', handleMessage);
      const sendAt = new Date();
      setTimer({ ...timer, sendAt: sendAt });
      //====================== Timer - start ============================
      //====================== Timer ============================
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        console.log('-+-+-+- Timeout fired! -+-+-+- відправка N -+-+-+-');
        clearTimeout(timeoutRef.current);
        timeoutRef.current = false;
        iframePage.current = false;

        const DS_MERCHANT_EMV3DS = { ...authorizationObj.DS_MERCHANT_EMV3DS, threeDSCompInd: 'N' };
        const authObj = { ...authorizationObj, "DS_MERCHANT_EMV3DS": DS_MERCHANT_EMV3DS };
        // console.log(authObj);
        reqAuthorization(authObj);
      }, 10000);
      //====================== Timer ============================
    }
  };

  const handleFrameLoad = () => {
    //====================== Timer - stop ============================
    if (timeoutRef.current && iframePage.current) {
      const recieved = new Date();
      setTimer({ ...timer, recievedAt: recieved });
      clearTimeout(timeoutRef.current);
    }
    iframePage.current = true;
    //====================== Timer - stop ============================
  };

  window.addEventListener("message", receiveMessage);
  window.addEventListener('message', handleMessage);

  useEffect(() => {
    if (timer?.sendAt && timer?.recievedAt && timeoutRef.current && iframePage.current) {
      //====================== Timer - end in time ============================
      clearTimeout(timeoutRef.current);
      // const timeDifference = (timer.recievedAt - timer.sendAt) / 1000;
      // console.log(timeDifference + ' c');
      // console.log('-+-+-+- In Time! -+-+-+- відправка Y -+-+-+-');
      //====================== Timer - end in time ============================
      const DS_MERCHANT_EMV3DS = { ...authorizationObj.DS_MERCHANT_EMV3DS, threeDSCompInd: 'Y' };
      const authObj = { ...authorizationObj, "DS_MERCHANT_EMV3DS": DS_MERCHANT_EMV3DS };
      // console.log(authObj);
      reqAuthorization(authObj);
    }
  }, [timer, reqAuthorization, authorizationObj])

  return (
    <div className={styles.form}>
      <Helmet>
        <script>{redsysScript(orderNo, totalPrice)}</script>
      </Helmet>
      <h3 className={styles.form__title}>Payment form</h3>
      <div id="card-form" style={{ height: '400px' }} />

      {threeDSMethod?.threeDSMethodURL && threeDSMethod?.threeDSMethodData &&
        <iframe
          id='iframe3DS'
          ref={iframeRef}
          onLoad={handleFrameLoad}
          className={styles.form__iframe}
          title='iframe3DS'
          src={`${localUrl}payment3DS/?threeDSMethodURL=${threeDSMethod.threeDSMethodURL}&threeDSMethodData=${threeDSMethod.threeDSMethodData}`} />}

      <form name="datos">
        <input type="hidden" id="token"></input>
        <input type="hidden" id="errorCode"></input>
      </form>

      {creq &&
        <PaymentAuth acsURL={creq.acsURL} creq={creq.creq} />}
    </div>
  )
}