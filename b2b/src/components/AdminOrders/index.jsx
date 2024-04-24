import styles from './adminOrders.module.scss';
import { useGetAllOrdersQuery } from '../../store/api/order.api';
import Loader from '../Loader';
import { useTitle } from '../../hooks';

export function AdminOrders() {
  useTitle('Orders');
  const { data: orders = [], isLoading: isLoadingOrders } = useGetAllOrdersQuery();
  if (isLoadingOrders) return <Loader />

  return (
    <>
      {orders && orders?.map(({ orderNo, totalSum, status, paymentInfo,customerId }) => (
        <div className={styles.order} key={orderNo}>
          <div className={styles.order__info}>
          <div className={styles.order__text}> <span className={styles.order__text_value}>{customerId.companyName}</span></div>
            <div className={styles.order__text}> <span className={styles.order__text_value}>{orderNo}</span></div>
            <div className={styles.order__text}> <span className={styles.order__text_value}>{status}</span></div>
            <div className={styles.order__text}> <span className={styles.order__text_value}>{paymentInfo === "CARD" ? 'Card (+1.7%)' : 'IBAN'}</span></div>
            <div className={styles.order__text}> <span className={styles.order__text_value}>{totalSum} €</span></div>
          </div>
        
        </div>))}
        <div className={`${styles.order__table} ${styles.table}`}>
                  <p className={styles.table__cell}>Company name</p>
                  <p className={styles.table__cell}>Order №</p>
                  <p className={styles.table__cell}>Status</p>
                  <p className={styles.table__cell}>Payment method</p>
                  <p className={styles.table__cell}>Total Sum</p>
                </div>
    </>
  )
}