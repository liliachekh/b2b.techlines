import style from "./ResetPassword.module.scss";
import ForgotPassword from "../../components/ForgotPassword";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { validationSchemaRegisteredEmail } from "../../validation";
import { resetPasswordFormFields } from "./resetPasswordFormFields";
import { useRequestResetPasswordMutation } from "../../store/api/customers.api";

export function ResetPassword() {
    const [msg, setMsg] = useState(null);
    const [error, setError] = useState(null);
    const [requestResetPassword] = useRequestResetPasswordMutation();

    async function onSubmitHandler(values) {
        try {
          const response = await requestResetPassword(values);
          if (response.data) {
            setMsg(true);
          } else {
            setError(response.error.data.message);
          }
        } catch (error) {
          setError(error.data.message);
        }
    }
    useEffect(() => {
        if (error || msg) {
          const timer = setTimeout(() => {
            setError(null);
            setMsg(null);
            clearTimeout(timer);
          }, 2500);
        }
      }, [error, msg])

    return (
        <div className={style.resetForm}>
            <div className={style.resetForm__container}>
            {error && <div className={style.resetForm__errorMessage}>{error}</div>}
            {msg && <div className={style.resetForm__successMessage}>Password reset link sent to your email account.</div>}
                <main className={style.resetForm__main}>
                    <Link to="/login">
                    <div className={style.resetForm__logo}>
                        <img src="/images/tech.png" alt="techlines logo" />
                    </div>
                    </Link>
                    <div className={style.resetForm__wrapper}>
                    <ForgotPassword
                        initialValues={{
                            registeredEmail: '',
                        }}
                        validationSchema={validationSchemaRegisteredEmail}
                        fields={resetPasswordFormFields}
                        callback={onSubmitHandler}
                        submitBtn="Get link"
                    />
                    </div>
                </main>
                <footer className={style.resetForm__footer}>
                    <p>2023 © Techline Distribution. All rights reserved.</p>
                    <p>Developed by <Link to="https://othersite.net/" target="blank">OTHERSITE STUDIO</Link></p>

                </footer>
            </div>
        </div>
    )
}