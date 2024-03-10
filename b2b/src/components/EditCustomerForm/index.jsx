import style from './editCustomerForm.module.scss';
import { editCustomerFormField } from './editCustomerFormField';
import { baseUrl } from '../../utils/vars';
import { Formik, Form } from 'formik';
import { validationSchemaCustomer } from '../../validation';
import { useGetFiltersQuery } from '../../store/api/filter.api';
import Input from "../Input";
import Select from '../Select';

export default function EditCustomerForm({ customer, onCloseForm, refetchProducts, setSuccessMsg, setErrorMsg }) {
  const { data: filtersBD = [] } = useGetFiltersQuery();
  const initialValues = { ...customer };

  return (
    <Formik initialValues={initialValues}
      validationSchema={validationSchemaCustomer}
      onSubmit={
        async (values, { setSubmitting }) => {
          try {
            await fetch(`${baseUrl}customers/${customer._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values)
            });
            onCloseForm()
            setSubmitting(false);
            setSuccessMsg(true);
            refetchProducts();
          } catch (error) {
            setErrorMsg(error.data.message);
          }
        }
      }
      >
      <Form className={style.form}>
          {editCustomerFormField.map((field) => {
            if (customer.hasOwnProperty(field.name)) {
              if (field.tagType === 'regular') {
                return (
                  <Input
                    key={field.name}
                    value={customer[field.name]}
                    {...field} />
                );
              } else if (field.tagType === 'select') {
                return (
                    <Select
                      key={field.name}
                      items={filtersBD.filter((category) => category.type === field.name)} 
                      {...field} />
                );
              } else if (field.tagType === 'enabled') {
                return (
                  <Select
                    key={field.name}
                    {...field} />
                );
              }
            }
            return null;
          })}
          <div className={style.form__btns}>
            <button className={style.form__submit} type="submit">
              Save Changes
            </button>
            <button onClick={onCloseForm} type='button' className={style.form__submit}>
              Cancel
            </button>
          </div>
        </Form>
    </Formik>
  );
}