import { Helmet } from 'react-helmet-async';
import { redsysScript } from '../../pages/Order/redsys';
import styles from './paymentForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useDeleteCartMutation } from '../../store/api/cart.api';
// import { Payment3DS } from '../Payment3DS';
import { initialReq, EMV3DS, baseUrl, localUrl } from '../../utils/vars';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/modalSlice';
import { deleteDiscountCode, fetchData } from '../../utils';

export function PaymentForm({ setOrder, orderNo, totalPrice, discountCode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);

  const [threeDSMethodData, setThreeDSMethodData] = useState(null);
  const [threeDSMethodURL, setThreeDSMethodURL] = useState(null);
  const [sendAt, setSendAt] = useState(null);
  const [recievedAt, setRecievedAt] = useState(null);

  const [deleteCart] = useDeleteCartMutation();

  async function receiveMessage() {
    try {
      if (document.getElementById('token')?.value) {
        const token = document.getElementById('token').value;
        const amount = (totalPrice * 100).toFixed();
        const reqObj = initialReq(amount, token, orderNo)

        document.getElementById('token').value = null

        const responseData = await fetchData(`${baseUrl}payment/`,
          {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(reqObj)
          })

        setThreeDSMethodData(responseData.threeDSMethodData)

        if (responseData.threeDSMethodURL) {
          // alert('threeDSMethodURL: ', threeDSMethodURL)
          setThreeDSMethodURL(responseData.threeDSMethodURL)
        } else {
          const DS_MERCHANT_EMV3DS = EMV3DS(responseData.protocolVersion, responseData.threeDSServerTransID)
          const authorizationObj = { ...reqObj, "DS_MERCHANT_EMV3DS": { ...DS_MERCHANT_EMV3DS } }

          const res = await fetchData(`${baseUrl}payment/authorization`,
            {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              credentials: 'include',
              body: JSON.stringify(authorizationObj)
            })

          if (res.message === 'Response 0000') {
            navigate('/');
            dispatch(showModal('order'))
            if (discountCode) await deleteDiscountCode(discountCode);
            await deleteCart().unwrap();
          }
          console.log(`ANSWER from ${baseUrl}payment/authorization`, res);
        }
        // window.removeEventListener("message", receiveMessage);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => { }, [threeDSMethodData]);

  window.addEventListener("message", receiveMessage);

  //==================================================
  //==================================================


  const handleLoad = () => {
    const recieved = new Date();
    setRecievedAt(recieved)
    //====================== Timer - start ============================
    // if (timeoutRef.current) {
    //   clearTimeout(timeoutRef.current);
    // }
    //====================== Timer - end ============================
    // console.log('++++++++++ start');
    // console.log('recieved');
    // console.log(recieved);
    // console.log('-----------------------');
    // console.log('sendAt');
    // console.log(sendAt);
    // console.log('++++++++++ end');

    // const timeDifference = Math.ceil((recieved - sendAt) / 1000);
    // if (timeDifference < 10) {
    //   console.log('timeDifference ==========================================================');
    //   console.log(timeDifference + ' c');
    // } else {
    //   console.log('Time is Out ! ! ! ! !');
    // }

    // const newPageInIframe = iframeRef.current.contentWindow.location;
    // console.log('Новая страница загружена в iframe:', newPageInIframe);                 //+++++++++++++++++++++++++++++++++++++++++ end
  };



  // useEffect(() => {
  //   if (sendAt && !recievedAt) {
  //     //====================== Timer - start ============================
  //     // if (timeoutRef.current) {
  //     //   clearTimeout(timeoutRef.current);
  //     // }
  //     // timeoutRef.current = setTimeout(() => {
  //     //   console.log('Timeout fired!');
  //     // }, 1000);
  //     //====================== Timer - end ============================

  //     const timeDifference = Math.ceil((new Date() - sendAt) / 1000);
  //     if (timeDifference > 1) {
  //       console.log('timeDifference ======== from useEffect ======================================');
  //       console.log(timeDifference);
  //     }
  //   } else if (sendAt && recievedAt) {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   }
  // }, [sendAt, recievedAt])
  useEffect(() => {
    if (sendAt && recievedAt && timeoutRef.current) {
      clearTimeout(timeoutRef.current);

      console.log('----------------------- start');
      console.log('recieved');
      console.log(recievedAt);
      console.log('-----------------------');
      console.log('sendAt');
      console.log(sendAt);
      console.log('-----------------------');

      const timeDifference1 = (recievedAt - sendAt) / 1000;
      const timeDifference2 = Math.ceil((recievedAt - sendAt) / 1000);
      console.log(timeDifference1 + ' c');
      console.log(timeDifference2 + ' c');

      console.log('-----------------------');
      console.log('-+-+-+-+ відправка Y +-+-+-+-');
      console.log('----------------------- end');
    }
  }, [sendAt, recievedAt])



  // useEffect(() => {
  //   const handleMessage = (event) => {
  //     if (iframeRef && event.source === iframeRef.current?.contentWindow) {
  //       const send = new Date();
  //       setSendAt(send)
  //       // console.log(send);

  //       //====================== Timer - start ============================
  //       if (timeoutRef.current) {
  //         clearTimeout(timeoutRef.current);
  //       }
  //       timeoutRef.current = setTimeout(() => {
  //         console.log('-+-+-+-+-+ Timeout fired! +-+-+-+-+-');
  //         clearTimeout(timeoutRef.current);
  //       }, 500);
  //       //====================== Timer - end ============================

  //       console.log('+ + + + + + + + + ' + event.data + ' + + + + + + + + +')
  //       // console.log('1 - Message from iframe:', event.data);                   //================================================== start
  //     }
  //   };

  //   // window.addEventListener("message", receiveMessage);

  //   window.addEventListener('message', handleMessage);

  //   return () => {
  //     window.removeEventListener('message', handleMessage);
  //   };
  // }, []);

  const handleMessage = (event) => {
    window.removeEventListener('message', handleMessage);
    if (iframeRef && event.source === iframeRef.current?.contentWindow) {
      const send = new Date();
      setSendAt(send)
      // console.log(send);

      //====================== Timer - start ============================
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        console.log('-+-+-+-+-+ Timeout fired! +-+-+-+-+-');
        console.log('-+-+-+-+ відправка N +-+-+-+-');
        clearTimeout(timeoutRef.current);
      }, 500);
      //====================== Timer - end ============================

      console.log('+ + + + + + + + + ' + event.data + ' + + + + + + + + +')
      // console.log('1 - Message from iframe:', event.data);                   //================================================== start
    }
  };

  // window.addEventListener("message", receiveMessage);

  window.addEventListener('message', handleMessage);

  return (
    <>
      <div className={styles.form}>
        <Helmet>
          <script>{redsysScript(orderNo, totalPrice)}</script>
        </Helmet>
        <h3 className={styles.form__title}>Payment form</h3>
        <div id="card-form" style={{ height: '400px' }} />

        {threeDSMethodURL &&
          <iframe
            id='iframe3DS'
            ref={iframeRef}
            onLoad={handleLoad}
            // className={styles.form__iframe}
            title='3DS'
            src={`${localUrl}payment3DS/?threeDSMethodURL=${threeDSMethodURL}&threeDSMethodData=${threeDSMethodData}`} />}
        {/* {threeDSMethodURL && <Payment3DS threeDSMethodData={threeDSMethodData} threeDSMethodURL={threeDSMethodURL} />} */}

        <form name="datos">
          <input type="hidden" id="token"></input>
          <input type="hidden" id="errorCode"></input>
        </form>
      </div>
    </>
  )
}