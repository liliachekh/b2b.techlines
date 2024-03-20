import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../store/modalSlice';
// import { setErrorAction } from '../../redux/actions/errorActions';
import style from './modal.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { animateModal } from '../../animation';

export function Modal({ data, onDelete, onCloseForm }) {
  const dispatch = useDispatch();
  const { type, header, text, actions, icon } = data;

  async function onCloseModal() {
    if (onCloseForm && typeof onCloseForm === 'function') {
      onCloseForm();
    }
    dispatch(hideModal(null));
  }


  function onSubmitModal() {
    if (onDelete && typeof onDelete === 'function') {
      onDelete();
    }
    onCloseModal();
  }

  return (
    <AnimatePresence>
      <>
        <div className={style.overlay} role="button" tabIndex={0} onClick={onCloseModal} onKeyDown={onCloseModal} />
        <motion.div {...animateModal} className={style.modal}>
            <div className={style.modal__header}>
              <h3 className={style.modal__title}>{header}</h3>
            </div>
            <div className={style.modal__text}>
              {icon &&
                <div className={style.modal__icon}>
                  {icon}
                </div>}
              {text}
            </div>
            {actions && actions(onCloseModal, onSubmitModal, style.modal__btns)}
        </motion.div>
      </>
    </AnimatePresence>
  );
}

Modal.defaultProps = {
  type: '',
  header: '',
  text: '',
  actions: null,
};

Modal.propTypes = {
  type: PropTypes.string,
  header: PropTypes.string,
  text: PropTypes.string,
  actions: PropTypes.func,
};