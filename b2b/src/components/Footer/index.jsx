import style from "./footer.module.scss"
import { Link } from "react-router-dom";

function Footer({ refName }) {
  return (
    <footer ref={refName} className={style.footer}>
      <div className={style.footer__container}>
        <div className={style.footer__info}>
            <p className={style.footer__devinfo}>2023 © Techlines Distribution. All rights reserved.</p>
            <p className={style.footer__devinfo}>Developed by <Link to="https://othersite.net/" target="blank">OTHERSITE STUDIO</Link></p>
        </div>
        <div className={style.footer__links}>
            <Link to='/contacts' className={style.footer__link}>Contacts</Link>
            <Link to='/warranty' className={style.footer__link}>Warranty</Link>
            <Link to='/policy' className={style.footer__link}>Privacy policy</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;