// import PropTypes from 'prop-types';
import styles from './cartItem.module.scss';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useEffect, useState } from 'react';
import { useDeleteFromCartMutation, useGetCartQuery } from '../../store/api/cart.api';
import { useAddToCart } from '../../hooks';

function CartItem({ _id, imageUrls, quantity, name, currentPrice, categories, brand, itemNo, displayTable }) {
  const { data: cart } = useGetCartQuery();
  const handleAddToCart = useAddToCart();

  const [amount, setAmount] = useState(1);

  const inCart = cart?.products.find(({ product }) => product._id === _id);

  const [deleteFromCart] = useDeleteFromCartMutation();
  async function handleDeleteFromCart(id) {
    await deleteFromCart(id).unwrap();
  }

  function handleAmountChange(e) {
    if (e.target.value > 0 && e.target.value <= quantity) {
      handleAddToCart(_id, e.target.value);
    }
  }

  async function increase(plus) {
    try {
      if (plus && quantity > amount) {
        handleAddToCart(_id, Number(amount) + 1);
      } else if (!plus) {
        handleAddToCart(_id, Number(amount) - 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setAmount(inCart?.cartQuantity || 1);
  }, [inCart])

  return (
    <div className={styles.product}>
      <Link to={`/product/${itemNo}`} className={styles.product__mainLink}>
        <LazyLoadImage
          className={styles.product__img}
          src={imageUrls[0]}
          alt={name}
          effect="blur"
          placeholderSrc={'./images/Home.webp'}
          height={255}
          width='100%' />
      </Link>
      <div className={styles.product__links}>
        <Link to={`/product/${itemNo}`} className={styles.product__name}>{name}</Link>
        <Link to={`/products/filter?&categories=${brand}`} className={styles.product__link}>
          {brand}
        </Link>
        <Link to={`/products/filter?&categories=${categories}`} className={styles.product__link}>
          {categories}
        </Link>
        <div className={styles.product__price}>
          <span className={styles.product__price_title}>Price for one:</span>
          {currentPrice.toFixed(2)} €
        </div>
      </div>
      <div className={`${styles.product__purchase} ${styles.purchase}`}>
        <div className={`${styles.purchase__amount} ${styles.amount}`}>
          <button
            type='button'
            disabled={amount === 1}
            className={`${styles.amount__btn} ${styles.amount__btn_decrease}`}
            onClick={amount > 1 ? (e) => increase(false) : null} />
          <input
            name={name}
            type="number"
            className={styles.amount__input}
            value={amount}
            onChange={handleAmountChange} />
          <button
            type='button'
            className={`${styles.amount__btn} ${styles.amount__btn_increase}`}
            onClick={(e) => increase(true)} />
        </div>
        <div className={`${styles.purchase__price} ${styles.purchase__price_total}`}>
          {/* <span className={styles.purchase__price_title}>Total amount:</span> */}
          {(currentPrice * amount).toFixed(2)} €
        </div>
      </div>
      <button
        type='button'
        className={styles.product__delete}
        onClick={() => handleDeleteFromCart(_id)}>
      </button>
    </div>
  );
}

// CartItem.propTypes = {
//   _id: PropTypes.string.isRequired,
//   imageUrls: PropTypes.arrayOf(PropTypes.string),
//   authorIcon: PropTypes.string,
//   author: PropTypes.string,
//   currentPrice: PropTypes.number,
//   buttonText: PropTypes.string,
//   buttonHandler: PropTypes.func,
//   adminCard: PropTypes.bool
// };

// CartItem.defaultProps = {
//   imageUrls: [],
//   authorIcon: '/images/avatars/user-icon.png',
//   author: 'varios author',
//   currentPrice: 0,
//   buttonText: "Buy now",
// };

export default CartItem;