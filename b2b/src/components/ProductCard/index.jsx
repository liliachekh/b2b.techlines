import PropTypes from 'prop-types';
import styles from './productCard.module.scss';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useEffect, useState } from 'react';
import { Arrow, Cart } from '../icons';
import { useDeleteFromCartMutation } from '../../store/api/cart.api';
import { useAddToCart, useAmountChange, useInCart, useIncrease, useTierPrice } from '../../hooks';

function ProductCard({ _id, imageUrls, quantity, name, currentPrice, categories, brand, itemNo, productUrl, displayTable, cartItem, orderQuantity }) {
  const [handleAddToCart, isAdditing] = useAddToCart();
  const [deleteFromCart, {isLoading: isDeleting}] = useDeleteFromCartMutation();
  const tierPrice = useTierPrice();

  const [amount, setAmount] = useState(1);

  const increase = useIncrease(_id, quantity, amount, setAmount);
  const handleAmountChange = useAmountChange(_id, quantity, setAmount);

  const inCart = useInCart(_id);

  async function handleDeleteFromCart(e, id) {
    e.target.disabled = true;
    await deleteFromCart(id).unwrap();
  }

  useEffect(() => {
    setAmount(inCart?.cartQuantity || 1);
  }, [inCart])

  return (
    <div className={`${styles.productCard} ${displayTable ? styles.productRow : ''} ${cartItem ? styles.cart : ''} ${orderQuantity ? styles.order : ''}`}>
      <Link to={`/product/${productUrl}`} className={styles.productCard__mainLink}>
        <LazyLoadImage
          className={styles.productCard__img}
          src={imageUrls[0]}
          alt={name}
          effect="blur"
          placeholderSrc={'/images/background-auth.webp'}
          height={255}
          width='100%' />
        {!cartItem && !orderQuantity &&
          <p className={styles.productCard__name}>
            {name}
          </p>}
      </Link>

      <div className={styles.productCard__links}>
        {(cartItem || orderQuantity) &&
          <Link to={`/product/${productUrl}`} className={styles.productCard__name}>
            {name}
          </Link>}
        <Link to={`/products/filter?&categories=${brand}`} className={styles.productCard__link}>
          {brand}
        </Link>
        <Link to={`/products/filter?&categories=${categories}`} className={styles.productCard__link}>
          {categories}
        </Link>
        {(cartItem || orderQuantity) &&
          <div className={styles.productCard__price}>
            <span className={styles.productCard__price_title}>Price for one:</span>
            {tierPrice(currentPrice)} €
          </div>}
      </div>

      {!orderQuantity ? (
        <div className={`${styles.productCard__purchase} ${styles.purchase}`}>
          {!cartItem &&
            <div className={styles.purchase__price}>
              {tierPrice(currentPrice)} €
            </div>}
          <div className={`${styles.productCard__amount} ${styles.amount}`}>
            <button
              type='button'
              disabled={amount === 1}
              className={`${styles.amount__btn} ${styles.amount__btn_decrease} `}
              onClick={amount > 1 ? (e) => increase(false) : null} />
            <input
              name={name}
              type="number"
              className={styles.amount__input}
              value={amount}
              onChange={handleAmountChange} />
            <button
              type='button'
              disabled={amount === quantity}
              className={`${styles.amount__btn} ${styles.amount__btn_increase} `}
              onClick={(e) => increase(true)} />
          </div>
          <div className={`${styles.purchase__price} ${styles.purchase__price_total} `}>
            {(tierPrice(currentPrice) * amount)?.toFixed(2)} €
          </div>
          {!cartItem && (!inCart
            ? <button
              type='button'
              className={`${styles.purchase__addToCart} ${isAdditing && styles.loading}`}
              onClick={() => handleAddToCart(_id, amount)}>
              Add to cart
              <Cart color={'#f7fbfa'} width={20} height={20} strokeWidth={'2'} />
            </button>
            : <Link
              to='/cart'
              className={`${styles.purchase__addToCart} ${styles.purchase__addToCart_added} `}>
              Go to cart
              <Arrow fill={'#f7fbfa'} width={20} height={20} />
            </Link>)}
        </div>)
        : (
          <div className={`${styles.productCard__purchase} ${styles.purchase}`}>
            <div className={styles.purchase__quantity}>Quantity: {orderQuantity} pc`s</div>
            <div className={`${styles.purchase__price} ${styles.purchase__price_total} `}>
              Price: {(currentPrice * amount)?.toFixed(2)} €
            </div>
          </div>)
      }
      {cartItem &&
        <button
          type='button'
          className={`${styles.productCard__delete} ${isDeleting && styles.loading}`}
          onClick={(e) => handleDeleteFromCart(e, _id)}>
        </button>}
    </div >
  );
}

ProductCard.propTypes = {
  _id: PropTypes.string.isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string),
  quantity: PropTypes.number,
  name: PropTypes.string,
  currentPrice: PropTypes.number,
  categories: PropTypes.string,
  brand: PropTypes.string,
  itemNo: PropTypes.string,
  displayTable: PropTypes.bool,
  cartItem: PropTypes.bool
};

ProductCard.defaultProps = {
  imageUrls: [],
  quantity: 0,
  currentPrice: 0,
  cartItem: false,
};

export default ProductCard;