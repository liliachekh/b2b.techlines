
import style from './editProductForm.module.scss';
import { editProductFormFields } from './editProductFormField';
import { Formik, Form } from 'formik';
import { validationSchemaProduct } from '../../validation';
import { useGetFiltersQuery } from '../../store/api/filter.api';
import { useUpdateProductMutation } from '../../store/api/products.api';
// import Loader from '../Loader';
import Input from "../Input";
import Select from '../Select';
import PhotoUploader from '../PhotoUploader/index';

export default function EditProductForm({ product, onCloseForm, refetchProducts, setSuccessMsg, setErrorMsg, isInAccount }) {
  const { data: filtersBD = [] } = useGetFiltersQuery();
  const [updateProduct] = useUpdateProductMutation();


const initialValues = { ...product };

return (
  <Formik initialValues={initialValues}
      validationSchema={validationSchemaProduct}
    onSubmit={
      async (values, { setSubmitting }) => {
        try {
          const response = await updateProduct({id: product._id, body: values});
          if (response.data) {
            onCloseForm();
            setSubmitting(false);
            setSuccessMsg(true);
            refetchProducts();
          } else {
            setErrorMsg(response.error.data.message);
          }
        } catch (error) {
          setErrorMsg(error.data.message);
        }
      }
    }
    >
    <Form className={style.form}>
        {editProductFormFields.map((field) => {
          if (product.hasOwnProperty(field.name)) {
            if (field.tagType === 'regular') {
              return (
                <Input
                  key={field.name}
                  value={product[field.name]}
                  {...field} />
              );
            } else if (field.tagType === 'button') {
              return (
                <PhotoUploader
                  key={field.id}
                  isInAccount={isInAccount} 
                  productCopyImageUrls={product?.imageUrls}/>);
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