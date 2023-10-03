import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./addressSelector.module.scss";
import { animateFromTop } from "../../animation";
import { useGetCustomerQuery } from "../../store/api/customers.api";
import { ArrowDropdown } from "../icons";

function AddressSelector({ onSelect }) {
  const [IsOpen, setIsOpen] = useState(false);
  const { data: customer = {} } = useGetCustomerQuery();
  const deliveryAddresses = customer?.deliveryAddresses

  async function chooseAddress(address) {
    Object.entries(address).forEach(([key, value]) => {
      if (key !== 'save') onSelect(key, value)
    })
    setIsOpen(false)
  }

  if (!deliveryAddresses) return null

  return (
    <div className={styles.selector}>
      <button
        onClick={() => setIsOpen(!IsOpen)}
        className={styles.selector__btn}
        type={'button'}>
        Choose address from saved
        <ArrowDropdown />
      </button>
      <AnimatePresence>
        {IsOpen && (
          <motion.div className={styles.selector__list} {...animateFromTop}>
            {deliveryAddresses.map((address, index) => (
              <button
                key={Math.random() * 1000}
                type='button'
                className={styles.selector__item}
                onClick={() => chooseAddress(address)}>
                {`${address?.city} ${address?.street} ${address?.house}${', ' + address?.apartment}${', ' + address?.firstName} ${address?.lastName}${', ' + address?.telephone}`}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddressSelector;