import styles from './productDetails.module.scss';
// import { Link } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import image from './img/iphone.jpg'
import { Cart } from '../icons/cart';
import { useState } from 'react';

export default function ProductDetails({ _id, name, currentPrice, brand, itemNo, quantity, imageUrls, categories, theme, details }) {
  const [amount, setAmount] = useState(1);
  
  function handleAmountChange(e) {
    if (e.target.value > 0 && e.target.value <= quantity) setAmount(e.target.value);
  }

  async function increase(plus) {
    try {
      if (plus && quantity > amount) {
        // dispatch(changeQuantity(cart, _id, token, plus));
        setAmount(Number(amount) + 1)
      } else if (!plus) {
        // dispatch(changeQuantity(cart, _id, token, plus));
        setAmount(Number(amount) - 1)
      }
    } catch (error) {
      console.log(error);
      // dispatch(setErrorAction(error));
    }
  }

  return (
    <>
      <div className={styles.content}>
        <LazyLoadImage
          className={styles.content__img} 
          src={imageUrls[0]} 
          // src={image}
          alt={name} 
          effect="blur" />
      </div>
      <div className={styles.actions}>
        <div className={styles.actions__header}>
          <h2 className={styles.actions__title}>{name}</h2>
        </div>
        <div className={styles.actions__product}>
            <p className={styles.actions__product_info}>Brand: {brand}</p>
            <p className={styles.actions__product_info}>Product EAN: {itemNo}</p>
            <p className={styles.actions__product_info}>Product code:</p>
        </div>
        <div className={`${styles.actions__details} ${styles.details}`}>
          <h3 className={styles.actions__details_title}>Cost list:</h3>
          <p className={styles.actions__details_price}>{currentPrice} €</p>
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
            <p className={styles.purchase__price_total}>{currentPrice} €</p>
        </div>
          <button
            type='button'
            className={styles.actions__mainBtn}>
            <Cart />
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </>
  );
}