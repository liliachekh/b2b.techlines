import style from "./adminProductCard.module.scss"
import { Link } from 'react-router-dom';
import { Delete, Edit, View, Copy } from '../icons';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

export function AdminProductCard({ product: { imageUrls, name, currentPrice, _id, itemNo, quantity, brand, enabled, productUrl }, deleteButtonHandler, buttonHandler, copyButtonHandler }) {

  return (
    <div className={style.card}>
      <div className={style.card__icon}>
        {/* <img
          className={style.card__img}
          src={imageUrls[0]}
          alt={name} /> */}
        <LazyLoadImage
        className={style.card__img}
        src={imageUrls[0]}
        alt={name}
        effect="blur"
        placeholderSrc={'/images/background-auth.webp'}
        height={255}
        width='100%'/>
      </div>
      <p className={style.card__prop}>
        {name}
      </p>
      <p className={style.card__prop}>
        {brand}
      </p>
      <p className={style.card__prop}>
        {quantity}
      </p>
      <p className={style.card__prop}>
        {enabled ? 'Enabled' : 'Disabled'}
      </p>
      <p className={style.card__prop}>
        {currentPrice}
      </p>
      <div className={style.card__buttons}>
        <Link
          to={`/product/${productUrl}`}
          className={style.card__btn}
          title="View on website"
          target="_blank">
          <View />
        </Link>
        <button
          className={style.card__btn}
          onClick={buttonHandler}
          title="Edit">
          <Edit />
        </button>
        <button
          className={style.card__btn}
          onClick={deleteButtonHandler}
          title="Delete">
          <Delete />
        </button>
        <button
          className={style.card__btn}
          onClick={copyButtonHandler}
          title="Copy">
          <Copy />
        </button>
      </div>
    </div>
  )


}