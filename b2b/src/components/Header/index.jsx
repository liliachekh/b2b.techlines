import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'
import PropTypes from 'prop-types';
import style from "./header.module.scss"
import { scrollToTop } from "../../utils";
import { navData } from "./navData";
import MobiNav from "../MobiNav"
import HeaderLink from "../HeaderLink";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  })

  useEffect(() => {
    function handleScroll() {
      const currentScrollPos = window.scrollY;
      setScrolled(prevScrollPos < currentScrollPos)
      setPrevScrollPos(currentScrollPos);
    }

    !isOpen && window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, scrolled, isOpen]);

  function toggleBurgerMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <header className={`${style.header} ${scrolled && isMobile && style.scrolled}`}>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.section}>
            <Link to="/" onClick={scrollToTop}>
              <div className={style.logo}>
                <img src="/images/Tech.png" alt="techlines logo" />
              </div>
            </Link>
          </div>
          <div className={style.nav__container}>
            <nav className={style.nav}>
              <ul className={style.list}>
                {navData.map(({ refName, text }) => (
                  <HeaderLink
                    className={style.listItem}
                    key={refName}
                    text={text} />
                ))}
              </ul>
            </nav>
            <Link to="/b2b/login">
              <span className={style.nav_login}>Login</span>
            </Link>
          </div>
          <MobiNav
            isOpen={isOpen}
            toggleBurgerMenu={toggleBurgerMenu} />
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  refList: PropTypes.object,
  inViewList: PropTypes.object,
}