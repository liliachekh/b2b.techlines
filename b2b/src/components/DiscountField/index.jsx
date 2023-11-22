import styles from "./discountField.module.scss";
import { useState } from "react";
import { useUpdateCart } from '../../hooks';
import { baseUrl } from '../../utils/vars';

function DiscountField({ discount }) {
  const updateCart = useUpdateCart();

  const [discountField, setDiscountField] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountError, setDiscountError] = useState(false);

  async function setDiscount(discount) {
    if (!discount) {
      updateCart(0);
      return
    }

    try {
      const code = await fetch(`${baseUrl}discounts/${discount}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!code.ok) {
        const error = await code.json()
        throw new Error(error?.message);
      }

      const discountData = await code.json()
      updateCart(discountData.amount)
      showDiscountField()
    } catch (error) {
      setDiscountError(error?.message)
    }
  }

  function showDiscountField() {
    setDiscountField(!discountField);
    setDiscountCode('');
    setDiscountError(null);
  }

  function handleInputChange(e) {
    setDiscountCode(e.target.value)
    setDiscountError(null)
  }

  return (
    <div className={styles.discount}>

      <h3 className={styles.discount__title}>Discount</h3>
      {!discount
        ?
        <>
          <button
            className={`${styles.discount__btn} ${!discountField ? styles.discount__btn_add : styles.discount__btn_cancel}`}
            onClick={showDiscountField} />
          {discountField &&
            <div className={styles.discount__form}>
              <label className={styles.discount__label}>
                <input
                  className={`${styles.discount__input} ${discountError ? styles.discount__input_error : ''}`}
                  value={discountCode}
                  onChange={handleInputChange}
                  name="discountCode"
                  type="text"
                  placeholder='Enter discount code' />
                {discountError && <span className={styles.discount__error}>{discountError}</span>}
              </label>
              <button
                className={styles.discount__submit}
                type="button" disabled={!discountCode}
                onClick={() => setDiscount(discountCode)}>
                Apply
              </button>
            </div>}
        </>
        :
        <div className={styles.discount__amount}>
          -{discount} €
          <button
            className={`${styles.discount__btn} ${styles.discount__btn_cancel}`}
            type="button"
            onClick={() => setDiscount(null)} />
        </div>}
    </div>
  )
};

export default DiscountField;