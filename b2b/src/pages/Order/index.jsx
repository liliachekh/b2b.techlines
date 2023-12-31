import styles from './Order.module.scss';
import { useDeleteCartMutation, useGetCartQuery } from "../../store/api/cart.api";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from '../../components/Loader';
import { useChangeAccountMutation, useGetCustomerQuery } from '../../store/api/customers.api';
import { areObjectsEqual } from '../../utils';
import { useSetOrderMutation } from '../../store/api/order.api';
import { AnimatePresence, motion } from 'framer-motion';
import { animateModal } from '../../animation';
import { useTierPrice, useTitle } from '../../hooks';
import { ShippingForm } from '../../components/ShippingForm';
import { PaymentForm } from '../../components/PaymentForm';

export function Order() {
  useTitle('Order');
  const tierPrice = useTierPrice();
  const { loggedIn } = useContext(AuthContext);
  const { data: customer = {}, isLoading: customerLoading } = useGetCustomerQuery();
  const { data: cart = {}, isLoading: cartLoading } = useGetCartQuery();
  const [changeAccount] = useChangeAccountMutation();
  const [placeOrder, { isLoading: orderLoading }] = useSetOrderMutation();
  const [deleteCart, { isLoading: cartDeleteing }] = useDeleteCartMutation();

  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [order, setOrder] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const totalPrice = Number(cart?.products
    ?.map(({ product: { currentPrice }, cartQuantity }) => tierPrice(currentPrice) * cartQuantity)
    ?.reduce((prev, next) => prev + next)
    .toFixed(2))

  async function closeInvoice() {
    setInvoice(false);
    await deleteCart().unwrap();
    navigate('/');
  }

  async function onSubmitShipping(values) {
    try {
      if (values?.save) {
        delete values.save;
        const oldDeliveryAddresses = customer?.deliveryAddresses || [];

        if (oldDeliveryAddresses?.every((address) => !areObjectsEqual(address, values))) {
          const deliveryAddresses = [...oldDeliveryAddresses, values];
          await changeAccount({ deliveryAddresses }).unwrap()
        }
      }

      const paymentInfo = values?.paymentInfo;
      delete values?.save;
      delete values?.paymentInfo;

      const { order } = await placeOrder({
        customerId: customer._id,
        email: values?.email,
        mobile: values?.telephone,
        deliveryAddress: values,
        paymentInfo,
        status: 'payment required',
        deliveryPrice: totalPrice > 2500 ? 0 : 35,
      }).unwrap();

      if (paymentInfo === "IBAN") {
        setInvoice(true);
        window.open('https://storage.techlines.es/invoices/invoice.pdf', '_blank');
        // window.open('http://localhost:4000/invoices/invoice.pdf', '_blank');
      } else {
        setOrder(order);
        // await deleteCart().unwrap();
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(token);
  }, [token, error])

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
              <h3 className={styles.aside__title}>Order Total: <span className={styles.aside__totalPrice}>{totalPrice > 2500 ? totalPrice : totalPrice + 35} €</span></h3>
              <h3 className={styles.aside__title}>Order List:</h3>
              {cart?.products?.map(({ product: { name, currentPrice }, cartQuantity }) => (
                <div className={styles.aside__item} key={name}>
                  <p className={`${styles.aside__text} ${styles.aside__text_name}`}>
                    {name}
                  </p>
                  <p className={styles.aside__text}>
                    Price for one: <span className={styles.aside__text_amount}>{tierPrice(currentPrice)}</span> €
                  </p>
                  <p className={styles.aside__text}>
                    In cart: <span className={styles.aside__text_amount}>{cartQuantity}</span> pc's
                  </p>
                  <p className={styles.aside__text}>
                    Total Price: <span className={styles.aside__text_amount}>{(Number(tierPrice(currentPrice)) * Number(cartQuantity)).toFixed(2)}</span> €
                  </p>
                </div>
              ))}
              {totalPrice <= 2500 &&
                <div className={styles.aside__item}>
                  <p className={styles.aside__text}>
                    For orders with a total value of more than €2.500, ALC ZOOM will assume the shipping costs.
                  </p>
                  <p className={`${styles.aside__text} ${styles.aside__text_name}`}>
                    Delivery: <span className={styles.aside__text_amount}>35 €</span>
                  </p>
                </div>}
              <Link to='/cart' className={styles.aside__btn}>Back to cart</Link>
            </div>
            {!order
              ? <ShippingForm onSubmitShipping={onSubmitShipping} />
              : <PaymentForm orderNo={order.orderNo} onAuth={setToken}/>}
          </div>
        </div>
      </div>
    </>
  )
}