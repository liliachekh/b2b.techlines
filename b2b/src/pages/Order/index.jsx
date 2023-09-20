import styles from './Order.module.scss';
import { useGetCartQuery } from "../../store/api/cart.api";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import Loader from '../../components/Loader';
import FormikForm from '../../components/FormikForm';
import { useGetCustomerQuery } from '../../store/api/customers.api';
import { shippingFields } from './orderFields';
import { validationSchemaOrderShipping } from '../../validation';

export function Order() {
  const { loggedIn } = useContext(AuthContext);
  const { data: customer = {}, isLoading: customerLoading } = useGetCustomerQuery();
  const { data: cart = {}, isLoading: cartLoading } = useGetCartQuery();

  function onSubmitShipping(values) {
    console.log(values);
  }

  if (cartLoading || customerLoading) return <Loader />

  if (!cart) return <Navigate to="/cart" />

  if (loggedIn === false) return <Navigate to="/login" />

  return (
    <div className={styles.order}>
      <div className={styles.order__container}>
        <h2 className={styles.order__title}>My order</h2>
        <div className={styles.order__wrapper}>
          <div className={`${styles.order__aside} ${styles.aside}`}>
            {cart?.products?.map(({ product, cartQuantity }) => (
              <div className={styles.aside__item} key={product.name}>
                <p className={`${styles.aside__text} ${styles.aside__text_name}`}>
                  {product.name}
                </p>
                <p className={styles.aside__text}>
                  Price for one: <span className={styles.aside__text_amount}>{product.currentPrice}</span> €
                </p>
                <p className={styles.aside__text}>
                  In cart: <span className={styles.aside__text_amount}>{cartQuantity}</span> pc's
                </p>
                <p className={styles.aside__text}>
                  Total Price: <span className={styles.aside__text_amount}>{Number(product.currentPrice) * Number(cartQuantity)}</span> €
                </p>
              </div>))}
            {/* <ProductCard {...product} cartItem={true} key={product?._id} /></>))} */}
            <Link to='/cart' className={styles.aside__btn}>Back to cart</Link>
          </div>
          <div className={styles.order__form}>
            <h3 className={styles.order__subtitle}>Shipping form</h3>
            <FormikForm
              initialValues={{
                countryName: '',
                index: '',
                region: '',
                city: '',
                street: '',
                house: '',
                apartment: '',
                firstName: '',
                lastName: '',
                email: '',
                telephone: '',
              }}
              validationSchema={validationSchemaOrderShipping}
              fields={shippingFields}
              callback={onSubmitShipping}
              submitBtn="Submit" />
          </div>
        </div>
      </div>
    </div>
  )
}