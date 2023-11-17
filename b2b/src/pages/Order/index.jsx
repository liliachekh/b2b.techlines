import styles from './Order.module.scss';
import { useDeleteCartMutation, useGetCartQuery } from "../../store/api/cart.api";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from '../../components/Loader';
import { useChangeAccountMutation, useGetCustomerQuery } from '../../store/api/customers.api';
import { areObjectsEqual } from '../../utils';
import { useDeleteOrderMutation, useSetOrderMutation } from '../../store/api/order.api';
import { AnimatePresence, motion } from 'framer-motion';
import { animateModal } from '../../animation';
import { useTierPrice, useTitle, useTotalPrice } from '../../hooks';
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
  const [deleteOrder] = useDeleteOrderMutation();

  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [order, setOrder] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);

  const { totalPrice, totalPriceByCard, deliveryPrice } = useTotalPrice();

  // const totalPrice = Number(cart?.products
  //   ?.map(({ product: { currentPrice }, cartQuantity }) => tierPrice(currentPrice) * cartQuantity)
  //   ?.reduce((prev, next) => prev + next)
  //   .toFixed(2))

  async function closeInvoice() {
    setInvoice(false);
    await deleteCart().unwrap();
    navigate('/');
  }
  let merchantParametersInput = document.getElementById("Ds_MerchantParameters");
let signatureInput = document.getElementById("Ds_Signature");
console.log("merchantParametersInput:", merchantParametersInput);
console.log("signatureInput:", signatureInput);
let paymentForm = document.getElementById("from");

  async function receiveFormData(order) {
    
    const amount = (totalPrice * 100).toFixed();

    const reqObj = {
      "DS_MERCHANT_AMOUNT": amount,
      "DS_MERCHANT_CURRENCY": "978",
      "DS_MERCHANT_MERCHANTCODE": "361686405",
      "DS_MERCHANT_ORDER": order.orderNo,
      "DS_MERCHANT_TERMINAL": "1",
      "DS_MERCHANT_TRANSACTIONTYPE": "0"
    }

    const res = await fetch('http://localhost:4000/api/payment',
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(reqObj)
      });
    if (!res.ok) console.log('Error in payment')
    if (res.ok) {
      // тут потрібно заповнити форму даними з відповіді серверу 
      const data = await res.json();
console.log(data, merchantParametersInput);
      // Декодування значень з BASE64
      // const decodedParameters = JSON.parse(atob(data.Ds_MerchantParameters));

      // Заповнення форми з отриманими значеннями
      if (merchantParametersInput && signatureInput) {
        merchantParametersInput.value = data.Ds_MerchantParameters;
        signatureInput.value = data.Ds_Signature;
        console.log("Updated values:", merchantParametersInput.value, signatureInput.value);
        // paymentForm.submit();
      }
      // document.getElementById("Ds_MerchantParameters").value = data.Ds_MerchantParameters;
      // document.getElementById("Ds_Signature").value = data.Ds_Signature;
      
      // deleteCart()
    }
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
      setPaymentInfo(paymentInfo);
      delete values?.save;
      delete values?.paymentInfo;

      const { order } = await placeOrder({
        customerId: customer._id,
        email: values?.email,
        mobile: values?.telephone,
        deliveryAddress: values,
        paymentInfo,
        status: 'payment required',
        deliveryPrice: deliveryPrice,
      }).unwrap();

      if (paymentInfo === "IBAN") {
        setInvoice(true);
        window.open('https://storage.techlines.es/invoices/invoice.pdf', '_blank');
        // window.open('http://localhost:4000/invoices/invoice.pdf', '_blank');
      } else {
        // setOrder(order);
        receiveFormData(order)
        // await deleteCart().unwrap();
      }

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
              {/* <h3 className={styles.aside__title}>Order Total: <span className={styles.aside__totalPrice}>{totalPrice > 2500 ? totalPrice : totalPrice + 35} €</span></h3> */}
              <h3 className={styles.aside__title}>
                {/* Order Total: <span className={styles.aside__totalPrice}>{totalPrice} €</span> */}
                Order Total: <span className={styles.aside__totalPrice}> {paymentInfo === "CARD" ? totalPriceByCard : totalPrice} €</span>
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
              {order
                ? <button className={styles.aside__btn} onClick={() => cancelOrder(order._id)}>Back to shipping</button>
                : <Link to='/cart' className={styles.aside__btn}>Back to cart</Link>}
              {/* <Link to='/cart' className={styles.aside__btn}>Back to cart</Link> */}
            </div>
            {!order &&
               <><ShippingForm onSubmitShipping={onSubmitShipping} />
              <form name="from" id="from"action="https://sis-t.redsys.es:25443/sis/realizarPago" method="POST">
              <input type="hidden" name="Ds_SignatureVersion" value="HMAC_SHA256_V1"/>
              <input type="hidden" name="Ds_MerchantParameters" id="Ds_MerchantParameters" value="
              "/>
              <input type="hidden" name="Ds_Signature" id="Ds_Signature" value=""/>
              </form></>
              // : <PaymentForm
              //   setOrder={setOrder}
              //   orderNo={order.orderNo}
              //   totalPrice={paymentInfo === "CARD" ? totalPriceByCard : totalPrice} />
            }
          </div>
        </div>
      </div>
    </>
  )
}