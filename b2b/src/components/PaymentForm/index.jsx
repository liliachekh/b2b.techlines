import { Helmet } from "react-helmet-async";
import styles from "./paymentForm.module.scss";
import { redsysScript } from "../../pages/Order/redsys";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { animateModal } from "../../animation";
import { useDeleteCartMutation } from "../../store/api/cart.api";
import { Payment3DS } from "../Payment3DS";
// import { useNavigate } from 'react-router-dom';

export function PaymentForm({ setOrder, orderNo, totalPrice }) {
  // const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [payment, setPayment] = useState(null);
  const [threeDSMethodData, setThreeDSMethodData] = useState(null);
  const [threeDSMethodURL, setThreeDSMethodURL] = useState(null);

  const [deleteCart] = useDeleteCartMutation();

  async function closeModal() {
    window.location.href = "http://localhost:3000/";
    // setModal(null);
    await deleteCart().unwrap();
    // setOrder(null)
    // navigate('/');
  }

  async function receiveMessage() {
    if (document.getElementById("token")?.value) {
      const token = document.getElementById("token").value;
      const amount = (totalPrice * 100).toFixed();

      const reqObj = {
        DS_MERCHANT_AMOUNT: amount,
        DS_MERCHANT_CURRENCY: "978",
        DS_MERCHANT_IDOPER: token,
        DS_MERCHANT_MERCHANTCODE: "361686405",
        DS_MERCHANT_ORDER: orderNo,
        DS_MERCHANT_TERMINAL: "1",
        DS_MERCHANT_TRANSACTIONTYPE: "0",
      };

      document.getElementById("token").value = null;

      const res = await fetch('http://localhost:4000/api/payment',
        {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify(reqObj)
        })
      if (!res.ok) console.log('Error in payment')
      if (res.ok) {
        const responseData = await res.json();
        console.log(responseData);

        setThreeDSMethodData(responseData.threeDSMethodData)

        if (responseData.threeDSMethodURL) {
          // setThreeDSMethodURL(responseData.threeDSMethodURL)
        } else {
          const browser = {
            "threeDSInfo": "AuthenticationData",
            "protocolVersion": responseData.protocolVersion,
            "browserAcceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,application/json",
            "browserUserAgent": window.navigator.userAgent,
            "browserJavaEnabled": window.navigator.javaEnabled() || false,
            "browserLanguage": window.navigator.language,
            "browserColorDepth": window.screen.pixelDepth,
            "browserScreenHeight": window.screen.availHeight,
            "browserScreenWidth": window.screen.availWidth,
            "browserTZ": new Date().getTimezoneOffset(),
            "threeDSServerTransID": responseData.threeDSServerTransID,
            "notificationURL": "https://dev.techlines.es/api/payment/3DS",
            "threeDSCompInd": "Y"
          }

          console.log({ ...reqObj, "DS_MERCHANT_EMV3DS": { ...browser } });
          const res = await fetch('http://localhost:4000/api/payment/authorization',
            {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              credentials: 'include',
              body: JSON.stringify({ ...reqObj, "DS_MERCHANT_EMV3DS": { ...browser } })
            })
          console.log(res);
        }
        setPayment('ok')
      }
      // window.removeEventListener("message", receiveMessage);
    }
  }
  useEffect(() => {}, [threeDSMethodData]);

  window.addEventListener("message", receiveMessage);

  return (
    <>
      {modal === 'ok' &&
        <AnimatePresence>
          <motion.div className={styles.modal} onClick={closeModal} role='button' {...animateModal}>
            {/* <motion.div className={styles.modal} role='button' {...animateModal}> */}
            <div className={styles.modal__wrapper}>
              <div className={styles.modal__text}>
                Your order has been processed and invoice has been sent to you
                by email
              </div>
              <div className={styles.modal__text}>
                Thank you for your purchase!
              </div>
              <button
                className={styles.modal__btn}
                onClick={closeModal}>
                OK
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      }

      <div className={styles.form}>
        <Helmet>
          <script>{redsysScript(orderNo, totalPrice)}</script>
        </Helmet>
        <h3 className={styles.form__title}>Payment form</h3>
        <div id="card-form" style={{ height: '400px' }} />

        {threeDSMethodURL && <Payment3DS threeDSMethodData={threeDSMethodData} threeDSMethodURL={threeDSMethodURL} />}

        <form name="datos">
          <input
            type="hidden"
            id="token"></input>
          <input
            type="hidden"
            id="errorCode"></input>
        </form>
      </div>
    </>
  );
}