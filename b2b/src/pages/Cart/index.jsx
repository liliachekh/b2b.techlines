import styles from './Cart.module.scss';
import { useGetCartQuery } from "../../store/api/cart.api";
import Header from "../../components/Header";
// import CartItem from "../../components/CartItem";
import ProductCard from '../../components/ProductCard';

export function Cart() {
  const { data: cart = [], isLoading } = useGetCartQuery();

  if (isLoading) return <h1>Loading</h1>

  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.main__container}>
          <h2 className={styles.main__title}>My cart</h2>
          <div className={styles.main__wrapper}>
            <div className={styles.main__content}>
              {cart?.products?.length > 0 &&
                cart?.products?.map(({ product }) => (
                  <ProductCard {...product} cartItem={true} key={product?._id} />
                  // <CartItem {...product} key={product?._id} />
                ))}
            </div>
            <div className={`${styles.main__aside} ${styles.aside}`}>
              <h3 className={styles.aside__title}>Summary</h3>
              <p className={styles.aside__text}>Shipping and taxes will be calculated at checkout, where applicateble.</p>
              <div className={styles.aside__totalPrice}>
                <span className={styles.aside__totalPrice_title}>Order Total:</span>
                {cart.products
                  .map(({ product: { currentPrice }, cartQuantity }) => currentPrice * cartQuantity)
                  .reduce((prev, next) => prev + next).toFixed(2)
                  + ' €'}
              </div>
              <button className={styles.aside__btn}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}