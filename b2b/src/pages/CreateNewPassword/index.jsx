import style from "./CreateNewPassword.module.scss";
import FormikForm from "../../components/FormikForm";
import { useState, useEffect } from "react";
import { validationSchemaNewPassword } from "../../validation";
import { createNewPasswordFormFields } from "./createNewPasswordFields";
import { Link, useParams, useNavigate } from "react-router-dom";

export function CreateNewPassword() {

  const [validUrl, setValidUrl] = useState(false);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
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
  }, [param, url, navigate]);

  async function onSubmitHandler({ password }) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password }),
      });
      if (res.ok) {
        setMsg(true);
      } else {
        setError(res.message);
      }
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
        clearTimeout(timer);
      }, 2500);
    }
    if (msg) {
      const timer = setTimeout(() => {
        setMsg(null);
        clearTimeout(timer);
        navigate("/login");
      }, 2500);
    }
  }, [error, msg, navigate]);


    return (
          <div className={style.loginForm}>
          <div className={style.loginForm__container}>
            {validUrl && 
            <>
            {error && <div className={style.loginForm__errorMessage}>Something went wrong, try again.</div>}
            {msg && <div className={style.loginForm__successMessage}>Your password updated successfully.</div>}
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
                  validationSchema={validationSchemaNewPassword}
                  fields={createNewPasswordFormFields}
                  callback={onSubmitHandler}
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