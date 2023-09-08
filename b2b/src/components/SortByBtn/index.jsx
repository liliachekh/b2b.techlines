import styles from './sortByBtn.module.scss';
import { Arrow } from '../icons/arrow';
import { useQueryString } from '../../hooks';

function SortByBtn({ label, type }) {
  const { search, sort, perPage, setSearchParams } = useQueryString()

  async function clickHandler() {
    let newSort = '';
    if (sort === type) {
      newSort = `-${type}`
    } else if (sort === `-${type}`) {
      newSort = ''
    } else {
      newSort = type
    }

    let query = { perPage, startPage: 1 };

    if (newSort) query = { sort: newSort, ...query };
    if (search) query = { search, ...query };

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