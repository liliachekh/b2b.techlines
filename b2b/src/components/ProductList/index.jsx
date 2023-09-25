import { useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import styles from './productList.module.scss';
import ProductCard from '../ProductCard';
import PerPageBtn from '../PerPageBtn';
import SortByBtn from '../SortByBtn';
import { IconCardList, IconTableList } from '../icons';
import Pagination from '../Pagination';

function ProductList({ products, productsQuantity }) {
  const [displayTable, setDisplayTable] = useState(false);
  const ref = useRef(null);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div ref={ref} className={`${styles.productList} ${displayTable ? styles.productTable : ''}`}>
      <div className={styles.productList__container}>
        <div className={styles.productList__inner}>
          <div className={styles.productList__wrapper}>
            <div className={styles.productList__btns}>
              <div className={styles.productList__controlTitle}>
                Sort by
              </div>
              <SortByBtn label='Product' type='name' />
              <SortByBtn label='Cost' type='currentPrice' />
            </div>
            {!isMobile &&
              <div className={styles.productList__btns}>
                <div className={styles.productList__controlTitle}>
                  Display Style
                </div>
                <button
                  className={styles.productList__btn}
                  type='button'
                  onClick={() => setDisplayTable(!displayTable)}>
                  {displayTable ? <IconTableList /> : <IconCardList />}
                </button>
              </div>}
          </div>
          <div className={styles.productList__list}>
            {products?.length > 0
              ?
              products?.map((product) => (
                <ProductCard {...product} displayTable={displayTable} key={product?._id} />
              ))
              :
              <div className={`${styles.productList__empty} ${styles.empty}`}>
                <h4 className={styles.empty__title}>No Results Found</h4>
                <h5 className={styles.empty__subtitle}>Search Tips:</h5>
                <ul className={styles.empty__searchTips}>
                  <li className={styles.empty__tip}>Try checking your spelling</li>
                  <li className={styles.empty__tip}>Use another search term</li>
                </ul>
              </div>}
          </div>
          <div className={styles.productList__wrapper}>
            <div className={styles.productList__btns}>
              <div className={styles.productList__controlTitle}>
                Items per page
              </div>
              {[10, 25, 50, 100].map((item) => (
                <PerPageBtn
                  key={item}
                  scrollTo={ref}
                  newPerPage={item} />
              ))}
            </div>
            {productsQuantity > 0 &&
              <div className={styles.productList__btns}>
                <Pagination
                  scrollTo={ref}
                  productsLength={products?.length}
                  productsQuantity={productsQuantity} />
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList;

ProductList.propTypes = {
  products: PropTypes.array,
  productsQuantity: PropTypes.number,
}