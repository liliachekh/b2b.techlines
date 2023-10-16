import style from "./CreateNewPassword.module.scss";
import FormikForm from "../../components/FormikForm";
import { useState, useEffect } from "react";
import { validationSchemaPassword } from "../../validation";
import { createNewPasswordFormFields } from "./createNewPasswordFields";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
// import { useResetPasswordMutation } from "../../store/api/customers.api";

export function CreateNewPassword() {

  const [validUrl, setValidUrl] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const param = useParams();
  const url = `http://localhost:4000/api/password-reset/new-password/${param.token}/${param.id}`;

  useEffect(() => {
		const verifyUrl = async () => {
			try {
				const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          setValidUrl(true);
        } else {
          setValidUrl(false);
        }
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);

    return (
      <>
        {validUrl ? (
          <div className={style.loginForm}>
          <div className={style.loginForm__container}>
            {/* {error && <div className={style.loginForm__errorMessage}>We couldn’t find an account matching the email and password you entered.</div>} */}
            <main className={style.loginForm__main}>
              <div className={style.loginForm__logo}>
                <img
                  src="/images/Tech.png"
                  alt="techlines logo"
                />
              </div>
              <div className={style.loginForm__wrapper}>
                <h2 className={style.loginForm__title}>Create new password</h2>
                <FormikForm
                  initialValues={{
                    password: "",
                    confPassword: "",
                  }}
                  validationSchema={validationSchemaPassword}
                  fields={createNewPasswordFormFields}
                  // callback={onSubmitHandler}
                  submitBtn="Submit"
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
        ) : (
          <h1>404 Not Found</h1>
      )}
      </>
      );
}