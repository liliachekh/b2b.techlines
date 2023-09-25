import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./addressSelector.module.scss";
import { animateFromTop } from "../../animation";
import { useGetCustomerQuery } from "../../store/api/customers.api";
import { ArrowDropdown } from "../icons";

function AddressSelector({ onSelect }) {
  const [IsOpen, setIsOpen] = useState(false);
  const { data: customer = {} } = useGetCustomerQuery();

  const chooseAddress = (i) => {
    Object.entries(customer?.addresses[i]).forEach(([key,value])=>{
      onSelect(key, value)
    })
    setIsOpen(false)
  }

  if (!customer?.addresses) return null

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
            {customer?.addresses.map((address, index) => (
              <button
                key={address?.index + address?.apartment}
                type='button'
                className={styles.selector__item}
                onClick={() => chooseAddress(index)}>
                {`${address?.city} ${address?.street} ${address?.house}${', ' + address?.apartment}`}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddressSelector;