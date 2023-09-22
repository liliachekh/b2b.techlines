import styles from './Profile.module.scss';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useLogOutMutation } from '../../store/api/customers.api';
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export function Profile() {
  const { loggedIn } = useContext(AuthContext);
  const [logOut] = useLogOutMutation();
  const { pathname } = useLocation();

  async function handleLogOut() {
    await logOut();
    window.location.reload()
  }

  if (loggedIn === false) return <Navigate to="/login" />

  return (
    <div className={styles.profile}>
      <div className={styles.profile__container}>
        <h2 className={styles.profile__title}>My profile</h2>
        <div className={styles.profile__wrapper}>
          <div className={`${styles.profile__aside} ${styles.aside}`}>
            <Link
              to='/profile'
              className={`${styles.aside__link} ${pathname === '/profile' ? styles.aside__link_active : ''}`}>
              Account settings
            </Link>
            <Link
              to='/profile/orders'
              className={`${styles.aside__link} ${pathname === '/profile/orders' ? styles.aside__link_active : ''}`}>
              My orders
            </Link>
            <button className={`${styles.aside__link} ${styles.aside__link_logout}`}
              onClick={handleLogOut}>
              Logout
            </button>
          </div>
          <div className={`${styles.profile__content} ${window.location.pathname === '/profile' ? styles.profile__content_account : ''}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}