import styles from './productDetails.module.scss';
import { Cart } from '../icons/cart';
import { useEffect, useState } from 'react';
import ProductsSlider from '../ProductSlider';
import { Arrow } from '../icons';
import { useAddToCart, useAmountChange, useInCart, useIncrease } from '../../hooks';
import { Link } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';

export default function ProductDetails({ _id, name, currentPrice, brand, itemNo, quantity, imageUrls, cartItem }) {
  useTitle(name);

  const handleAddToCart = useAddToCart();

  const [amount, setAmount] = useState(1);

  const increase = useIncrease(_id, quantity, amount, setAmount);
  const handleAmountChange = useAmountChange(_id, quantity, setAmount);

  const inCart = useInCart(_id);

  useEffect(() => {
    setAmount(inCart?.cartQuantity || 1);
  }, [inCart])

  return (
    <div className={styles.wrapper}>
      <div className={styles.sliderContainer}>
        <ProductsSlider imageUrls={imageUrls} />
      </div>
      <div className={styles.product}>
        <div className={styles.product__header}>
          <h2 className={styles.product__title}>{name}</h2>
        </div>
        <div className={styles.product__item}>
            <p className={styles.product__item_info}>Brand: {brand}</p>
            <p className={styles.product__item_info}>Product EAN: {itemNo}</p>
        </div>
        <div className={styles.product__details}>
          <h3 className={styles.product__details_title}>Price:</h3>
          <p className={styles.product__details_price}>{currentPrice} €</p>
        </div>
        <div className={styles.purchase}>
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
        <div className={styles.purchase__price}>
            <p className={styles.purchase__price_text}>Total amount:</p>
            <p className={styles.purchase__price_total}>{(currentPrice * amount).toFixed(2)} €</p>
        </div>
          {!cartItem && (!inCart
          ? <button
            type='button'
            className={styles.purchase__addToCart}
            onClick={() => handleAddToCart(_id, amount)}
            >
            Add to cart
            <Cart color={'#f7fbfa'} strokeWidth={'2'} />
          </button>
          : <Link 
            to='/cart'
            className={`${styles.purchase__addToCart} ${styles.purchase__addToCart_added}`}>
            Go to cart
            <Arrow fill={'#f7fbfa'} width={24} height={24} />
          </Link>)}
        </div>
      </div>
    </div>
  );
}