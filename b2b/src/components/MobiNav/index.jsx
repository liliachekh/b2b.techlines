import { NavLink, useLocation } from 'react-router-dom';
import { Basket, Account } from '../icons';
import style from './mobilNav.module.scss';
import { CartAmount } from '../CartAmount';

function MobilNav(props) {
  const { isOpen, toggleBurgerMenu } = props;
  const location = useLocation();

  return (
    <div className={style.mobilNav}>
      <NavLink to='/profile' className={style.mobilNav__account} >
        <Account width={30} height={30} color={'#202025'} strokeWidth={location.pathname === '/profile' ? '2.2' : '1.5'} />
      </NavLink>
      <NavLink to='/cart' className={style.mobilNav__basket}>
        <Basket width={30} height={30} color={'#202025'} strokeWidth={location.pathname === '/cart' ? '2.2' : '1.5'} /> <CartAmount />
      </NavLink>
      <button type="button" className={`${style.mobilNav__burger} ${isOpen ? style.active : ''}`} onClick={toggleBurgerMenu}> </button>
    </div>
  );
}

export default MobilNav;