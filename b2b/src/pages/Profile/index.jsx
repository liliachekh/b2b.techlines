import styles from './Profile.module.scss';
import Header from "../../components/Header";
import { useGetCustomerQuery } from '../../store/api/customers.api';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export function Profile() {
  const { data: customer = {}, error, isLoading } = useGetCustomerQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1>Loading</h1>

  if (error?.originalStatus === 401) return <h1>You are unauthorized</h1>
  console.log(customer);
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
                  navigate("/");
                  localStorage.removeItem('token')
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