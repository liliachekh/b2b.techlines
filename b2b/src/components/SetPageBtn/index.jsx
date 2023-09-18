import styles from './setPageBtn.module.scss';
import { scrollToRef } from '../../utils';
import { useQueryString } from '../../hooks';

function SetPageBtn({ scrollTo, productsLength, label, direction }) {
  const { params, setSearchParams } = useQueryString();
  const page = params.startPage;

  const disabled = direction && productsLength < params.perPage;

  async function clickHandler() {
    if (disabled) return;
    const newPage = direction ? Number(page || 1) + 1 : Number(page || 1) - 1;
    if (newPage === 0) return;

    const query = { ...params, startPage: newPage };

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