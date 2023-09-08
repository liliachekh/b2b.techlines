import styles from './setPageBtn.module.scss';
import { scrollToRef } from '../../utils';
import { useQueryString } from '../../hooks';

function SetPageBtn({ scrollTo, productsLength, label, direction }) {
  const { search, sort, perPage, page, setSearchParams } = useQueryString();

  const disabled = direction && productsLength < perPage;

  async function clickHandler() {
    if (disabled) return;
    const newPage = direction ? Number(page || 1) + 1 : Number(page || 1) - 1;
    if (newPage === 0) return;

    let query = { perPage, startPage: newPage };

    if (sort) query = { sort, ...query };
    if (search) query = { search, ...query };

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