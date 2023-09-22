import { navData } from "../Header/navData"
import HeaderLink from "../HeaderLink"
import style from "./mobiNav.module.scss"
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from "framer-motion";
import { animateMobileMenu } from "../../animation";

export default function MobiNav({ isOpen, toggleBurgerMenu }) {

  return (
    <div className={style.mobilNav}>
      <button
        type="button"
        className={`${style.burgerBtn} ${isOpen ? style.active : ''}`}
        onClick={toggleBurgerMenu}>
        <span className={`${style.burgerBtn__lines} ${isOpen ? style.active : ''}`}></span>
      </button>
      <AnimatePresence>
        {isOpen &&
          <motion.div
            className={`${style.wrapper}`}
            {...animateMobileMenu}>
            <ul className={style.list}>
              {navData.map(({ refName, text }) => (
                <HeaderLink
                  className={style.listItem}
                  key={refName}
                  // refTarget={refList[refName]}
                  toggleBurgerMenu={toggleBurgerMenu}
                  text={text} />
              ))}
            </ul>
          </motion.div>}
      </AnimatePresence>
    </div>
  )
}

MobiNav.propTypes = {
  isOpen: PropTypes.bool,
  toggleBurgerMenu: PropTypes.func,
  inViewList: PropTypes.object,
  refList: PropTypes.object,
}