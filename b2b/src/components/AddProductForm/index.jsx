import Input from '../Input';
import style from './addProductForm.module.scss';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/modalSlice';
import { baseUrl } from '../../utils/vars';
import { Formik, Form } from 'formik';
import { validationSchemaAddProduct } from '../../validation';
import Select from '../Select';
import { addProductFormFields } from './addProductFormField';
import PhotoUploader from '../PhotoUploader/index';
import { useGetFiltersQuery } from '../../store/api/filter.api';

export default function AddProductForm({ onCloseForm, isInAccount }) {
    const dispatch = useDispatch();
    const { data: filtersBD = [] } = useGetFiltersQuery();

  return (
    <Formik
      initialValues={{
        name: '',
        enabled: true,
        imageUrls: [],
        quantity: 0,
        brand: '',
        categories: '',
        color: '',
        currentPrice: 0,
        productUrl: '',
        memory: '',
        type: '',
      }}
      validationSchema={validationSchemaAddProduct}
      onSubmit={
      async (values, { setSubmitting }) => {
        try {
          await fetch(`${baseUrl}products`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
          });
          onCloseForm();
          setSubmitting(false);
          dispatch(showModal('saved'))
        } catch (error) {
          dispatch(showModal('error'));
          console.log(error);
        }
      }
    }>
      <Form className={style.form}>
        {addProductFormFields.map((field) => {
          if (field.tagType === 'regular') {
            return (
              <Input
                key={field.name}
                {...field} />);
          } else if (field.tagType === 'button') {
            return (
              <PhotoUploader
                key={field.id}
                isInAccount={isInAccount} />);
          }
          else if (field.tagType === 'select') {
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
          return null;
        })}
        <div className={style.form__btns}>
          <button
            className={`${style.form__submit} ${isInAccount && style.form__submit_inAccount}`}
            type="submit">
            Save Changes
          </button>
          <button
            onClick={onCloseForm}
            type='button'
            className={`${style.form__submit} ${isInAccount && style.form__submit_inAccount}`}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}