import { Link } from 'react-router-dom';
import style from './notFound.module.scss';
import { useLocation } from 'react-router-dom';
import { useTitle } from '../../hooks';

export function NotFound() {
  useTitle('Not Found');
  const location = useLocation();

  return (
    <>
      <div className={style.notFound}>
        <div className={style.notFound__container}>
          <h1 className={style.notFound__container_title}>404</h1>
          <h2 className={style.notFound__container_subtitle}>Oops, this page not found!</h2>
          <p className={style.notFound__container_info}>The link might be corrupted.</p>
          <p className={style.notFound__container_subinfo}>or the page may have been removed</p>
          <div className={style.notFound__buttons}>
            <Link to={location.pathname === "/not-found" ? -3 : -1} className={style.notFound__btn}>
              Previous page
            </Link>
            <Link to="/" className={style.notFound__btn}>
              Go to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}