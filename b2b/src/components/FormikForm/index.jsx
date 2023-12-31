import style from "./form.module.scss";
import { Form, Formik } from "formik";
import Input from "../Input";
import InputMasked from "../InputMasked";

export default function FormikForm({
  initialValues,
  validationSchema,
  fields,
  callback,
  submitBtn,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        callback(values, resetForm);
        setSubmitting(false);
      }}>
      {({ setFieldValue }) => (
        <Form className={style.form}>
          {fields?.map((field) => {
            if (field.tagType === "masked") {
              return (
                <InputMasked
                  key={field.id}
                  {...field}
                  labelClass={style.form__label}
                  inputClass={style.form__input}
                  errorClass={style.form__error}
                />
              );
            }
            if (field.tagType === "regular") {
              return (
                <Input
                  key={field.id}
                  {...field}
                  labelClass={style.form__label}
                  inputClass={style.form__input}
                  errorClass={style.form__error}
                />
              );
            }
            if (field.tagType === "custom") return field.content(setFieldValue)
            else return <></>
          })}
          <button
            text="Checkout"
            className={style.form__submit}
            type="submit">
            {submitBtn}
          </button>
        </Form>)}
    </Formik>
  );
}
