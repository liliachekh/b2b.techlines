import styles from './pagination.module.scss';
import SetPageBtn from "../SetPageBtn";
import { Arrow } from "../icons";
import { useQueryString } from '../../hooks';

function Pagination({ scrollTo, productsLength, productsQuantity }) {
  const { params } = useQueryString();
  const perPage = params.perPage
  const page = params.startPage

  const startItem = productsQuantity - productsLength + 1;
  const lastItem = page * productsLength;

  return (
    <div className={styles.pagination}>
      <SetPageBtn
        scrollTo={scrollTo}
        label={<Arrow fill={'#f7fbfa'} />}
        direction={false} />
      <div className={styles.pagination__text}>
        {productsLength < perPage
          ? startItem === productsQuantity ? startItem : startItem + ' - ' + productsQuantity
          : page * productsLength - perPage + 1 + ' - ' + (lastItem < productsQuantity ? lastItem : productsQuantity)}
        <span className={styles.pagination__text_between}>of</span>
        {productsQuantity}
      </div>
      <SetPageBtn
        scrollTo={scrollTo}
        productsLength={productsLength}
        label={<Arrow fill={'#f7fbfa'} />}
        direction={true} />
    </div>
  )
}

export default Pagination