import style from "./footer.module.scss"
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footer__container}>
        <div className={style.footer__links}>
            <Link to='/about-us' className={`${style.footer__links_link} ${style.footer__links_aboutUs}`}>About us</Link>
            <Link to='/contacts' className={`${style.footer__links_link} ${style.footer__links_contactUs}`}>Contacts</Link>
            <Link to='/terms-and-conditions' className={`${style.footer__links_link} ${style.footer__links_terms}`}>Terms and Conditions</Link>
            <Link to='/privacy-policy' className={`${style.footer__links_link} ${style.footer__links_privacy}`}>Privacy policy</Link>
            <Link to='/delivery' className={`${style.footer__links_link} ${style.footer__links_delivery}`}>Delivery</Link>
            <Link to='/cookie-policy' className={`${style.footer__links_link} ${style.footer__links_cookie}`}>Cookie policy</Link>
        </div>
        <div className={style.footer__info}>
          <span className={style.footer__devinfo}>2023 © Techlines Distribution. All rights reserved.</span>
          <span className={style.footer__devinfo}>Developed by <Link to="https://othersite.net/" target="blank" className={style.footer__info_link}>OTHERSITE STUDIO</Link></span>
        </div>
      </div>
    </footer>
  )
};