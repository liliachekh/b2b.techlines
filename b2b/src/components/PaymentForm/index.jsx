import { Helmet } from 'react-helmet-async';
import styles from './paymentForm.module.scss';
import { redsysScript } from '../../pages/Order/redsys';

export function PaymentForm({ orderNo }) {
  return (
    <div className={styles.form}>
      <Helmet>
        <script>{redsysScript(orderNo)}</script>
      </Helmet>
      <h3 className={styles.form__title}>Payment form</h3>
      <div id="card-form" style={{ height: '400px' }} />
      <form name="datos">
        <input type="hidden" id="token"></input>
        <input type="hidden" id="errorCode"></input>
      </form>
    </div>
  )
}