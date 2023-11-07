import styles from '../ProductList/productList.module.scss';
import { Arrow } from '../icons/arrow';
import { useQueryString } from '../../hooks';
import { sortByParams } from './sortByParams';

function SortByBtn() {
  const { params, setSearchParams } = useQueryString();

  async function clickHandler(type) {
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
    <div className={styles.controller}>
      <div className={styles.controller__title}>
        Sort by
      </div>
      {sortByParams.map((sortBy) => (
        <button
          key={sortBy.type}
          className={`${styles.controller__btn} ${params['sort'] === sortBy.type ? styles.arrowUp : styles.arrowDown}`}
          type='button'
          onClick={() => clickHandler(sortBy.type)}>
          {sortBy.label}{params['sort']?.includes(sortBy.type) && <Arrow fill={'#f7fbfa'} />}
        </button>
      ))}
    </div>
  )
}

export default SortByBtn