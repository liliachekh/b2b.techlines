import styles from './OrderDetails.module.scss';
import ProductCard from "../ProductCard"

export function OrderDetails(order) {
  
  return(
    <>
    <div className={styles.order}>
    <div className={styles.order__info}>
            <div className={styles.order__text}>Company name: <span className={styles.order__text_value}>{order.customerId.companyName}</span></div>
            <div className={styles.order__text}>Order №: <span className={styles.order__text_value}>{order.orderNo}</span></div>
            <div className={styles.order__text}>Status: <span className={styles.order__text_value}>{order.status}</span></div>
            <div className={styles.order__text}>Payment method: <span className={styles.order__text_value}>{order.paymentInfo === "CARD" ? 'Card (+1.7%)' : 'IBAN'}</span></div>
            {order.discount > 0 && <div className={styles.order__text}>Discount: <span className={styles.order__text_value}>-{order.discount} €</span></div>}
            {order.deliveryPrice > 0 && <div className={styles.order__text}>Delivery: <span className={styles.order__text_value}>{order.deliveryPrice} €</span></div>}
            <div className={styles.order__text}>Delivery address: <span className={styles.order__text_value}>
              {`${order.deliveryAddress.countryName}, ${order.deliveryAddress.city}, ${order.deliveryAddress.street}, ${order.deliveryAddress.house}, ${order.deliveryAddress.apartment}, ${order.deliveryAddress.telephone}`}
              </span></div>

          </div>
          {order.products?.map(({ product, cartQuantity }) => (
            <ProductCard {...product} displayTable={true} key={product?._id} orderQuantity={cartQuantity} />))}
          <div className={styles.order__info}>
            <div className={`${styles.order__text} ${styles.order__text_total}`}>Total Sum: <span className={styles.order__text_value}>{order.totalSum} €</span></div>
          </div>
          </div>
    </>
  )
}
