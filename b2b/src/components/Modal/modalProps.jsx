import { NavLink } from 'react-router-dom';
import style from './modal.module.scss';
import { Success } from '../icons/success-icon';

export const modalProps = [
  {
    type: 'error',
    header: 'An error occurred',
    text: 'Something went wrong, can not complete operation.',
    actions(onClose, onSubmit, className) {
      return (
        <div className={className}>
          <button type='button' onClick={onClose} className={`${style.modal__btn} ${style.cancelBtn}`}>OK</button>
        </div>
      );
    },
  },
  {
    type: 'order',
    header: 'Your order has been processed!',
    text: 'Your order has been processed and invoice has been sent to you by email.',
    icon: <Success size='75px' color='green' />,
    actions(onClose, onSubmit, className) {
      return (
        <div className={className}>
          <NavLink to="/" onClick={onClose} className={style.modal__btn}>
            Ok
          </NavLink>
        </div>
      );
    },
  },
  {
    type: 'deleteProduct',
    header: 'Are you sure?',
    text: 'Do you want to delete this product?',
    actions(onClose, onSubmit, className) {
      return (
        <div className={className}>
          <button type='button' onClick={onSubmit} className={`${style.modal__btn} ${style.submitBtn}`}>Delete</button>
          <button type='button' onClick={onClose} className={`${style.modal__btn} ${style.cancelBtn}`}>Cancel</button>
        </div>
      );
    },
  }, {
    type: 'saved',
    header: 'Changes saved',
    icon: <Success />,
    actions(onClose, onSubmit, className) {
      return (
        <div className={className}>
          <button onClick={onClose} className={`${style.modal__btn} ${style.submitBtn}`}>Close</button>
        </div>
      );
    },
  },
];