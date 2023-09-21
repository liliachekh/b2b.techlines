import style from "./footer.module.scss"
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footer__container}>
        <div className={style.footer__info}>
            <p className={style.footer__devinfo}>2023 © Techlines Distribution. All rights reserved.</p>
            <p className={style.footer__devinfo}>Developed by <Link to="https://othersite.net/" target="blank" className={style.footer__info_link}>OTHERSITE STUDIO</Link></p>
        </div>
        <div className={style.footer__links}>
            <Link to='/about-us' className={style.footer__links_link}>About us</Link>
            <Link to='/contacts' className={style.footer__links_link}>Contacts</Link>
            <Link to='/policy' className={style.footer__links_link}>Privacy policy</Link>
            <Link to='/delivery' className={style.footer__links_link}>Delivery</Link>
            <Link to='/terms-and-conditions' className={style.footer__links_link}>Terms and Conditions</Link>

        </div>
      </div>
    </footer>
  )
};