import styles from './Order.module.scss';
import { useDeleteCartMutation, useGetCartQuery } from "../../store/api/cart.api";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from '../../components/Loader';
import { useChangeAccountMutation, useGetCustomerQuery } from '../../store/api/customers.api';
import { areObjectsEqual } from '../../utils';
import { useDeleteOrderMutation, useSetOrderMutation } from '../../store/api/order.api';
import { useTierPrice, useTitle, useTotalPrice } from '../../hooks';
import { ShippingForm } from '../../components/ShippingForm';
import { PaymentForm } from '../../components/PaymentForm';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/modalSlice';

export function Order() {
  useTitle('Order');
  const tierPrice = useTierPrice();
  const { loggedIn } = useContext(AuthContext);
  const { data: customer = {}, isLoading: customerLoading } = useGetCustomerQuery();
  const { data: cart = {}, isLoading: cartLoading } = useGetCartQuery();
  const [changeAccount] = useChangeAccountMutation();
  const [placeOrder, { isLoading: orderLoading }] = useSetOrderMutation();
  const [deleteCart, { isLoading: cartDeleteing }] = useDeleteCartMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);
  // const [paymentInfo, setPaymentInfo] = useState(null);

  const { totalPriceDiscount, deliveryPrice } = useTotalPrice();

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

      // const paymentInfo = values?.paymentInfo;
      // setPaymentInfo(paymentInfo);
      delete values?.save;
      delete values?.paymentInfo;

      await placeOrder({
        customerId: customer._id,
        email: values?.email,
        mobile: values?.telephone,
        deliveryAddress: values,
        paymentInfo: "IBAN",
        status: 'payment required',
        deliveryPrice: deliveryPrice,
        discount: cart?.discount || 0,
      }).unwrap();

      navigate('/');
      dispatch(showModal('order'))
      await deleteCart().unwrap();
      window.open('https://storage.techlines.es/invoices/invoice.pdf', '_blank');
      // window.open('http://localhost:4000/invoices/invoice.pdf', '_blank');

    } catch (error) {
      console.log(error);
    }
  }

  async function cancelOrder(orderId) {
    window.location.href = 'http://localhost:3000/order'
    await deleteOrder(orderId).unwrap();
    // setOrder(null);
    // setPaymentInfo(null);
  }

  if (cartLoading || customerLoading || orderLoading || cartDeleteing) return <Loader />

  if (!cart) return <Navigate to="/cart" />

  if (loggedIn === false) return <Navigate to="/login" />

  return (
    <>
      <div className={styles.order}>
        <div className={styles.order__container}>
          <h2 className={styles.order__title}>My order</h2>
          <div className={styles.order__wrapper}>
            <div className={`${styles.order__aside} ${styles.aside}`}>
              <h3 className={styles.aside__title}>
                Order Total: <span className={styles.aside__totalPrice}>{totalPriceDiscount} €</span>
              </h3>
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
              {deliveryPrice > 0 &&
                <div className={styles.aside__item}>
                  <p className={styles.aside__text}>
                    For orders with a total value of more than €2.500, ALC ZOOM will assume the shipping costs.
                  </p>
                  <p className={`${styles.aside__text} ${styles.aside__text_name}`}>
                    Delivery: <span className={styles.aside__text_amount}>35 €</span>
                  </p>
                </div>}
              {cart?.discount > 0 &&
                <div className={styles.aside__item}>
                  <p className={`${styles.aside__text} ${styles.aside__text_name}`}>
                    Your discount: <span className={styles.aside__text_amount}>-{cart?.discount} €</span>
                  </p>
                </div>}
              {order
                ? <button className={styles.aside__btn} onClick={() => cancelOrder(order._id)}>Back to shipping</button>
                : <Link to='/cart' className={styles.aside__btn}>Back to cart</Link>}
            </div>
            {!order
              ? <ShippingForm onSubmitShipping={onSubmitShipping} />
              : <PaymentForm
                // setOrder={setOrder}
                orderNo={order.orderNo}
                totalPrice={totalPriceDiscount} />}
          </div>
        </div>
      </div>
    </>
  )
}