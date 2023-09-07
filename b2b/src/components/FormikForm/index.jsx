import style from "./form.module.scss";
import { Form, Formik } from "formik";
import Input from "../Input";
import InputMasked from "../InputMasked";
import LoginFormAdditional from "../LoginFormAdditional/ index";

export default function FormikForm({
  initialValues,
  validationSchema,
  fields,
  callback,
  submitBtn,
  useLoginFormStyles,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        callback(values);
        setSubmitting(false);
      }}>
      <Form className={style.form}>
        {fields?.map((field) => {
          if (field.title) {
            return (
              <h2 className={style.loginForm__title} key={"title"}>{field.title}</h2>
            );
          }
          return null;
        })}

        {fields?.map((field) => {
          if (field.tagType === "masked") {
            return (
              <InputMasked
                key={field.name}
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
                key={field.name}
                {...field}
                labelClass={style.form__label}
                inputClass={style.form__input}
                errorClass={style.form__error}
              />
            );
          } else {
            return <LoginFormAdditional key={"logIn"} />;
          }
        })}
        <button
          text="Checkout"
          className={style.form__submit}
          type="submit">
          {submitBtn}
        </button>
      </Form>
    </Formik>
  );
}
