import styles from './profileShipping.module.scss';
import { useChangeAccountMutation, useGetCustomerQuery } from '../../store/api/customers.api';
import FormikForm from '../FormikForm';
import { validationSchemaOrderShipping } from '../../validation';
import { areObjectsEqual } from '../../utils';
import Loader from "../Loader";
import { useEffect, useState } from 'react';
import { shippingFields } from './shippingFields';
import { initialValuesShippingForm } from '../../utils/vars';

export function ProfileShipping() {
  const { data: customer = {}, isLoading } = useGetCustomerQuery();
  const [changeAccount] = useChangeAccountMutation();

  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const savedAddresses = customer?.deliveryAddresses || []

  async function chooseAddress(address) {
    await setInitialValues(null);
    await setInitialValues(address);
  }

  async function changeShipping(deliveryAddresses) {
    const { data } = await changeAccount({ deliveryAddresses });
    data?._id && setSuccess(true)
  }

  async function deleteAddress(deleted) {
    const deliveryAddresses = savedAddresses.filter((address) => !areObjectsEqual(address, deleted));
    changeShipping(deliveryAddresses);
  }

  async function onSubmitShippingChange(newAddress) {
    try {
      if (savedAddresses?.some((address) => areObjectsEqual(address, initialValues))) {
        const deliveryAddresses = savedAddresses.map((address) => (
          areObjectsEqual(address, initialValues)
            ? newAddress
            : address
        ))
        changeShipping(deliveryAddresses)
      } else {
        const deliveryAddresses = [...savedAddresses, newAddress];
        changeShipping(deliveryAddresses)
      }
      setInitialValues(newAddress);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
        clearTimeout(timer);
      }, 2500);
    }
  }, [error, success])

  if (isLoading) return <Loader />

  return (
    <>
      {error &&
        <div className={styles.error}>You enter wrong current password</div>}
      {success &&
        <div className={styles.success}>Your data updated successfully</div>}
      <div className={`${styles.block} ${styles.block_flat}`}>
        <h3 className={styles.block__title}>Shipping settings</h3>
        {savedAddresses?.length > 0
          ? <ul className={styles.block__list}>
            {savedAddresses.map((address) => (
              <li key={Math.random() * 1000} className={styles.block__item}>
                <span>{`${address?.city}${', ' + address?.street} ${address?.house}${', ' + address?.apartment}${', ' + address?.firstName} ${address?.lastName}${', ' + address?.telephone}`}</span>
                <div className={styles.block__btns}>
                  <button
                    className={`${styles.block__btn} ${styles.block__btn_small}`}
                    onClick={() => chooseAddress(address)}>
                    Change
                  </button>
                  {savedAddresses.length > 1 && <button
                    className={`${styles.block__btn} ${styles.block__btn_small}`}
                    onClick={() => deleteAddress(address)}>
                    Delete
                  </button>}
                </div>
              </li>
            ))}
          </ul>
          : <div className={styles.block__list_empty}>You didn't save any shipping options yet</div>}
        <button
          className={`${styles.block__btn} ${styles.block__btn_center}`}
          onClick={() => chooseAddress(initialValuesShippingForm)}>
          Create New
        </button>
      </div>
      {initialValues &&
        <div className={styles.block}>
          <button
            className={`${styles.block__btn} ${styles.block__btn_close}`}
            onClick={() => setInitialValues(null)}>
            Close
          </button>
          <FormikForm
            initialValues={initialValues}
            validationSchema={validationSchemaOrderShipping}
            fields={shippingFields}
            callback={onSubmitShippingChange}
            submitBtn="Update" />
        </div>}
    </>
  )
}