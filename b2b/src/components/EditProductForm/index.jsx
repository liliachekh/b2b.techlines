
import style from './editProductForm.module.scss';
import { editProductFormFields } from './editProductFormField';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../store/modalSlice';
// import { setErrorAction } from '../../redux/actions/errorActions';
import { baseUrl } from '../../utils/vars';
import { Formik, Form, Field } from 'formik';
import { validationSchemaProduct } from '../../validation';
import { fetchData } from '../../utils';
// import { reqPut } from '../../utils/requestBody';
import { useGetFiltersQuery } from '../../store/api/filter.api';
import Loader from '../Loader';
import Input from "../Input";
import Select from '../Select';

export default function EditProductForm({ product, onCloseForm }) {
  const dispatch = useDispatch();
const { data: filtersBD = [] } = useGetFiltersQuery();


const initialValues = { ...product };

return (
  <Formik initialValues={initialValues}
      validationSchema={validationSchemaProduct}
    onSubmit={
      async (values, { setSubmitting }) => {
        console.log(values);
        console.log(product._id);
        try {
          await fetch(`${baseUrl}products/${product._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
          });
          onCloseForm()
          setSubmitting(false);
          dispatch(showModal('saved'))
        } catch (error) {
          console.log(error);
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