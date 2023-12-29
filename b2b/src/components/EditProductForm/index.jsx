
import style from './editProductForm.module.scss';
import { editProductFormFields } from './editProductFormField';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../store/modalSlice';
// import { setErrorAction } from '../../redux/actions/errorActions';
import { baseUrl } from '../../utils/vars';
import { Formik, Form, Field } from 'formik';
// import { validationSchemaProduct } from '../../validation';
import { fetchData } from '../../utils';
// import Checkbox from '../Checkbox';
// import { reqPut } from '../../utils/requestBody';
import { useGetFiltersQuery } from '../../store/api/filter.api';
import Loader from '../Loader';

export default function EditProductForm({ product, onCloseForm }) {
//   const dispatch = useDispatch();
const { data: filtersBD = [] } = useGetFiltersQuery();
const filters = [...new Set(filtersBD.map((item) => item.type))];

const initialValues = { ...product };

return (
  <Formik initialValues={initialValues} 
    // onSubmit={onSubmit}
    >
    <Form className={style.form}>
      {Object.entries(product).map(([key, value]) => (
        <div key={key}>
          <label htmlFor={key} className={style.form__label}>{key}</label>
          {Array.isArray(value) ? (
            // Якщо значення масив, відобразити кожний елемент масиву
            value.map((item, index) => (
              <Field
                key={index}
                type="text"
                id={`${key}_${index}`}
                name={`${key}.${index}`}
                className={style.form__input}
              />
            ))
          ) : key === 'categories' || key === 'brand' ? (
            // Якщо ключ - categories чи brand, використовувати select
            <Field as="select" id={key} name={key} className={style.form__input}>
              {/* Здесь вы можете заполнить опции согласно вашим категориям или брендам */}
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </Field>
          ) : (
            // В інших випадках використовувати Інпут
            <Field type="text" id={key} name={key} className={style.form__input}/>
          )}
        </div>
      ))}
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