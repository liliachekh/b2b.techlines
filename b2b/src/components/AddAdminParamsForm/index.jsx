import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/modalSlice';
import { baseUrl } from '../../utils/vars';
import style from './addAdminParamsForm.module.scss';
import Input from '../Input';
import {addAdminParamsFormFields} from './addAdminParamsFormFields';


export default function AddAdminParamsForm({onCloseForm}) {
    const dispatch = useDispatch();
    return(
        <Formik
      initialValues={{
        type: '',
        name: '',
      }}
    //   validationSchema={validationSchemaAddAdminParams}
      onSubmit={
      async (values, { setSubmitting }) => {
        try {
          await fetch(`${baseUrl}filters`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
          });
          onCloseForm();
          setSubmitting(false);
          dispatch(showModal('saved'));
        //   refetchProducts();
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