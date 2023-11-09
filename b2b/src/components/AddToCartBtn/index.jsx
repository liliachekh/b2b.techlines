import styles from './addToCartBtn.module.scss';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useAddToCart, useInCart } from "../../hooks";
import { Arrow, Cart } from "../icons";

function AddToCartBtn({ id, enabled, amount, displayTable }) {
  const inCart = useInCart(id);
  const [handleAddToCart, isAdditing] = useAddToCart();

  if (inCart) return (
    <Link
      to='/cart'
      className={`${styles.addToCart} ${styles.addToCart_added} ${displayTable ? styles.productRow : ''}`}>
      Go to cart
      <Arrow fill={'#f7fbfa'} width={20} height={20} />
    </Link>
  )

  return (
    enabled
      ?
      <button
        type='button'
        className={`${styles.addToCart} ${displayTable ? styles.productRow : ''} ${isAdditing && styles.loading}`}
        onClick={() => handleAddToCart(id, amount)}>
        Add to cart
        <Cart color={'#f7fbfa'} width={20} height={20} strokeWidth={'2'} />
      </button>
      :
      <button type='button' className={`${styles.outOfStock} ${displayTable ? styles.productRow : ''}`}>
        Out of Stock
      </button>
  )
}

AddToCartBtn.propTypes = {
  id: PropTypes.string.isRequired,
  amount: PropTypes.number,
  enabled: PropTypes.bool,
  displayTable: PropTypes.bool,
};

AddToCartBtn.defaultProps = {
  amount: 1,
  enabled: true,
  displayTable: false
};

export default AddToCartBtn;