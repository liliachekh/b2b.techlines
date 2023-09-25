import { NavLink } from 'react-router-dom';
import { Basket, LogIn, Account } from '../icons';
// import { CartAmount } from '../CartAmount';
import style from './mobilNav.module.scss';
import { CartAmount } from '../CartAmount';

function MobilNav(props) {
  const { isLogin, isActive, isOpen, toggleBurgerMenu } = props;

  return (
    <>
      <div className={style.mobilNav}>
         {!isLogin ? (
         <NavLink to='/login' className={style.mobilNav__login}>
           <LogIn width={30} height={30} color={'#202025'} strokeWidth={isActive('/login') ? '2.2' : '1.5'} />
         </NavLink>
         ) : (
         <NavLink to='/profile' className={style.mobilNav__account} >
           <Account width={30} height={30} color={'#202025'} strokeWidth={isActive('/profile') ? '2.2' : '1.5'} />
         </NavLink>
         )}
         <NavLink to='/cart' className={style.mobilNav__basket}>
           <Basket width={30} height={30} color={'#202025'} strokeWidth={isActive('/cart') ? '2.2' : '1.5'} /> <CartAmount /> 
         </NavLink>
        <button type="button" className={`${style.mobilNav__burger} ${isOpen ? style.active : ''}`} onClick={toggleBurgerMenu}> </button>
      </div>
    </>
  );
}

export default MobilNav;