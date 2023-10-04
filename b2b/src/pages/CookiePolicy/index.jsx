import { useTitle } from "../../hooks/useTitle";
import style from "./cookiePolicy.module.scss";
import {cookiePolicyData} from "./cookiePolicyData.jsx";

export function CookiePolicy() {
  useTitle('Cookie Policy');

  return (
      <section className={style.cookiePolicy}>
        <div className={style.cookiePolicy__container}>
          <h1 className={style.cookiePolicy__title}>Cookie Policy</h1>
          <div className={style.cookiePolicy__text}>
            <div className={style.cookiePolicy__content}>
            <p className={style.cookiePolicy__paragraph}>
        We inform you that this website (the "Website") is the property of ALC
        ZOOM S.L.(hereinafter, the "Entity" or "ALC ZOOM ").This Website uses
        its own and third-party cookies that store and retrieve information from
        users when they browse through it for the purposes indicated in the
        section "Cookies used through the website".However, in compliance with
        the principle of proactive responsibility, the Entity informs that
        through this Website no information or personal data is collected
        without previously providing the necessary legal information and
        obtaining the express consent of the users in cases where it is
        necessary.The information on the processing of the information collected
        through the cookies of the Website can also be consulted through this
        Cookies Policy.
      </p>
              {cookiePolicyData.map((item) => (
                <div key={item.key} >
                  {item.title}
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}
