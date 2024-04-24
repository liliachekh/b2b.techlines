import styles from './admin.module.scss';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useLogOutMutation } from '../../store/api/customers.api';
import { useContext } from "react";
// import AuthContext from "../../context/AuthContext";
import AuthAdminContext from "../../context/AuthAdminContext";
import AdminHeader from "../../components/AdminHeader";


export function Admin() {
  // const { loggedIn } = useContext(AuthContext);
  const [logOut] = useLogOutMutation();
  const { pathname } = useLocation();
  const { loggedInAdmin } = useContext(AuthAdminContext);

  async function handleLogOut() {
    await logOut();
    window.location.reload()
  }

  // if (loggedIn === false) return <Navigate to="/login" />
  if (loggedInAdmin === false) return <Navigate to="/not-found" />;

  return (
    <>
    <AdminHeader loggedIn={true} />

    <div className={styles.admin}>
      <div className={styles.admin__container}>
        {/* <h2 className={styles.admin__title}>My admin</h2> */}
        <div className={styles.admin__wrapper}>
          <div className={`${styles.admin__aside} ${styles.aside}`}>
            <Link
              to='/admin'
              className={`${styles.aside__link} ${pathname === '/admin' ? styles.aside__link_active : ''}`}>
              Products
            </Link>
            <Link
              to='/admin/orders'
              className={`${styles.aside__link} ${pathname === '/admin/orders' ? styles.aside__link_active : ''}`}>
              Orders
            </Link>
            <button className={`${styles.aside__link} ${styles.aside__link_logout}`}
              onClick={handleLogOut}>
              Logout
            </button>
          </div>
          <div className={`${styles.admin__content} ${window.location.pathname !== '/admin/orders' ? styles.admin__content_account : ''}`}>
          {/* <div className={styles.admin__content}> */}
           
            <Outlet />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}