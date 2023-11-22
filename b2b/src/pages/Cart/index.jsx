import styles from './Cart.module.scss';
import { useGetCartQuery } from "../../store/api/cart.api";
import ProductCard from '../../components/ProductCard';
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import Loader from '../../components/Loader';
import { useTitle, useTotalPrice } from '../../hooks';
import { motion } from "framer-motion";
import DiscountField from '../../components/DiscountField';

export function Cart() {
  useTitle('Cart');
  const { totalPrice, deliveryPrice, totalPriceDiscount } = useTotalPrice();
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
              <motion.div
                className={styles.cart__content}
                animate={{ height: "auto", transition: { duration: 0.5 } }}
                layout>
                {cart?.products?.map(({ product }) => (
                  <motion.div key={product?._id} layout>
                    <ProductCard {...product} cartItem={true} />
                  </motion.div>))}
              </motion.div>
              <div className={`${styles.cart__aside} ${styles.aside}`}>
                <h3 className={styles.aside__title}>Summary</h3>
                <p className={styles.aside__text}>For orders with a total value of more than €2.500, ALC ZOOM will assume the shipping costs.</p>
                
                <DiscountField discount={cart?.discount}/>

                {totalPrice <= 2500 &&
                  <>
                    <div className={styles.aside__price}>
                      <span className={styles.aside__price_title}>Delivery:</span>
                      {'35 €'}
                    </div>
                    <div className={styles.aside__price}>
                      <span className={styles.aside__price_title}>Price:</span>
                      {totalPrice.toFixed(2) + ' €'}
                    </div>
                  </>}
                <div className={styles.aside__totalPrice}>
                  <span className={styles.aside__totalPrice_title}>Order Total:</span>
                  {/* {totalPrice <= 2500
                    ? (totalPriceDiscount + 35).toFixed(2) + ' €'
                    : totalPriceDiscount.toFixed(2) + ' €'} */}
                  {totalPriceDiscount.toFixed(2) + ' €'}
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