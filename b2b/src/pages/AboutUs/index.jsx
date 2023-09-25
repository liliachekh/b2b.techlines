import style from "./aboutUs.module.scss";

export function AboutUs() {
  return (
      <section className={style.aboutUs}>
        <div className={style.aboutUs__container}>
          <h1 className={style.aboutUs__title}>About us</h1>
          <div className={style.aboutUs__text}>
            <h2 className={style.aboutUs__subtitle}>Reliable global electronics supplier</h2>
            <p className={style.aboutUs__paragraph}>
              We are specialized in electronics wholesale and can deliver
              products from numerous global brands Apple, Samsung, Dyson,
              Xiaomi, Huawei, Sony - you choose, and we deliver!
            </p>
            <p className={style.aboutUs__paragraph}>
              Since our establishment in 2016 in Ukraine and 2022 in Spain, our
              extensive experience has allowed us to perfect our quick delivery
              process and form valuable partnerships. Currently, we boast a team
              of 12 and have sold over 50,000 products in 2023
            </p>
            <ul className={style.aboutUs__list}>
              <li className={style.aboutUs__listItem}>Reliable partner since 2016</li>
              <li className={style.aboutUs__listItem}>Number of Employees 12</li>
              <li className={style.aboutUs__listItem}>Number of Trade Partners 100+</li>
              <li className={style.aboutUs__listItem}>Exciting beginnings in Spain 2022</li>
              <li className={style.aboutUs__listItem}>Number of Products Sold per 2023 50 000+</li>
            </ul>
          </div>
        </div>
      </section>
  );
}
