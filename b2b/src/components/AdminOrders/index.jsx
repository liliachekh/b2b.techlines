import styles from './adminOrders.module.scss';
import { useGetAllOrdersQuery } from '../../store/api/order.api';
import Loader from '../Loader';
import { useTitle } from '../../hooks';
import Filter from '../Filter';
import { formatDate } from '../../utils';
import { Delete, Edit, View } from '../icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteOrderMutation } from '../../store/api/order.api';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../store/modalSlice';
import { Modal } from "../Modal";
import { modalProps } from '../Modal/modalProps';


export function AdminOrders() {
  useTitle('Orders');
  const { data: orders = [], isLoading: isLoadingOrders } = useGetAllOrdersQuery();
  const [orderNo, setOrderNo] = useState(null)
  const [deleteOrder] = useDeleteOrderMutation();
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modal.modal);


  function editButtonHandler(orderNo) {
  setOrderNo(orderNo)
  }
  function deleteButtonHandler(orderNo) {
  setOrderNo(orderNo)
  dispatch(showModal('deleteOrder'));
  }

  function handleFormClose() {
    // setEditForm(false);
    setOrderNo(null);
  }

  async function delOrder(orderNo) {
    try {
      await deleteOrder(orderNo);
      dispatch(showModal('saved'));
      // refetchProductsList();
    } catch (error) {
      dispatch(showModal('error'));
    }
  }
  if (isLoadingOrders) return <Loader />

  return (
    <>  {modalType && (
      <Modal data={modalProps.find((modal) => modal.type === modalType)} 
      onDelete={() => delOrder(orderNo)}
      onCloseForm={handleFormClose} 
      />
    )}
    <Filter admin = {true} adminOrders ={true}/>
    <div className={`${styles.order__table} ${styles.table}`}>
                  <p className={styles.table__cell}>Company name</p>
                  <p className={styles.table__cell}>Order №</p>
                  <p className={styles.table__cell}>Status</p>
                  <p className={styles.table__cell}>Payment method</p>
                  <p className={styles.table__cell}>Date</p>
                  <p className={styles.table__cell}>Total Sum</p>
                  <p className={styles.table__cell}>Actions</p>
                </div>
      <div className={styles.orders__container} >
      <div className={styles.orders}>
      {orders && orders?.map(({ orderNo, totalSum, status, paymentInfo, customerId, date, _id }) => (
        <div className={styles.order} key={orderNo}>
          <div className={styles.order__info}>
          <div className={styles.order__text}> <span className={styles.order__text_value}>{customerId.companyName}</span></div>
            <div className={styles.order__text}> <span className={styles.order__text_value}>{orderNo}</span></div>
            <div className={styles.order__text}> <span className={styles.order__text_value}>{status}</span></div>
            <div className={styles.order__text}> <span className={styles.order__text_value}>{paymentInfo === "CARD" ? 'Card (+1.7%)' : 'IBAN'}</span></div>
            <div className={styles.order__text}> <span className={styles.order__text_value}>{formatDate(date)}</span></div>
            <div className={styles.order__text}> <span className={styles.order__text_value}>{totalSum} €</span></div>
            <div className={styles.order__buttons}>
        <Link
          to={`/orders/${orderNo}`}
          className={styles.order__btn}
          title="View order"
          target="_blank">
          <View />
        </Link>
        <button
          className={styles.order__btn}
          onClick={editButtonHandler}
          title="Edit">
          <Edit />
        </button>
        <button
          className={styles.order__btn}
          onClick={() => deleteButtonHandler(_id)}
          title="Delete">
          <Delete />
        </button>
      </div>
          </div>
        
        </div>))}
        </div>
        </div>
    </>
  )
}