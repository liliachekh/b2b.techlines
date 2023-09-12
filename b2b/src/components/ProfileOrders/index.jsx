import styles from './profileOrders.module.scss';
import { useGetOrdersQuery } from '../../store/api/order.api';
import ProductCard from '../ProductCard';

export function ProfileOrders() {
  const { data: orders = [], isLoading: isLoadingOrders } = useGetOrdersQuery();
  // const { data: orders = [], error: errorOrders, isLoading: isLoadingOrders } = useGetOrdersQuery();

  if (isLoadingOrders) return <h1>Loading</h1>

  return (
    <>
      {orders && orders?.map(({ products, orderNo, totalSum }) => (
        <div className={styles.order} key={orderNo}>
          {products?.map(({ product, cartQuantity }) => (
            <ProductCard {...product} displayTable={true} key={product?._id} orderQuantity={cartQuantity} />))}
          <div className={styles.order__info}>
            <div className={styles.order__text}>Order №: <span className={styles.order__text_value}>{orderNo}</span></div>
            <div className={styles.order__text}>Total Sum: <span className={styles.order__text_value}>{totalSum.toFixed(2)} €</span></div>
          </div>
        </div>))}
    </>
  )
}