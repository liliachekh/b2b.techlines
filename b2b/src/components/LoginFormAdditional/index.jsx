import style from './loginFormAdditional.module.scss'

export default function LoginFormAdditional() {
  return (
    <div className={style.loginForm__help}>
      <div className={style.loginForm__switch}>
        <input type="checkbox" id='rememberLogin' name='rememberLogin' className={style.loginForm__switchInput} />
        <label htmlFor='rememberLogin' className={style.loginForm__switchLabel}>Remember me</label>
      </div>
      <a className={style.loginForm__forgotLink} href="/password-reset">Forgot password</a>
    </div>
  )
}