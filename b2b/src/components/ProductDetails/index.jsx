import styles from './productDetails.module.scss';
import { Cart } from '../icons/cart';
import { useState } from 'react';
import ProductsSlider from '../ProductSlider';
import { useDispatch, useSelector } from 'react-redux';
import { Arrow } from '../icons';

export default function ProductDetails({ _id, name, currentPrice, brand, itemNo, quantity, imageUrls, categories, theme, details }) {
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.products);

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
          {!cart.find((product) => product.id === _id)
          ? <button
            type='button'
            className={styles.purchase__addToCart}
            // onClick={() => handleAddToCart(dispatch, _id, amount)}
            >
            Add to cart
            <Cart color={'#f7fbfa'} strokeWidth={'2'} />
          </button>
          : <button
            type='button'
            className={`${styles.purchase__addToCart} ${styles.purchase__addToCart_added}`}
            // onClick={() => handleAddToCart(dispatch, _id, amount)}
            >
            Go to cart
            <Arrow fill={'#f7fbfa'} width={24} height={24} />
          </button>}
        </div>
      </div>
    </>
  );
}