import { useTitle } from "../../hooks";
import style from "./privacyPolicy.module.scss";
import {privacyPolicyData} from "./privacyPolicyData.jsx";

export function PrivacyPolicy() {
  useTitle('Privacy Policy');

  return (
      <section className={style.privacyPolicy}>
        <div className={style.privacyPolicy__container}>
          <h1 className={style.privacyPolicy__title}>Privacy Policy</h1>
          <div className={style.privacyPolicy__text}>
            <ol className={style.privacyPolicy__list}>
              {privacyPolicyData.map((item) => (
                <li key={item.key} className={style.privacyPolicy__listItem} >
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
