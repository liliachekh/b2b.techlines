import styles from './shippingForm.module.scss';
import { shippingOrderFields } from "../../pages/Order/orderFields";
import { initialValuesShippingForm } from "../../utils/vars";
import { validationSchemaOrderShipping } from "../../validation";
import FormikForm from "../FormikForm";

export function ShippingForm({ onSubmitShipping }) {
  return (
    <div className={styles.form}>
      <h3 className={styles.form__title}>Shipping form</h3>
      <FormikForm
        initialValues={initialValuesShippingForm}
        validationSchema={validationSchemaOrderShipping}
        fields={shippingOrderFields}
        callback={onSubmitShipping}
        submitBtn="Submit" />
    </div>
  )
}