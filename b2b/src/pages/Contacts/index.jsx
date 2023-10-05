import { useTitle } from "../../hooks";
import style from "./contacts.module.scss"
import { contacts } from "./contactsFields"

export function Contacts () {
  useTitle('Contacts');

  return (
      <section className={style.contacts}>
      <div className={style.contacts__container}>
        <h1 className={style.contacts__title}>Contacts</h1>
        <div className={style.contacts__info}>
          <h3 className={style.contacts__infoTitle}>{contacts.subtitle}</h3>
          <p className={style.contacts__infoText}>{contacts.info.text1}</p>
          <p className={style.contacts__infoText}>{contacts.info.text2}</p>
          <p className={style.contacts__infoText}>{contacts.info.text3}</p>
          <p className={style.contacts__infoText}>{contacts.info.text4}</p>
          <p className={style.contacts__infoText}>{contacts.info.text5}</p>
        </div>
      </div>
      </section>
  )
}