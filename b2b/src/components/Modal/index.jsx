import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../store/modalSlice';
// import { setErrorAction } from '../../redux/actions/errorActions';
import style from './modal.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { animateModal } from '../../animation';

export function Modal(props) {
  const dispatch = useDispatch();
  const { type, header, text, actions, icon } = props;
  // const error = useSelector((state) => state.error.error)

  async function onCloseModal() {
    dispatch(hideModal(null));
    // dispatch(setErrorAction(null));
  }

  function onSubmitModal() {
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