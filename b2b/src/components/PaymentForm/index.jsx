import { Helmet } from 'react-helmet-async';
import styles from './paymentForm.module.scss';
import { redsysScript } from '../../pages/Order/redsys';
import { useEffect, useRef, useState } from 'react';

export function PaymentForm({ orderNo, onAuth }) {
  const tokenRef = useRef(null);
  const errorCodeRef = useRef(null);

  const [hiddenInputValue, setHiddenInputValue] = useState('')

  useEffect(() => {
  },[])
  // let previousValue = tokenRef.current.value;

  // // 1: create `MutationObserver` instance
  // const observer = new MutationObserver((mutations) => {
  //   // 2: iterate over `MutationRecord` array
  //   mutations.forEach(mutation => {
  //     // 3.1: check if the mutation type and the attribute name match
  //     // 3.2: check if value changed
  //     if (
  //       mutation.type === 'attributes'
  //       && mutation.attributeName === 'value'
  //       && tokenRef.current.value !== previousValue
  //     ) {
  //       previousValue = tokenRef.current.value;
  //       // 3.4: trigger `change` event
  //       tokenRef.current.dispatchEvent(new Event('change'));
  //     }
  //   });
  // });

  // 4: observe changes on `hiddenInput`
  // observer.observe(tokenRef.current, { attributes: true });
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setHiddenInputValue(newValue);
    console.log(newValue);
  };
  return (
    <div className={styles.form}>
      <Helmet>
        <script>{redsysScript(orderNo)}</script>
      </Helmet>
      <h3 className={styles.form__title}>Payment form</h3>
      <div id="card-form" style={{ height: '400px' }} />
      <form name="datos" onChange={(e)=>console.log(e)}>
        <input ref={tokenRef} type="hidden" id="token" value={hiddenInputValue} onInput={(e) => { console.log("React:onChange"); }}></input>
        {/* <input ref={tokenRef} type="hidden" id="token" value={hiddenInputValue} onChange={handleInputChange}></input> */}
        {/* <input ref={tokenRef} type="hidden" id="token" value={value}></input> */}
        {/* <input ref={tokenRef} type="hidden" id="token" value={value} onChange={(e) => onAuth(e.target.value)}></input> */}
        <input ref={errorCodeRef} type="hidden" id="errorCode"></input>
      </form>
      <button onClick={() => { console.log(tokenRef.current.value)}}>btn</button>
    </div>
  )
}