import styles from './Cart.module.scss';
import { useGetCartQuery } from "../../store/api/cart.api";
import Header from "../../components/Header";
import ProductCard from '../../components/ProductCard';
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from '../../components/Loader';

export function Cart() {
  const { data: cart = {}, isLoading } = useGetCartQuery();
  const { loggedIn } = useContext(AuthContext);

  if (isLoading) return <Loader/>

  if (loggedIn === false) return <Navigate to="/login" />

  return (
    loggedIn === false
    ? <Navigate to="/login" />
    :(<>
      <Header />
      <div className={styles.main}>
        <div className={styles.main__container}>
          <h2 className={styles.main__title}>My cart</h2>
          <div className={styles.main__wrapper}>
            {cart?.products?.length > 0
              ? <>
                <div className={styles.main__content}>
                  {cart?.products?.map(({ product }) => (
                    <ProductCard {...product} cartItem={true} key={product?._id} />))}
                </div>
                <div className={`${styles.main__aside} ${styles.aside}`}>
                  <h3 className={styles.aside__title}>Summary</h3>
                  <p className={styles.aside__text}>Shipping and taxes will be calculated at checkout, where applicateble.</p>
                  <div className={styles.aside__totalPrice}>
                    <span className={styles.aside__totalPrice_title}>Order Total:</span>
                    {cart.products
                      .map(({ product: { currentPrice }, cartQuantity }) => currentPrice * cartQuantity)
                      .reduce((prev, next) => prev + next).toFixed(2) + ' €'}
                  </div>
                  <button disabled={!cart?.products?.length} className={styles.aside__btn}>Proceed to Checkout</button>
                </div>
              </>
              : <p className={styles.main__empty}>Your shopping cart is empty</p>}
          </div>
        </div>
      </div>
    </>)
  )
}