import { useTitle } from "../../hooks";
import style from "./termsAndConditions.module.scss";
import {termsAndConditionsData} from "./termsAndConditionsData.jsx";

export function TermsAndConditions() {
  useTitle('Terms and Conditions');

  return (
      <section className={style.termsAndConditions}>
        <div className={style.termsAndConditions__container}>
          <h1 className={style.termsAndConditions__title}>Terms and Conditions</h1>
          <div className={style.termsAndConditions__text}>
            <ol className={style.termsAndConditions__list}>
              {termsAndConditionsData.map((item) => (
                <li key={item.key} className={style.termsAndConditions__listItem} >
                  {item.title}
                  {item.text}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
  );
}
