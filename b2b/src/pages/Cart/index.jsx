import styles from './Cart.module.scss';
import { useGetCartQuery } from "../../store/api/cart.api";
import ProductCard from '../../components/ProductCard';
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import Loader from '../../components/Loader';

export function Cart() {
  const { data: cart = {}, isLoading } = useGetCartQuery();
  const { loggedIn } = useContext(AuthContext);

  if (isLoading) return <Loader />

  if (loggedIn === false) return <Navigate to="/login" />

  return (
    <div className={styles.cart}>
      <div className={styles.cart__container}>
        <h2 className={styles.cart__title}>My cart</h2>
        <div className={styles.cart__wrapper}>
          {cart?.products?.length > 0
            ? <>
              <div className={styles.cart__content}>
                {cart?.products?.map(({ product }) => (
                  <ProductCard {...product} cartItem={true} key={product?._id} />))}
              </div>
              <div className={`${styles.cart__aside} ${styles.aside}`}>
                <h3 className={styles.aside__title}>Summary</h3>
                <p className={styles.aside__text}>Shipping and taxes will be calculated at checkout, where applicateble.</p>
                <div className={styles.aside__totalPrice}>
                  <span className={styles.aside__totalPrice_title}>Order Total:</span>
                  {cart.products
                    .map(({ product: { currentPrice }, cartQuantity }) => currentPrice * cartQuantity)
                    .reduce((prev, next) => prev + next).toFixed(2) + ' €'}
                </div>
                <Link to='/order' disabled={!cart?.products?.length} className={styles.aside__btn}>Proceed to Checkout</Link>
              </div>
            </>
            : <p className={styles.cart__empty}>Your shopping cart is empty</p>}
        </div>
      </div>
    </div>
  )
}