import style from "./adminProductCard.module.scss";
import { Link } from 'react-router-dom';
import { Delete, Edit, View } from '../icons';
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export function AdminProductCard({ product: { imageUrls, name, currentPrice, productUrl, _id, itemNo, quantity, enabled }, deleteButtonHandler, buttonHandler }) {
  const isMobile = useMediaQuery({ query: '(max-width: 580px)' });

  return (
    <div className={style.card}>
      <div className={style.card__icon}>
        <img
          className={style.card__img}
          src={imageUrls[0]}
          alt={name} />
      </div>
      <p className={style.card__prop}>
        {name}
      </p>
      {isMobile ? (
        <p className={style.card__prop}>
          Quantity: {quantity}
        </p> ) : (
        <p className={style.card__prop}>
        {quantity}
        </p>)
      }
      <p className={style.card__prop}>
        {enabled ? 'Enabled' : 'Disabled'}
      </p>
      {isMobile ? (
        <p className={style.card__prop}>
          Current price: {currentPrice}$
        </p> ) : (
        <p className={style.card__prop}>
        {currentPrice}$
        </p>)
      }
      <div className={style.card__buttons}>
        <Link
          to={`/${productUrl}`}
          className={style.card__btn}
          title="View on website"
          target="_blank">
          <View />
        </Link>
        <button
          className={style.card__btn}
        //   onClick={buttonHandler}
          title="Edit">
          <Edit />
        </button>
        <button
          className={style.card__btn}
        //   onClick={deleteButtonHandler}
          title="Delete">
          <Delete />
        </button>
      </div>
    </div>
  )
}