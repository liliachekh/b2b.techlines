import PropTypes from 'prop-types';
import productStyle from './productCard.module.scss';
import cartStyle from './cartItem.module.scss';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useEffect, useState } from 'react';
import { Arrow, Cart } from '../icons';
import { useDeleteFromCartMutation, useGetCartQuery } from '../../store/api/cart.api';
import { useAddToCart } from '../../hooks';

function ProductCard({ _id, imageUrls, quantity, name, currentPrice, categories, brand, itemNo, displayTable, cartItem }) {
  const { data: cart = {} } = useGetCartQuery();
  const handleAddToCart = useAddToCart();
  const [deleteFromCart] = useDeleteFromCartMutation();

  const [amount, setAmount] = useState(1);

  const inCart = cart?.products.find(({ product }) => product._id === _id);

  async function handleDeleteFromCart(e, id) {
    e.target.disabled = true;
    await deleteFromCart(id).unwrap();
  }

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
    <div className={!cartItem
      ? `${productStyle.productCard} ${displayTable ? productStyle.productRow : ''}`
      : cartStyle.productCard}>
      <Link to={`/ product / ${itemNo} `} className={!cartItem ? productStyle.productCard__mainLink : cartStyle.productCard__mainLink}>
        <LazyLoadImage
          className={!cartItem ? productStyle.productCard__img : cartStyle.productCard__img}
          src={imageUrls[0]}
          alt={name}
          effect="blur"
          placeholderSrc={'./images/Home.webp'}
          height={255}
          width='100%' />
        {!cartItem &&
          <p className={productStyle.productCard__name}>
            {name}
          </p>}
      </Link>
      <div className={!cartItem ? productStyle.productCard__links : cartStyle.productCard__links}>
        {cartItem &&
          <Link to={`/ product / ${itemNo} `} className={cartStyle.productCard__name}>
            {name}
          </Link>}
        <Link to={`/ products / filter ?& categories=${brand} `} className={!cartItem ? productStyle.productCard__link : cartStyle.productCard__link}>
          {brand}
        </Link>
        <Link to={`/ products / filter ?& categories=${categories} `} className={!cartItem ? productStyle.productCard__link : cartStyle.productCard__link}>
          {categories}
        </Link>
        {cartItem &&
          <div className={cartStyle.productCard__price}>
            <span className={cartStyle.productCard__price_title}>Price for one:</span>
            {currentPrice.toFixed(2)} €
          </div>}
      </div>
      <div
        className={!cartItem
          ? `${productStyle.productCard__purchase} ${productStyle.purchase} `
          : `${cartStyle.productCard__purchase} ${cartStyle.purchase}`}>
        {!cartItem &&
          <div className={productStyle.purchase__price}>
            {currentPrice.toFixed(2)} €
          </div>}
        <div className={!cartItem
          ? `${productStyle.purchase__amount} ${productStyle.amount} `
          : `${cartStyle.purchase__amount} ${cartStyle.amount} `}>
          <button
            type='button'
            disabled={amount === 1}
            className={!cartItem
              ? `${productStyle.amount__btn} ${productStyle.amount__btn_decrease} `
              : `${cartStyle.amount__btn} ${cartStyle.amount__btn_decrease} `}
            onClick={amount > 1 ? (e) => increase(false) : null} />
          <input
            name={name}
            type="number"
            className={!cartItem ? productStyle.amount__input : cartStyle.amount__input}
            value={amount}
            onChange={handleAmountChange} />
          <button
            type='button'
            disabled={amount === quantity}
            className={!cartItem
              ? `${productStyle.amount__btn} ${productStyle.amount__btn_increase} `
              : `${cartStyle.amount__btn} ${cartStyle.amount__btn_increase} `}
            onClick={(e) => increase(true)} />
        </div>
        <div className={!cartItem
          ? `${productStyle.purchase__price} ${productStyle.purchase__price_total} `
          : `${cartStyle.purchase__price} ${cartStyle.purchase__price_total} `}>
          {(currentPrice * amount).toFixed(2)} €
        </div>
        {!cartItem && (!inCart
          ? <button
            type='button'
            className={productStyle.purchase__addToCart}
            onClick={() => handleAddToCart(_id, amount)}>
            Add to cart
            <Cart color={'#f7fbfa'} width={20} height={20} strokeWidth={'2'} />
          </button>
          : <Link
            to='/cart'
            className={`${productStyle.purchase__addToCart} ${productStyle.purchase__addToCart_added} `}>
            Go to cart
            <Arrow fill={'#f7fbfa'} width={20} height={20} />
          </Link>)}
      </div>
      {cartItem &&
        <button
          type='button'
          className={cartStyle.productCard__delete}
          onClick={(e) => handleDeleteFromCart(e, _id)}>
        </button>}
    </div>
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