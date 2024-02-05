import PropTypes from 'prop-types';
import styles from './productCard.module.scss';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useEffect, useState } from 'react';
import { useDeleteFromCartMutation } from '../../store/api/cart.api';
import { useAmountChange, useInCart, useIncrease, useTierPrice } from '../../hooks';
import AddToCartBtn from '../AddToCartBtn';

function ProductCard({ _id, imageUrls, quantity, name, currentPrice, categories, brand, enabled, productUrl, displayTable, cartItem, orderQuantity }) {
  const [deleteFromCart, { isLoading: isDeleting }] = useDeleteFromCartMutation();
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

  if (cartItem) return (
    <div className={`${styles.productCard} ${styles.cart}`}>
      <Link to={`/product/${productUrl}`} className={styles.productCard__mainLink}>
        <LazyLoadImage
          className={styles.productCard__img}
          src={imageUrls[0]}
          alt={name}
          effect="blur"
          placeholderSrc={'/images/background-auth.webp'}
          height={255}
          width='100%' />
      </Link>
      <div className={styles.productCard__links}>
        <Link to={`/product/${productUrl}`} className={styles.productCard__name}>
          {name}
        </Link>
        <Link to={`/products/filter?&categories=${brand}`} className={styles.productCard__link}>
          {brand}
        </Link>
        <Link to={`/products/filter?&categories=${categories}`} className={styles.productCard__link}>
          {categories}
        </Link>
        <div className={styles.productCard__price}>
          <span className={styles.productCard__price_title}>Price for one:</span>
          {tierPrice(currentPrice)} €
        </div>
      </div>
      <div className={`${styles.productCard__purchase} ${styles.purchase}`}>
        <div className={`${styles.productCard__amount} ${styles.amount}`}>
          <button
            type='button'
            disabled={amount === 1}
            className={`${styles.amount__btn} ${styles.amount__btn_decrease} `}
            onClick={amount > 1 ? () => increase(false) : null} />
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
            onClick={() => increase(true)} />
        </div>
        <div className={`${styles.purchase__price} ${styles.purchase__price_total} `}>
          {(tierPrice(currentPrice) * amount)?.toFixed(2)} €
        </div>
      </div>
      <button
        type='button'
        className={`${styles.productCard__delete} ${isDeleting && styles.loading}`}
        onClick={(e) => handleDeleteFromCart(e, _id)}>
      </button>
    </div >
  );

  if (orderQuantity) return (
    <div className={`${styles.productCard} ${displayTable ? styles.productRow : ''} ${styles.order}`}>
      <Link to={`/product/${productUrl}`} className={styles.productCard__mainLink}>
        <LazyLoadImage
          className={styles.productCard__img}
          src={imageUrls[0]}
          alt={name}
          effect="blur"
          placeholderSrc={'/images/background-auth.webp'}
          height={255}
          width='100%' />
      </Link>
      <div className={styles.productCard__links}>
        <Link to={`/product/${productUrl}`} className={styles.productCard__name}>
          {name}
        </Link>
        <Link to={`/products/filter?&categories=${brand}`} className={styles.productCard__link}>
          {brand}
        </Link>
        <Link to={`/products/filter?&categories=${categories}`} className={styles.productCard__link}>
          {categories}
        </Link>
        <div className={styles.productCard__price}>
          <span className={styles.productCard__price_title}>Price for one:</span>
          {tierPrice(currentPrice)} €
        </div>
      </div>
      <div className={`${styles.productCard__purchase} ${styles.purchase}`}>
        <div className={styles.purchase__quantity}>Quantity: {orderQuantity} pc`s</div>
        <div className={`${styles.purchase__price} ${styles.purchase__price_total} `}>
          Price: {(currentPrice * amount)?.toFixed(2)} €
        </div>
      </div>
    </div >
  );

  return (
    <div className={`${styles.productCard} ${displayTable ? styles.productRow : ''}`}>
      <Link to={`/product/${productUrl}`} className={styles.productCard__mainLink}>
        <LazyLoadImage
          className={styles.productCard__img}
          src={imageUrls[0]}
          alt={name}
          effect="blur"
          placeholderSrc={'/images/background-auth.webp'}
          height={255}
          width='100%' />
        <p className={styles.productCard__name}>
          {name}
        </p>
      </Link>
      <div className={styles.productCard__links}>
        <Link to={`/products/filter?&categories=${brand}`} className={styles.productCard__link}>
          {brand}
        </Link>
        <Link to={`/products/filter?&categories=${categories}`} className={styles.productCard__link}>
          {categories}
        </Link>
      </div>
      <div className={`${styles.productCard__purchase} ${styles.purchase}`}>
        <div className={styles.purchase__price}>
          {tierPrice(currentPrice)} €
        </div>
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
        <AddToCartBtn id={_id} enabled={enabled} amount={amount} quantity={quantity} displayTable={displayTable} />
      </div>
    </div >
  );
}

ProductCard.propTypes = {
  _id: PropTypes.string.isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string),
  quantity: PropTypes.number,
  name: PropTypes.string.isRequired,
  currentPrice: PropTypes.number,
  categories: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  displayTable: PropTypes.bool,
  cartItem: PropTypes.bool,
  orderQuantity: PropTypes.number
};

ProductCard.defaultProps = {
  imageUrls: [],
  quantity: 0,
  currentPrice: 0,
  displayTable: false,
  cartItem: false,
  orderQuantity: 0,
};

export default ProductCard;