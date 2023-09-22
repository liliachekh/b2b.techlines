import { useEffect, useRef, useState } from "react";
import { useQueryString } from "../../hooks";
import { ArrowDropdown } from "../icons";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./filterType.module.scss";
import { animateFromTop } from "../../animation";

export function FilterType({ type, items }) {
  const { params, setSearchParams } = useQueryString();
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  function toggleDropdown(type) {
    setIsDropdownOpen(isDropdownOpen === type ? null : type);
  };

  function handleDocumentClick(e) {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen('');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  function handleCheckbox(key, value) {
    if (params[key]?.includes(value)) {
      const oldParam = params[key].split(',').filter(a => a !== value).join(',');

      if (oldParam?.length > 0) {
        setSearchParams({ ...params, [key]: oldParam, startPage: 1 })
      } else {
        const newParams = { ...params };
        delete newParams[key];
        setSearchParams({ ...newParams, startPage: 1 })
      }
    } else {
      const oldParam = params[key] ? params[key] + ',' : '';
      setSearchParams({ ...params, [key]: oldParam + value, startPage: 1 })
    }
  }

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <h4 className={styles.dropdown__title}>{type}</h4>
      <button
        type="button"
        className={styles.dropdown__btn}
        onClick={() => toggleDropdown(type)}>
        <span className={styles.dropdown__btn_text}>
          {params[type] && params[type].split(',').length > 0 ? `Selected ${params[type].split(',').length} items` : 'Select'}
        </span>
        <ArrowDropdown />
      </button>
      <AnimatePresence>
        {isDropdownOpen === type && <motion.ul className={`${styles.dropdown__list}`}
          {...animateFromTop}>
          {items?.map(({ name, type }) => (
            <li key={name} className={styles.dropdown__item}>
              <label htmlFor={name}>
                <input
                  type="checkbox"
                  id={name}
                  name={type}
                  value={name}
                  onChange={() => handleCheckbox(type, name)}
                  checked={params[type]?.includes(name) ? true : false} />
                {name}
              </label>
            </li>))}
        </motion.ul>}
      </AnimatePresence>
    </div>
  )
}