import { useEffect, useRef } from "react";
import styles from './paymentAuth.module.scss';

export function PaymentAuth({acsURL, creq}) {
  const formRef = useRef(null);

  useEffect(() => {
    if (acsURL && creq) {
      formRef.current.submit();
    }
  }, [acsURL, creq])

  return (
    (acsURL && creq) &&
    <form id='creq' ref={formRef} action={acsURL} method="post" className={styles.form}>
      <input type="hidden" name="creq" value={creq} />
    </form>
  );
}