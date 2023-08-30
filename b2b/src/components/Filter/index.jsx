import styles from "./filter.module.scss";
import { FilterIcon } from "../icons";
import { useState } from "react";

function Filter() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };

    return (
        <div className={styles.filter}>
            <div className={styles.filter__container}>
                <div className={styles.filter__nav}>
                    <div className={styles.filter__navTitle}>
                        <FilterIcon />
                        <span className={styles.filter__title}>Filter</span>
                    </div>
                    <div className={styles.filter__navContent}>
                        <div className={styles.filter__dropdown}>
                            <button className={styles.filter__dropdownBtn} onClick={toggleDropdown}>
                                <span className="open">{selectedValues.length > 0 ? `Selected ${selectedValues.length} items` : 'Select'}</span>
                            </button>
                            {isDropdownOpen && (
                                <ul>
                                {filters?.categoriesFilters?.map((category) => (
                                    <li key={category._id} className={styles.filter__sidebarItem}>
                                    <label htmlFor={category._id}>
                                        <input type="checkbox" id={category._id} name={category.name} data-filter-type="categories" onChange={valueChange} checked={selectedFilters.categories.includes(category.name) ? true : false} />
                                        {category.name}
                                    </label>
                                    </li>
                                ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}