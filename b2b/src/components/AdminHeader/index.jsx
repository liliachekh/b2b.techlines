import { Link } from 'react-router-dom';
import style from './adminHeader.module.scss';
import { Logout } from '../icons';
import { useLogOutMutation } from '../../store/api/customers.api';

export default function AdminHeader() {
    const [logOut] = useLogOutMutation();

    async function handleLogOut() { 
        await logOut();
        window.location.reload()
    }

    return (
    <header className={style.header}>
      <div className={style.header__wrapper}>
        <div className={style.header__container}>
          <Link to="/" className={style.header__link}>
            <div className={style.header__logo}>
                <img src="/images/Tech.png" alt="techlines logo" />
            </div>
          </Link>
          <button
            className={style.header__logOut}
            onClick={handleLogOut}
            type='button'>
            <Logout width={34} height={34} color='#000'/>
          </button>
        </div>
      </div>
    </header>
    )
}