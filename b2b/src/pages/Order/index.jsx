import styles from './Order.module.scss';
import { useDeleteCartMutation, useGetCartQuery } from "../../store/api/cart.api";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from '../../components/Loader';
import FormikForm from '../../components/FormikForm';
import { useChangeAccountMutation, useGetCustomerQuery } from '../../store/api/customers.api';
import { shippingOrderFields } from './orderFields';
import { validationSchemaOrderShipping } from '../../validation';
import { initialValuesShippingForm } from '../../utils/vars';
import { areObjectsEqual } from '../../utils';
import { useSetOrderMutation } from '../../store/api/order.api';
import { AnimatePresence, motion } from 'framer-motion';
import { animateModal } from '../../animation';

export function Order() {
  const { loggedIn } = useContext(AuthContext);
  const { data: customer = {}, isLoading: customerLoading } = useGetCustomerQuery();
  const { data: cart = {}, isLoading: cartLoading } = useGetCartQuery();
  const [changeAccount] = useChangeAccountMutation();
  const [setOrder, { isLoading: orderLoading}] = useSetOrderMutation();
  const [deleteCart, { isLoading: cartDeleteing }] = useDeleteCartMutation();

  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);

  async function closeInvoice() {
    await deleteCart().unwrap();
    navigate('/');
  }

  async function onSubmitShipping(values) {
    try {
      if (values?.save) {
        delete values.save;
        const oldDeliveryAddresses = customer?.deliveryAddresses || [];

        if (oldDeliveryAddresses?.every((address) => !areObjectsEqual(address, values))) {
          const newDeliveryAddresses = [...oldDeliveryAddresses, values];
          await changeAccount({ newDeliveryAddresses }).unwrap()
        }
      }

      const paymentInfo = values?.paymentInfo;
      delete values?.save;
      delete values?.paymentInfo;

      await setOrder({
        customerId: customer._id,
        email: values?.email,
        mobile: values?.telephone,
        deliveryAddress: values,
        paymentInfo,
        status: 'payment required',
        letterSubject: "Thank you for order! You are welcome!",
        letterHtml:
          "<h1>Your order is placed. OrderNo is 023689452.</h1><p>{Other details about order in your HTML}</p>"
      }).unwrap();


      if (paymentInfo === "IBAN") {
        setInvoice(true);
      } else {
        await deleteCart().unwrap();
        window.location.href = 'https://www.google.com.ua/'
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (cartLoading || customerLoading || orderLoading || cartDeleteing) return <Loader />

  if (!cart) return <Navigate to="/cart" />

  if (loggedIn === false) return <Navigate to="/login" />

  return (
    <>
      {invoice &&
        <AnimatePresence>
          <motion.div className={styles.invoice} onClick={closeInvoice} role='button' {...animateModal}>
            <div className={styles.invoice__wrapper}>
              <div className={styles.invoice__text}>
                Your order has been processed and invoice has been sent to you by email
              </div>
              <div className={styles.invoice__text}>
                Thank you for your purchase!
              </div>
              <button className={styles.invoice__btn} onClick={closeInvoice}>
                OK
              </button>
            </div>
          </motion.div>
        </AnimatePresence>}
      <div className={styles.order}>
        <div className={styles.order__container}>
          <h2 className={styles.order__title}>My order</h2>
          <div className={styles.order__wrapper}>
            <div className={`${styles.order__aside} ${styles.aside}`}>
              <h3 className={styles.aside__title}>Order List:</h3>
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
                </div>
              ))}
              {/* <ProductCard {...product} cartItem={true} key={product?._id} /></>))} */}
              <Link to='/cart' className={styles.aside__btn}>Back to cart</Link>
            </div>
            <div className={styles.order__form}>
              <h3 className={styles.order__subtitle}>Shipping form</h3>
              <FormikForm
                initialValues={initialValuesShippingForm}
                validationSchema={validationSchemaOrderShipping}
                fields={shippingOrderFields}
                callback={onSubmitShipping}
                submitBtn="Submit" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}