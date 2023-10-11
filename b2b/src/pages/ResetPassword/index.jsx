import style from "./ResetPassword.module.scss";
import ForgotPassword from "../../components/ForgotPassword";
import { Link } from "react-router-dom";
import { useTitle } from "../../hooks";

export function ResetPassword() {
  useTitle('Reset Password');

    return (
        <div className={style.resetForm}>
            <div className={style.resetForm__container}>
                <main className={style.resetForm__main}>
                    <Link to="/login">
                    <div className={style.resetForm__logo}>
                        <img src="/images/tech.png" alt="techlines logo" />
                    </div>
                    </Link>
                    <div className={style.resetForm__wrapper}>
                        <ForgotPassword
                        //   callback={onSubmitHandler} 
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