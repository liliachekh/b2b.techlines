import FormikForm from "../../components/FormikForm";
import { logInFormFields } from "./logInFormFields";
import { validationSchemaLogin } from "../../validation";
import style from "./LoginForm.module.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLogInMutation } from "../../store/api/customers.api";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

export function LoginForm() {
  const [error, setError] = useState(false);
  const [logIn] = useLogInMutation();
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);

  async function onSubmitHandler(values) {
    try {
      const res = await logIn(values);
      if (typeof res === 'object') {
        navigate("/");
      }
    } catch (error) {
      setError(true)
    }
  }

  if (loggedIn === true) return <Navigate to="/" />

  return (
    <div className={style.loginForm}>
      <div className={style.loginForm__container}>
        {error && <div className={style.loginForm__errorMessage}>We couldn’t find an account matching the email and password you entered.</div>}
        <main className={style.loginForm__main}>
          <div className={style.loginForm__logo}>
            <img
              src="/images/Tech.png"
              alt="techlines logo"
            />
          </div>
          <div className={style.loginForm__wrapper}>
            <h2 className={style.loginForm__title}>Log In</h2>
            <FormikForm
              initialValues={{
                loginOrEmail: "",
                password: "",
              }}
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
