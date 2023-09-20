import style from "./delivery.module.scss";

export function Delivery() {
  return (
    <div id="main">
      <section className={style.delivery}>
        <div className={style.delivery__container}>
          <h1 className={style.delivery__title}>SHIPPING COSTS</h1>
          <div className={style.delivery__text}>
            {/* <h2 className={style.paymentAndDelivery__subtitle}>SHIPPING COSTS</h2> */}
            <ol className={style.delivery__list} >
              <li className={style.delivery__listItem}><strong>For orders where each product weighs less than 1 kg:</strong>
                <ul className={style.delivery__sublist}>
                  <li>For National customers, ALC ZOOM will assume the shipping costs.</li>
                  <li>For European customers:
                    <ul className={style.delivery__deliveryList}>
                      <li>Standard delivery:
                        <ul className={style.delivery__deliverySubList}>
                        <li className={style.delivery__ulListItem}>For orders with a total value of 0 to €2,500, the shipping cost will be €35;</li>
                        <li className={style.delivery__ulListItem}>For orders with a total value of more than €2.500, ALC ZOOM will assume the shipping costs.</li>
                        </ul>
                      </li>
                      <li> Express delivery:
                        <ul className={style.delivery__deliverySubList}>
                        <li className={style.delivery__ulListItem}>For orders with a total value from €0 to €2,500, the shipping cost will be €35;</li>
                        <li className={style.delivery__ulListItem}>For orders with a total value of €2,500 to €5,000, the shipping cost will be 0.8% of the order amount;</li>
                        <li className={style.delivery__ulListItem}>For orders with a total value of €5,000€ to €10,000, the shipping cost will be 0.6% of the order amount;</li>
                        <li className={style.delivery__ulListItem}>For orders with a total value of €10,000 to €20,000, the shipping cost will be 0.4% of the order amount;</li>
                        <li className={style.delivery__ulListItem}>For orders with a total value of €20,000 to €35,000, the shipping cost will be 0.3% of the order amount;</li>
                        <li className={style.delivery__ulListItem}>For orders with a total value of €35,000 to €50,000, the shipping cost will be 0.2% of the order amount;</li>
                        <li className={style.delivery__ulListItem}>For orders with a total value of more than €50,000, ALC ZOOM will assume the shipping costs.</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>For customers outside the European Union, shipping costs will be calculated according to the carrier's quotation.</li>
                </ul>
              </li>
              <li className={style.delivery__listItem}><strong>In case of orders in which there is at least one product weighing more than 1 kg:</strong>
                <p>For all customers, irrespective of the destination of the shipment, the shipping costs will be calculated according to the carrier's quotation.</p>
              </li>
              <li className={style.delivery__listItem}><strong>Drop-shipping:</strong>
                <ul className={style.delivery__sublist}>
                  <li> In the case of orders in which the total weight of the products contained in the packaging is less than 1,5 kg, the shipment will always be in express format and will be charged at a cost of:
                    <ul className={style.delivery__deliveryList}>
                      <li>For national customers, €15 (VAT not included)</li>
                      <li>For International customers, €35.</li>
                    </ul>
                  </li>
                  <li>In the case of orders where the total weight of the products contained in the packaging exceeds 1,5 kg, the shipment will be in standard format and the shipping costs will be calculated according to the carrier's quotation.</li>
                </ul>
              </li>
            </ol>
            <p>
           In each of the cases mentioned above, for Extra European Customers and National Customers will be charged €20 due to customs additional costs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
