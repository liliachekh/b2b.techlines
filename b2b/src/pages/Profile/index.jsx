import styles from './Profile.module.scss';
import Header from "../../components/Header";
import { useGetCustomerQuery } from '../../store/api/customers.api';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Loader from '../../components/Loader';

export function Profile() {
  const { data: customer = {}, isLoading } = useGetCustomerQuery();
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);
  
  if (isLoading) return <Loader/>

  // if (error?.originalStatus === 401) return <h1>You are unauthorized</h1>
  console.log(customer);
  return (
    <>
    {loggedIn === false && navigate("/login")}
      <Header />
      <div className={styles.main}>
        <div className={styles.main__container}>
          <h2 className={styles.main__title}>My profile</h2>
          <div className={styles.main__wrapper}>
            <div className={`${styles.main__aside} ${styles.aside}`}>
              <Link
                to='/profile'
                className={`${styles.aside__link} ${window.location.pathname === '/profile' ? styles.aside__link_active : ''}`}>
                Account settings
              </Link>
              <Link
                to='/profile/orders'
                className={`${styles.aside__link} ${window.location.pathname === '/profile/orders' ? styles.aside__link_active : ''}`}>
                My orders
              </Link>
              <button className={styles.aside__link}
                onClick={() => {
                  navigate("/login");
                  
                }}>
                Logout
              </button>
            </div>
            <div className={styles.main__content}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}