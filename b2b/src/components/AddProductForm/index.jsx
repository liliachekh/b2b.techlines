import Input from '../Input';
import style from './addProductForm.module.scss';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/modalSlice';
import { Formik, Form } from 'formik';
import { validationSchemaAddProduct } from '../../validation';
import Select from '../Select';
import { addProductFormFields } from './addProductFormField';
import PhotoUploader from '../PhotoUploader/index';
import { useGetFiltersQuery } from '../../store/api/filter.api';
import { useAddProductMutation } from '../../store/api/products.api';

export default function AddProductForm({ onCloseForm, isInAccount, refetchProducts, productCopy }) {
    const dispatch = useDispatch();
    const { data: filtersBD = [] } = useGetFiltersQuery();
    const [addProduct] = useAddProductMutation();

  return (
    <Formik
      initialValues={{
        name: productCopy?.name || '',
        enabled: productCopy?.enabled || true,
        quantity: productCopy?.quantity || 0,
        brand: productCopy?.brand || '',
        categories: productCopy?.categories || '',
        color: productCopy?.color || '',
        currentPrice: productCopy?.currentPrice || 0,
        productUrl: '',
        memory: productCopy?.memory || '',
        type: productCopy?.type || '',
      }}
      validationSchema={validationSchemaAddProduct}
      onSubmit={
      async (values, { setSubmitting }) => {
        try {
          const response = await addProduct(values);
          if (response.data) {
            onCloseForm();
            setSubmitting(false);
            dispatch(showModal('saved'));
            refetchProducts();
          } else {
            console.log(response.error)
            dispatch(showModal('error'));
          }
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
                isInAccount={isInAccount} 
                productCopyImageUrls={productCopy?.imageUrls || []}/>);
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