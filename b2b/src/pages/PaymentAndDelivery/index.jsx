import style from "./paymentAndDelivery.module.scss";

export function PaymentAndDelivery() {
  return (
    <div id="main">
      <section className={style.paymentAndDelivery}>
        <div className={style.paymentAndDelivery__container}>
          <h1 className={style.paymentAndDelivery__title}>Payment and delivery terms</h1>
          <div className={style.paymentAndDelivery__text}>
            <p className={style.paymentAndDelivery__paragraph}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
              ad doloribus inventore magni sapiente mollitia quidem earum, sed
              doloremque similique ut, quod ipsam voluptatum explicabo
              temporibus aliquid obcaecati debitis corporis!{" "}
            </p>
            <p className={style.paymentAndDelivery__paragraph}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
              ad doloribus inventore magni sapiente mollitia quidem earum, sed
              doloremque similique ut, quod ipsam voluptatum explicabo
              temporibus aliquid obcaecati debitis corporis!{" "}
            </p>
            <p className={style.paymentAndDelivery__paragraph}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
              ad doloribus inventore magni sapiente mollitia quidem earum, sed
              doloremque similique ut, quod ipsam voluptatum explicabo
              temporibus aliquid obcaecati debitis corporis!{" "}
            </p>
            <p className={style.paymentAndDelivery__paragraph}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
              ad doloribus inventore magni sapiente mollitia quidem earum, sed
              doloremque similique ut, quod ipsam voluptatum explicabo
              temporibus aliquid obcaecati debitis corporis!{" "}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
