import styles from './profileOrders.module.scss';
import { useGetOrdersQuery } from '../../store/api/order.api';
import ProductCard from '../ProductCard';
import Loader from '../Loader';
import { useTitle } from '../../hooks';

export function ProfileOrders() {
  useTitle('Profile | Orders');
  const { data: orders = [], isLoading: isLoadingOrders } = useGetOrdersQuery();

  if (isLoadingOrders) return <Loader />

  return (
    <>
      {orders && orders?.map(({ products, orderNo, totalSum, status, paymentInfo, discount, deliveryPrice }) => (
        <div className={styles.order} key={orderNo}>
          {products?.map(({ product, cartQuantity }) => (
            <ProductCard {...product} displayTable={true} key={product?._id} orderQuantity={cartQuantity} />))}
          <div className={styles.order__info}>
            <div className={styles.order__text}>Order №: <span className={styles.order__text_value}>{orderNo}</span></div>
            <div className={styles.order__text}>Status: <span className={styles.order__text_value}>{status}</span></div>
            <div className={styles.order__text}>Payment method: <span className={styles.order__text_value}>{paymentInfo === "CARD" ? 'Card (+1.7%)' : 'IBAN'}</span></div>
            {discount > 0 && <div className={styles.order__text}>Discount: <span className={styles.order__text_value}>-{discount} €</span></div>}
            {deliveryPrice > 0 && <div className={styles.order__text}>Delivery: <span className={styles.order__text_value}>{deliveryPrice} €</span></div>}
            {/* <div className={`${styles.order__text} ${styles.order__text_total}`}>Total Sum: <span className={styles.order__text_value}>{totalSum.toFixed(2)} €</span></div> */}
          </div>
          <div className={styles.order__info}>
            <div className={`${styles.order__text} ${styles.order__text_total}`}>Total Sum: <span className={styles.order__text_value}>{totalSum} €</span></div>
          </div>
        </div>))}
    </>
  )
}