import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/modalSlice';
import style from './addAdminParamsForm.module.scss';
import Input from '../Input';
import {addAdminParamsFormFields} from './addAdminParamsFormFields';
import { validationSchemaAddAdminParams } from '../../validation';
import { useSetFilterMutation } from '../../store/api/filter.api';


export default function AddAdminParamsForm({adminParam, onCloseForm, refetch}) {
    const dispatch = useDispatch();
    const [setFilter] = useSetFilterMutation();
    return(
        <Formik
      initialValues={{
        type: adminParam,
        name: '',
      }}
      validationSchema={validationSchemaAddAdminParams}
      onSubmit={
      async (values, { setSubmitting }) => {
        try {
          await setFilter(values);
          setSubmitting(false);
          dispatch(showModal('saved'));
          refetch();
        } catch (error) {
          dispatch(showModal('error'));
          console.log(error);
        }
      }
    }>
      <Form className={style.form}>
      {addAdminParamsFormFields.map((field) => {
          if (field.tagType === 'regular') {
            return (
              <Input
                key={field.name}
                {...field} />);
          } 
          return null;
        })}
        <div className={style.form__btns}>
          <button
            className={style.form__submit}
            type="submit">
            Save
          </button>
          <button
            onClick={onCloseForm}
            type='button'
            className={style.form__submit}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
    )
}