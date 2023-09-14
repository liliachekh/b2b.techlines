import styles from './sortByBtn.module.scss';
import { Arrow } from '../icons/arrow';
import { useQueryString } from '../../hooks';

function SortByBtn({ label, type }) {
  const { params, setSearchParams } = useQueryString();

  async function clickHandler() {
    let newSort = '';
    if (params['sort'] === type) {
      newSort = `-${type}`
    } else if (params['sort'] === `-${type}`) {
      newSort = ''
    } else {
      newSort = type
    }

    let query = { ...params, startPage: 1 };
    
    if (newSort) {
      query = { ...params, sort: newSort, startPage: 1 }
    } else {
      delete query['sort']
    }

    setSearchParams(query);
  }

  return (
    <button
      className={`${styles.btn} ${params['sort'] === type ? styles.arrowUp : styles.arrowDown}`}
      type='button'
      onClick={clickHandler}>
      {label}{params['sort']?.includes(type) && <Arrow fill={'#f7fbfa'} />}
    </button>
  )
}

export default SortByBtn