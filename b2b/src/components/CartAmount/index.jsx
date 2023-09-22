import useMediaQuery from 'react-responsive';
import style from './cartAmount.module.scss';
import { useContext } from 'react';
import Loader from '../Loader';
import AuthContext from '../../context/AuthContext';
import { useGetCartQuery } from '../../store/api/cart.api';
import { Navigate } from 'react-router-dom';

export function CartAmount() {
  const { data: cart = {}, isLoading } = useGetCartQuery();
  const { loggedIn } = useContext(AuthContext);
  const isDesktop = useMediaQuery({ minWidth: 993 });

  if (isLoading) return <Loader />
  
  if (loggedIn === false) return <Navigate to="/login" />

  const cartAmount = cart?.products?.reduce((total, product) => {
    return total + product.cartQuantity
  }, 0)

return (
  <span className={`${style.cartAmount} ${cartAmount > 0 ? (isDesktop ? style.activeDesk : style.activeMob) : null}`}>
    {cartAmount}
  </span>
 )
}