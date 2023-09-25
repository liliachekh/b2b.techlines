import { DeliveryList } from "../../components/DeliveryList";
import style from "./delivery.module.scss";

export function Delivery() {
  return (
      <section className={style.delivery}>
        <div className={style.delivery__container}>
          <h1 className={style.delivery__title}>SHIPPING COSTS</h1>
          <div className={style.delivery__text}>
            <DeliveryList/>
            <p>
           In each of the cases mentioned above, for Extra European Customers and National Customers will be charged €20 due to customs additional costs.
            </p>
          </div>
        </div>
      </section>
  );
}
