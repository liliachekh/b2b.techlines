import { useParams } from 'react-router-dom';
import { useGetOrderQuery } from '../../store/api/order.api';
import Loader from '../../components/Loader';
import { useTitle } from '../../hooks';
import { OrderDetails } from "../../components/OrderDetails";
import style from "./OrderPage.module.scss";

export function OrderPage () {
  useTitle('Order');
  const { orderNo } = useParams();
  const { data: order, isLoading: isLoadingOrder } = useGetOrderQuery(orderNo);

  if (isLoadingOrder) return <Loader /> 
  return (
    <div className={style.orderDetails}>
      <div className={style.orderDetails__container}>
        {order && <OrderDetails {...order} />}
      </div>
    </div>
  )
}