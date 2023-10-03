import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowRight } from '../icons';
import { scrollToTop } from '../../utils';

function MenuLink({ classItem, page, classActive, closeBurgerMenu, text, isDesktop, icon }) {
  const location = useLocation();
  const isActive = location.pathname === page

  const handleIconClick = () => {
    scrollToTop();
    if (!isDesktop) {
      closeBurgerMenu();
    }
  };

  return (
    <li className={classItem}>
      <NavLink to={page} className={isActive ? classActive : ''} onClick={handleIconClick}>
        {icon && isDesktop
          ? (isActive ? (icon(35, 35, '#202025', '2.2')) : (icon(35, 35, '#202025', '1.5')))
          : <>
            <span>{text}</span>
            {!isDesktop && <ArrowRight />}
          </>
        }
      </NavLink>
    </li>
  );
}

MenuLink.propTypes = {
  classItem: PropTypes.string,
  page: PropTypes.string,
  isActive: PropTypes.bool,
  classActive: PropTypes.string,
  closeBurgerMenu: PropTypes.func,
  text: PropTypes.string,
  isDesktop: PropTypes.bool,
  icon: PropTypes.func,
};

MenuLink.defaultProps = {
  classItem: '',
  isActive: false,
  classActive: '',
  text: '',
  isDesktop: false,
  icon: null
};

export default MenuLink;