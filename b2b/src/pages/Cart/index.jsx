import styles from './Cart.module.scss';
import { useGetCartQuery } from "../../store/api/cart.api";
import Header from "../../components/Header";
import CartItem from "../../components/CartItem";

export function Cart() {
  const { data: cart = [], isLoading } = useGetCartQuery();

  if (isLoading) return <h1>Loading</h1>

  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.main__container}>
          <div className={styles.main__title}>My cart</div>
          <div className={styles.main__wrapper}>
            <div className={styles.main__content}>
              {cart?.products?.length > 0 &&
                cart?.products?.map(({ product }) => (
                  <CartItem {...product} displayTable={true} key={product?._id} />
                ))}
            </div>
            <div className={styles.main__aside}>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}