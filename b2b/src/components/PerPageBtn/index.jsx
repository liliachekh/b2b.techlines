import styles from './perPageBtn.module.scss';
import { scrollToRef } from '../../utils';
import { useQueryString } from '../../hooks';

function PerPageBtn({ newPerPage, scrollTo }) {
  const { params, setSearchParams } = useQueryString();
  const perPage = params.perPage;

  const activeBtn = (Number(perPage) === newPerPage );

  async function clickHandler() {
    if (!activeBtn) {
      const query = { ...params, perPage: newPerPage, startPage: 1 };
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