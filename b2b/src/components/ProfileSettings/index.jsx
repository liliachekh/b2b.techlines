import styles from './profileSettings.module.scss';
import { useChangeAccountMutation, useChangePasswordMutation, useGetCustomerQuery } from '../../store/api/customers.api';
import { accountFields, passwordFields } from './profileFields';
import FormikForm from '../FormikForm';
import { validationSchemaAccount, validationSchemaPassword } from '../../validation';
import Loader from "../../components/Loader";

export function ProfileSettings() {
  const { data: customer = {}, isLoading } = useGetCustomerQuery();
  const [changePassword, {data}] = useChangePasswordMutation();
  const [changeAccount] = useChangeAccountMutation();

  async function onSubmitAccountHandler(values) {
    changeAccount(values);
  }

  async function onSubmitPasswordHandler({ curPassword, password, confPassword }) {
    if (password === confPassword)
      changePassword({
        "password": curPassword,
        "newPassword": password
      })
  }

  if (isLoading) return <Loader />

  return (
    <>
      {data?.password && <div className={styles.error}>{data?.password}</div>}
      <div className={styles.content}>
        <h3 className={styles.content__title}>Account settings</h3>
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
      <div className={styles.content}>
        <h3 className={styles.content__title}>Change password</h3>
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