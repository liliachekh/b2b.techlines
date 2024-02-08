import { Helmet } from 'react-helmet-async';
import { redsysScript } from '../../pages/Order/redsys';
import styles from './paymentForm.module.scss';
import { useEffect, useState } from 'react';
import { useDeleteCartMutation } from '../../store/api/cart.api';
import { Payment3DS } from '../Payment3DS';
import { initialReq, EMV3DS } from '../../utils/vars';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/modalSlice';
import { fetchData } from '../../utils';

export function PaymentForm({ setOrder, orderNo, totalPrice }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [threeDSMethodData, setThreeDSMethodData] = useState(null);
  const [threeDSMethodURL, setThreeDSMethodURL] = useState(null);

  const [deleteCart] = useDeleteCartMutation();

  async function receiveMessage() {
    try {
      if (document.getElementById('token')?.value) {
        const token = document.getElementById('token').value;
        const amount = (totalPrice * 100).toFixed();
        const reqObj = initialReq(amount, token, orderNo)
  
        document.getElementById('token').value = null
  
        const responseData = await fetchData('http://localhost:4000/api/payment',
          {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(reqObj)
          })

        setThreeDSMethodData(responseData.threeDSMethodData)
        const DS_MERCHANT_EMV3DS = EMV3DS(responseData.protocolVersion, responseData.threeDSServerTransID)
        const authorizationObj = { ...reqObj, "DS_MERCHANT_EMV3DS": { ...DS_MERCHANT_EMV3DS } }
  
        if (responseData.threeDSMethodURL) {
          // alert('threeDSMethodURL: ', threeDSMethodURL)
          setThreeDSMethodURL(responseData.threeDSMethodURL)
        } else {
          const res = await fetchData('http://localhost:4000/api/payment/authorization',
            {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              credentials: 'include',
              body: JSON.stringify(authorizationObj)
            })
  
          if (res.message === 'Response 0000') {
            navigate('/');
            dispatch(showModal('order'))
            await deleteCart().unwrap();
          }
          console.log('ANSWER from http://localhost:4000/api/payment/authorization', res);
        }
        // window.removeEventListener("message", receiveMessage);
      }
    } catch (error) {
      
    }
  }
  useEffect(() => {
    // console.log(threeDSMethodData);
  }, [threeDSMethodData]);

  window.addEventListener("message", receiveMessage);

  return (
    <>
      <div className={styles.form}>
        <Helmet>
          <script>{redsysScript(orderNo, totalPrice)}</script>
        </Helmet>
        <h3 className={styles.form__title}>Payment form</h3>
        <div id="card-form" style={{ height: '400px' }} />

        {threeDSMethodURL && <iframe src={`http://localhost:3000/payment3DS/?threeDSMethodURL=${threeDSMethodURL}&threeDSMethodData=${threeDSMethodData}`} width="500" height="100" frameBorder="0">Загрузка...</iframe>}
        {/* {threeDSMethodURL && <Payment3DS threeDSMethodData={threeDSMethodData} threeDSMethodURL={threeDSMethodURL} />} */}

        <form name="datos">
          <input type="hidden" id="token"></input>
          <input type="hidden" id="errorCode"></input>
        </form>
      </div>
    </>
  )
}