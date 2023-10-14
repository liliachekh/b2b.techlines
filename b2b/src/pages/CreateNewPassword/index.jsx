import style from "./CreateNewPassword.module.scss";
import FormikForm from "../../components/FormikForm";
import { validationSchemaPassword } from "../../validation";
import { createNewPasswordFormFields } from "./createNewPasswordFields";
import { Link, Navigate, useNavigate } from "react-router-dom";

export function CreateNewPassword() {


    return (
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
                //   callback={onSubmitHandler}
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
      );
}