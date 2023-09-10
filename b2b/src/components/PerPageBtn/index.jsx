import styles from './perPageBtn.module.scss';
import { scrollToRef } from '../../utils';
import { useSearchParams } from "react-router-dom";

function PerPageBtn({ newPerPage, scrollTo }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || 25;

  const activeBtn = (Number(perPage) === newPerPage );

  async function clickHandler() {
    if (!activeBtn) {
      const query = { ...searchParams, perPage: newPerPage, startPage: 1 };

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