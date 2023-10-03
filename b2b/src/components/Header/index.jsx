import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'
import style from "./header.module.scss"
import { scrollToTop } from "../../utils";
import menuData from "../MenuLink/menuData";
import MenuLink from "../MenuLink";
import MobilNav from "../MobiNav";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
  }, []);

  function toggleBurgerMenu() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (!isDesktop && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDesktop, isOpen]);

  return (
    <header className={style.header}>
      <div className={`${style.header__wrapper} ${scrolled && style.header__scrolled}`}>
        <div className={`${style.header__container} ${scrolled && style.header__container_scrolled}`}>
          <div className={style.header__section}>
            <Link to="/" onClick={scrollToTop}>
              <div className={`${style.logo} ${scrolled && style.logo__scrolled}`}>
                <img src="/images/Tech.png" alt="techlines" />
              </div>
            </Link>
          </div>
          <nav className={`${style.nav} ${isOpen && style.active}`}>
            <ul className={style.nav__list}>
              {menuData.map((data) => (
                <MenuLink
                  key={data.page}
                  {...data}
                  classItem={style.nav__item}
                  classActive={style.activeLink}
                  closeBurgerMenu={toggleBurgerMenu}
                  isDesktop={isDesktop} />))}
            </ul>
          </nav>
          <MobilNav
            isOpen={isOpen}
            toggleBurgerMenu={toggleBurgerMenu} />
        </div>
      </div>
    </header>
  );
};