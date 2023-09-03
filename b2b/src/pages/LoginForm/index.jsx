import FormikForm from "../../components/FormikForm";
import { logInFormFields } from "./logInFormFields";
import { validationSchemaLogin } from "../../validation";
import style from "./LoginForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useLogInMutation } from "../../store/api/customers.api";
import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState(false);
  const [logIn] = useLogInMutation();
  const navigate = useNavigate();

  async function onSubmitHandler(values) {
    try {
      let response = await logIn(values).unwrap();
      const token = response.token;

      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      setError(true)
    }
  }

  return (
    <div className={style.loginForm}>
      <div className={style.loginForm__container}>
        {error && <div className={style.loginForm__errorMessage}>We couldn’t find an account matching the email and password you entered.</div>}
        <main className={style.loginForm__main}>
          <div className={style.loginForm__logo}>
            <img
              src="/images/tech.png"
              alt="techlines logo"
            />
          </div>
          <div className={style.loginForm__wrapper}>
            <FormikForm
              initialValues={{
                loginOrEmail: "",
                password: "",
              }}
              useLoginFormStyles={true}
              validationSchema={validationSchemaLogin}
              fields={logInFormFields}
              callback={onSubmitHandler}
              submitBtn="Login"
            />
          </div>
        </main>
        <footer className={style.loginForm__footer}>
          <p>2023 © Techline Distribution. All rights reserved.</p>
          <p>
            Developed by{" "}
            <Link
              to="https://othersite.net/"
              target="blank">
              OTHERSITE STUDIO
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
