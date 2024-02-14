import style from "./adminCustomerCard.module.scss";
import { Delete, Edit } from '../icons';

export function AdminCustomerCard({ firstName, lastName, customerNo, email, vatNr, enabled, deleteButtonHandler, buttonHandler }) {

  return (
    <div className={style.card}>
      <p className={style.card__prop}>
        {customerNo}
      </p>
      <p className={style.card__prop}>
        {email}
      </p>
      <p className={style.card__prop}>
        {firstName}
      </p>
      <p className={style.card__prop}>
        {lastName}
      </p>
      <p className={style.card__prop}>
        {vatNr}
      </p>
      <p className={style.card__prop}>
        {enabled ? 'Enabled' : 'Disabled'}
      </p>
      <div className={style.card__buttons}>
        <button
          className={style.card__btn}
          onClick={buttonHandler}
          title="Edit">
          <Edit />
        </button>
        <button
          className={style.card__btn}
          onClick={deleteButtonHandler}
          title="Delete">
          <Delete />
        </button>
      </div>
    </div>
  )
}