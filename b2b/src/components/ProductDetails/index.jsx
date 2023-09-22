import styles from './productDetails.module.scss';
import { Cart } from '../icons/cart';
import { useEffect, useState } from 'react';
import ProductsSlider from '../ProductSlider';
import { Arrow } from '../icons';
import { useGetCartQuery } from '../../store/api/cart.api';
import { useAddToCart } from '../../hooks';
import { Link } from 'react-router-dom';

export default function ProductDetails({ _id, name, currentPrice, brand, itemNo, quantity, imageUrls, cartItem }) {
  const { data: cart = {} } = useGetCartQuery();
  const handleAddToCart = useAddToCart();

  const [amount, setAmount] = useState(1);

  const inCart = cart?.products?.find(({ product }) => product._id === _id);

  function handleAmountChange(e) {
    if (e.target.value > 0 && e.target.value <= quantity) {
      inCart ? handleAddToCart(_id, e.target.value) : setAmount(e.target.value);
    }
  }

  async function increase(plus) {
    try {
      if (inCart) {
        if (plus && quantity > amount) {
          handleAddToCart(_id, Number(amount) + 1);
        } else if (!plus) {
          handleAddToCart(_id, Number(amount) - 1);
        }
      } else {
        if (plus && quantity > amount) {
          setAmount(Number(amount) + 1);
        } else if (!plus) {
          setAmount(Number(amount) - 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setAmount(inCart?.cartQuantity || 1);
  }, [inCart])

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
    </>
  );
}