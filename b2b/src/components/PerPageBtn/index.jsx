import styles from './perPageBtn.module.scss';
import { scrollToRef } from '../../utils';
import { useQueryString } from '../../hooks';

function PerPageBtn({ newPerPage, scrollTo }) {
  const { search, sort, perPage, setSearchParams } = useQueryString();

  const activeBtn = (Number(perPage) === newPerPage || (!perPage && newPerPage === 10));

  async function clickHandler() {
    if (!activeBtn) {
      let query = { perPage: newPerPage, startPage: 1 };

      if (sort) query = { sort, ...query };
      if (search) query = { search, ...query };

      setSearchParams(query);
    }
    scrollToRef(scrollTo);
  }

  return (
    <button
      className={`${styles.btn} ${activeBtn ? styles.btn_active : ''}`}
      type='button'
      onClick={clickHandler}>
      {newPerPage}
    </button>
  )
}

export default PerPageBtn