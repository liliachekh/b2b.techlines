import { Link, Navigate } from "react-router-dom"
import style from "./adminHeader.module.scss"
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useLogOutMutation } from "../../store/api/customers.api";


export default function AdminHeader() {
  const { loggedIn } = useContext(AuthContext);
  const [logOut] = useLogOutMutation();

  async function handleLogOut() {
    await logOut();
    window.location.reload()
  }

  if (loggedIn === false) return <Navigate to="/login" />
  
  return (
    <header className={style.header}>
      <div className={style.header__wrapper}>
        <div className={style.header__container}>
        <Link to="/">
              <div className={style.logo}>
                <img src="/images/Tech.png" alt="techlines" />
              </div>
        </Link>
          {loggedIn
            && <button
              className={style.header__logOut}
              onClick={handleLogOut}
              type='button'>
              Log out
            </button>}
        </div>
      </div>
    </header>
  )
}