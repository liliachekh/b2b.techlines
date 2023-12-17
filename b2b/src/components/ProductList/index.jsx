import { useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import styles from './productList.module.scss';
import ProductCard from '../ProductCard';
import PerPageBtn from '../PerPageBtn';
import SortByBtn from '../SortByBtn';
import Pagination from '../Pagination';
import ProductListStyle from '../ProductListStyle';

function ProductList({ products, productsQuantity, customButtonHandler, adminCard = false, deleteButtonHandler }) {
  const [displayTable, setDisplayTable] = useState(false);
  const ref = useRef(null);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div ref={ref} className={`${styles.productList} ${displayTable ? styles.productTable : ''} ${adminCard ? styles.productTable : ''}`} >
      <div className={styles.productList__container}>
        <div className={styles.productList__inner}>
          {!adminCard && (
            <div className={styles.productList__wrapper}>
            <SortByBtn />
            {!isMobile &&
              <ProductListStyle
                style={displayTable}
                changeStyle={setDisplayTable} />}
          </div>
          )}
          <div className={styles.productList__list}>
            {products?.length > 0
              ? products?.map((product) => (
                <ProductCard {...product} displayTable={displayTable} key={product?._id} 
                buttonHandler={customButtonHandler}
                adminCard={adminCard}
                deleteButtonHandler={deleteButtonHandler}
                />
              ))
              : <div className={`${styles.productList__empty} ${styles.empty}`}>
                <h4 className={styles.empty__title}>No Results Found</h4>
                <h5 className={styles.empty__subtitle}>Search Tips:</h5>
                <ul className={styles.empty__searchTips}>
                  <li className={styles.empty__tip}>Try checking your spelling</li>
                  <li className={styles.empty__tip}>Use another search term</li>
                </ul>
              </div>}
          </div>
          <div className={styles.productList__wrapper}>
            <PerPageBtn scrollTo={ref} />
            {productsQuantity > 0 &&
              <Pagination
                scrollTo={ref}
                productsLength={products?.length}
                productsQuantity={productsQuantity} />}
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