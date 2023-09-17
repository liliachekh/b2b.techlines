import style from "./aboutUs.module.scss";

export function AboutUs() {
  return (
    <div id="main">
      <section className={style.aboutUs}>
        <div className={style.aboutUs__container}>
          <h1 className={style.aboutUs__title}>About us</h1>
          <div className={style.aboutUs__text}>
            <p className={style.aboutUs__paragraph}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
              ad doloribus inventore magni sapiente mollitia quidem earum, sed
              doloremque similique ut, quod ipsam voluptatum explicabo
              temporibus aliquid obcaecati debitis corporis!{" "}
            </p>
            <p className={style.aboutUs__paragraph}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
              ad doloribus inventore magni sapiente mollitia quidem earum, sed
              doloremque similique ut, quod ipsam voluptatum explicabo
              temporibus aliquid obcaecati debitis corporis!{" "}
            </p>
            <p className={style.aboutUs__paragraph}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
              ad doloribus inventore magni sapiente mollitia quidem earum, sed
              doloremque similique ut, quod ipsam voluptatum explicabo
              temporibus aliquid obcaecati debitis corporis!{" "}
            </p>
            <p className={style.aboutUs__paragraph}>
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
