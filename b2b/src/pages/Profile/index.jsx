import styles from './Profile.module.scss';
import Header from "../../components/Header";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLogOutMutation } from '../../store/api/customers.api';

export function Profile() {
  // const navigate = useNavigate();
  const [logOut] = useLogOutMutation();
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.main__container}>
          <h2 className={styles.main__title}>My profile</h2>
          <div className={styles.main__wrapper}>
            <div className={`${styles.main__aside} ${styles.aside}`}>
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
                onClick={() => {
                  logOut();
                  // navigate("/login");
                  // localStorage.removeItem('token')
                }}>
                Logout
              </button>
            </div>
            <div className={`${styles.main__content} ${window.location.pathname === '/profile' ? styles.main__content_account : ''}`}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}