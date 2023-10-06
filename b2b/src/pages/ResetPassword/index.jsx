import style from "./ResetPassword.module.scss";
import ForgotPassword from "../../components/ForgotPassword";
import { useState } from "react";
import { Link } from "react-router-dom";
import { validationSchemaRegisteredEmail } from "../../validation";
import { resetPasswordFormFields } from "./resetPasswordFormFields";
import { useVerifyEmailMutation } from "../../store/api/customers.api";

export function ResetPassword() {

    const [error, setError] = useState(false);
    const [verifyEmail] = useVerifyEmailMutation();

    async function onSubmitHandler(values) {
        console.log(values);
        try {
          await verifyEmail(values).unwrap();
        } catch (error) {
          setError(true)
          console.log(error);
        }
    }

    return (
        <div className={style.resetForm}>
            <div className={style.resetForm__container}>
            {error && <div className={style.resetForm__errorMessage}>We couldn’t find an account matching the email you entered.</div>}
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