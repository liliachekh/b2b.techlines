import styles from './sortByBtn.module.scss';
import { Arrow } from '../icons/arrow';
import { useSearchParams } from "react-router-dom";

function SortByBtn({ label, type }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');

  async function clickHandler() {
    let newSort = '';
    if (sort === type) {
      newSort = `-${type}`
    } else if (sort === `-${type}`) {
      newSort = ''
    } else {
      newSort = type
    }
    
    let query = { ...searchParams, startPage: 1 };
    if (newSort) query = { ...searchParams, sort: newSort, startPage: 1 };

    setSearchParams(query);
  }

  return (
    <button
      className={`${styles.btn} ${sort === type ? styles.arrowUp : styles.arrowDown}`}
      type='button'
      onClick={clickHandler}>
      {label}{sort?.includes(type) && <Arrow fill={'#f7fbfa'} />}
    </button>
  )
}

export default SortByBtn