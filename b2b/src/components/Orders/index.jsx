import styles from './orders.module.scss';
import { useGetCustomerQuery } from '../../store/api/customers.api';

export function Orders() {
  const { data: customer = {} } = useGetCustomerQuery();

  return (
    <div className={styles.content}>
      <div className={styles.content__block}>
        <p>{customer.contactPerson}</p>
        <p>{customer.email}</p>
        <p>{customer.telephone}</p>
      </div>
      <div className={styles.content__block}>
        <p>{customer.contactPerson}</p>
        <p>{customer.email}</p>
        <p>{customer.telephone}</p>
      </div>
    </div>
  )
}