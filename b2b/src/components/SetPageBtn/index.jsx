import styles from './setPageBtn.module.scss';
import { scrollToRef } from '../../utils';
import { useSearchParams } from "react-router-dom";

function SetPageBtn({ scrollTo, productsLength, label, direction }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || 25;
  const page = searchParams.get('startPage');

  const disabled = direction && productsLength < perPage;

  async function clickHandler() {
    if (disabled) return;
    const newPage = direction ? Number(page || 1) + 1 : Number(page || 1) - 1;
    if (newPage === 0) return;

    const query = { ...searchParams, perPage, startPage: newPage };

    setSearchParams(query);

    scrollToRef(scrollTo);
  }

  return (
    <button
      className={`${styles.btn} ${disabled || ((Number(page) === 1 || !page) && !direction) ? styles.btn_disabled : ''} ${direction ? styles.rotate : ''}`}
      type='button'
      onClick={clickHandler}>
      {label}
    </button>
  )
}

export default SetPageBtn