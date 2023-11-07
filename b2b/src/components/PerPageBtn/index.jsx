import styles from '../ProductList/productList.module.scss';
import { scrollToRef } from '../../utils';
import { useQueryString } from '../../hooks';

function PerPageBtn({ scrollTo }) {
  const { params, setSearchParams } = useQueryString();
  const perPage = params.perPage;

  async function clickHandler(item) {
    if (Number(perPage) !== item) {
      setSearchParams({ ...params, perPage: item, startPage: 1 });
    }
    scrollToRef(scrollTo);
  }

  return (
    <div className={styles.controller}>
      <div className={styles.controller__title}>
        Items per page
      </div>
      {[10, 25, 50, 100].map((item) => (
        <button
          key={item}
          className={`${styles.controller__btn} ${Number(perPage) === item ? styles.controller__btn_active : ''}`}
          type='button'
          onClick={() => clickHandler(item)}>
          {item}
        </button>
      ))}
    </div>
  )
}

export default PerPageBtn