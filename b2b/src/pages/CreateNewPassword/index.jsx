import style from "./CreateNewPassword.module.scss";
import FormikForm from "../../components/FormikForm";
import { useState, useEffect } from "react";
import { validationSchemaPassword } from "../../validation";
import { createNewPasswordFormFields } from "./createNewPasswordFields";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { useResetPasswordMutation } from "../../store/api/customers.api";

export function CreateNewPassword() {

  const [validUrl, setValidUrl] = useState(false);
  // const [msg, setMsg] = useState("");
  // const [error, setError] = useState("");
  const navigate = useNavigate();
  const param = useParams();
  const url = `http://localhost:4000/api/password-reset/new-password/${param.token}/${param.id}`;

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        if (param?.token && param?.id) {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            console.log(response);
            setValidUrl(true);
          } else {
            navigate("/not-found");
          }
        }
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);
  // console.log(param.token);
  // console.log(validUrl);

    return (
          <div className={style.loginForm}>
          <div className={style.loginForm__container}>
            {validUrl && 
            <>
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
            </footer> </>}
          </div>
        </div>
      );
}