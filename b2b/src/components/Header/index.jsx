import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'
import style from "./header.module.scss"
import { scrollToTop } from "../../utils";
import menuData from "../MenuLink/menuData";
import MenuLink from "../MenuLink";
import MobilNav from "../MobiNav";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

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

  const isDesktop = useMediaQuery({ minWidth: 993 });

  useEffect(() => {
    if (!isDesktop && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDesktop, isOpen]);

  const location = useLocation();

  const isActive = (path) => {
    if (isLogin) {
      return location.pathname === path;
    }
    return false;
  };

  // useEffect(() => {
  //   if (isToken) {
  //     setIsLogin(true);
  //  } else {
  //     setIsLogin(false);
  //  }
  // }, [isToken])

  return (
    <>
      <header className={style.header}>
        <div className={`${style.header__wrapper} ${scrolled && style.header__scrolled}`}>
          <div className={style.header__container}>
            <div className={style.header__section}>
              <Link to="/" onClick={scrollToTop}>
                <div className={style.logo}>
                  <img src="/images/tech.png" alt="techlines logo" />
                </div>
              </Link>
            </div>
            <nav className={`${style.nav} ${isOpen && style.active}`}>
              <ul className={style.nav__list}>
                {menuData.map(({type, page, text, icon, classHover}) => (
                  (isLogin && type !== 'login') || (!isLogin && type !== 'profile') ? (
                    <MenuLink
                      key={type}
                      classItem={style.nav__item}
                      classHover={style[classHover]}
                      page={page}
                      isActive={isActive(page)}
                      classActive={style.activeLink}
                      closeBurgerMenu={() => toggleBurgerMenu()}
                      text={text}
                      isDesktop={isDesktop}
                      isLogin={isLogin}
                      icon={icon}
                  />
                  ) : null
                  ))}
              </ul>
            </nav>
            <>
              <MobilNav
                isLogin={isLogin}
                isActive={isActive}
                isOpen={isOpen}
                toggleBurgerMenu={() => toggleBurgerMenu()}
              />
            </>
          </div>
        </div>
      </header>
    </>
  );
};