import styles from './profileSettings.module.scss';
import { useChangeAccountMutation, useChangePasswordMutation, useGetCustomerQuery } from '../../store/api/customers.api';
import { accountFields, passwordFields } from './profileFields';
import FormikForm from '../FormikForm';
import { validationSchemaAccount, validationSchemaPassword } from '../../validation';
import Loader from "../../components/Loader";
import { useEffect, useState } from 'react';

export function ProfileSettings() {
  const { data: customer = {}, isLoading } = useGetCustomerQuery();
  const [changePassword] = useChangePasswordMutation();
  const [changeAccount] = useChangeAccountMutation();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function onSubmitAccountHandler(values) {
    const { data } = await changeAccount(values);
    data?._id && setSuccess(true);
  }

  async function onSubmitPasswordHandler({ curPassword, password }, resetForm) {
    const { data } = await changePassword({
      "password": curPassword,
      "newPassword": password
    })
    if (data?.password) {
      setError(data.password);
    } else {
      setSuccess(true);
      resetForm();
    };
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
      <div className={`${styles.block} ${styles.block_account}`}>
        <h3 className={styles.block__title}>Account settings</h3>
        <FormikForm
          initialValues={{
            contactPerson: customer.contactPerson,
            email: customer.email,
            telephone: customer.telephone,
          }}
          validationSchema={validationSchemaAccount}
          fields={accountFields}
          callback={onSubmitAccountHandler}
          submitBtn="Update" />
      </div>
      <div className={`${styles.block} ${styles.block_account}`}>
        <h3 className={styles.block__title}>Change password</h3>
        <FormikForm
          initialValues={{
            curPassword: '',
            password: '',
            confPassword: '',
          }}
          validationSchema={validationSchemaPassword}
          fields={passwordFields}
          callback={onSubmitPasswordHandler}
          submitBtn="Update" />
      </div>
    </>
  )
}