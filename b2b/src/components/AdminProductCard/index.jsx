import style from "./adminProductCard.module.scss"
import { Link } from 'react-router-dom';
import { Delete, Edit, View, Copy, EditPrice, Check, Close } from '../icons';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useState, useRef, useEffect } from "react";
import { useUpdateProductPriceMutation } from "../../store/api/products.api";

export function AdminProductCard({ product: { imageUrls, name, currentPrice, _id, itemNo, quantity, brand, enabled, productUrl }, deleteButtonHandler, editButtonHandler, copyButtonHandler, refetchProducts, setSuccessMsg, setErrorMsg  }) {

  const [editPriceProdId, setEditPriceProdId] = useState(null);
  const [editPriceValue, setEditPriceValue] = useState('');
  const [updateProductPrice] = useUpdateProductPriceMutation();
  const cardRef = useRef();

  const handleEditPrice = (prodId, prodPrice) => {
    // встановити айді для редагування
    setEditPriceProdId(prodId);
    setEditPriceValue(prodPrice);
  };

  const handleInputChange = (e) => {
    // Запис нового значення в стейт
    setEditPriceValue(e.target.value);
  };

  const handleCancelEdit = () => {
    // скинути редагування
    setEditPriceProdId(null);
    setEditPriceValue('');
  };

  async function updatePrice(id, body) {
    try {
      const response = await updateProductPrice( { id, body: { currentPrice: body } } );
      if (response.data) {
        setSuccessMsg(true);
        refetchProducts();
        setEditPriceProdId(null);
        setEditPriceValue('');
      } else {
        setErrorMsg(response.error.data.message);
      }
    } catch (error) {
      setErrorMsg(error.data.message);
    }
  };

  function handleClickOutside (event) {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setEditPriceProdId(null);
      setEditPriceValue('');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className={style.card} ref={cardRef}>
      <div className={style.card__icon}>
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
      <div className={style.card__price}>
          {editPriceProdId === _id ? (
            <>
            <button onClick={handleCancelEdit}> <Close/> </button>
            </>
          ) : (
            <button
            className={style.card__btn}
            onClick={() => handleEditPrice(_id, currentPrice)}
            title="EditPrice">
              <EditPrice />
            </button>
          )}
          {editPriceProdId === _id ? (
          <div className={style.card__editPrice}>
            <input className={style.card__editPriceInput}
              type="text"
              id="editPrice"
              name="editPrice"
              value={editPriceValue}
              onChange={handleInputChange}
            />
            <button
              onClick={()=> updatePrice(editPriceProdId, editPriceValue)}
            > <Check/> </button>
          </div>
          ) : (
            <p className={style.card__prop}>
            {currentPrice}
            </p>
          )}
      </div>
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
          onClick={editButtonHandler}
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