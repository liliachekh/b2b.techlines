import styles from './productDetails.module.scss';
import { useEffect, useState } from 'react';
import ProductsSlider from '../ProductSlider';
import { useAmountChange, useInCart, useIncrease, useTierPrice, useTitle } from '../../hooks';
import AddToCartBtn from '../AddToCartBtn';

export default function ProductDetails({ _id, name, currentPrice, brand, itemNo, quantity, imageUrls, enabled }) {
  useTitle(name);
  const tierPrice = useTierPrice();

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
          <p className={styles.product__details_price}>{tierPrice(currentPrice)} €</p>
        </div>
        <div className={styles.purchase}>
          <div className={`${styles.purchase__amount} ${styles.amount}`}>
            <button
              type='button'
              disabled={amount === 1}
              className={`${styles.amount__btn} ${styles.amount__btn_decrease}`}
              onClick={amount > 1 ? () => increase(false) : null} />
            <input
              name={name}
              type="number"
              className={styles.amount__input}
              value={amount}
              onChange={handleAmountChange} />
            <button
              type='button'
              className={`${styles.amount__btn} ${styles.amount__btn_increase}`}
              onClick={() => increase(true)} />
          </div>
          <div className={styles.purchase__price}>
            <p className={styles.purchase__price_text}>Total amount:</p>
            <p className={styles.purchase__price_total}>{(tierPrice(currentPrice) * amount)?.toFixed(2)} €</p>
          </div>
          <AddToCartBtn id={_id} enabled={enabled} amount={amount} quantity={quantity} />
        </div>
      </div>
    </div>
  );
}