import { Helmet } from 'react-helmet-async';
import styles from './paymentForm.module.scss';
import { redsysScript } from '../../pages/Order/redsys';
import { useEffect, useRef, useState } from 'react';

export function PaymentForm({ orderNo, totalPrice }) {
  const tokenRef = useRef(null);
  const errorCodeRef = useRef(null);

  function merchantValidationEjemplo() {
    //Insertar validaciones…
    alert("Esto son validaciones propias");
    return true;
  }
  const req = (token) => ({
    "DS_MERCHANT_AMOUNT": `"${totalPrice}"`,
    "DS_MERCHANT_CURRENCY": "978",
    "DS_MERCHANT_IDOPER": `"${token}"`,
    "DS_MERCHANT_MERCHANTCODE": "999008881",
    "DS_MERCHANT_ORDER": "${orderNo}",
    "DS_MERCHANT_TERMINAL": "1",
    "DS_MERCHANT_TRANSACTIONTYPE": "0"
  })

  window.addEventListener("message", async function receiveMessage(event) {
    console.log(event)
    // console.log(req(token.value))
  });

  var insiteJSON = {
    "id": "card-form",
    "fuc": "999008881",
    "terminal": "1",
    "order": orderNo,
    "estiloInsite": "twoRows",
    "idioma": "2",
    "mostrarLogo": "false",
    "buttonValue": "BUY",
    "styleButton": "color:#f7fbfa; background-color: #202025;",
    "styleGroup": "background-color: red;",
    "styleBox": "border-radius: .3rem; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4)",
  }

  // getInSiteFormJSON(insiteJSON);

  return (
    <div className={styles.form}>
      <Helmet>
        <script>{redsysScript(orderNo, totalPrice)}</script>
      </Helmet>
      <h3 className={styles.form__title}>Payment form</h3>
      <div id="card-form" style={{ height: '400px' }} />

      <form name="datos" onChange={(e)=>console.log(e)}>
        <input ref={tokenRef} type="hidden" id="token"></input>
        <input ref={errorCodeRef} type="hidden" id="errorCode"></input>
      </form>
      <button onClick={() => { console.log(tokenRef.current.value) }}>{totalPrice}</button>
    </div>
  )
}