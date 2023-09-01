import styles from "./filter.module.scss";
import { FilterIcon } from "../icons";
import { useState, useCallback, useEffect } from "react";
// import { useDispatch } from 'react-redux';
import { fetchData } from "../../utils";
// import SortByBtn from '../SortByBtn';

function Filter() {

    // const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(null);
    const [filters, setFilters] = useState({
        categoriesFilters: [],
        brandFilters: []
    });
    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
        brand: []
    });

    const toggleDropdown = (type) => {
        setIsDropdownOpen(isDropdownOpen === type ? null : type); // Если список уже открыт, то закрыть его, иначе открыть выбранный
      };

      const getFiltersByType = useCallback(async (type) => {
        try {
        const data = await fetchData(`https://storage.techlines.es/api/filters/${type}`);
        setFilters(prevFilters => ({
            ...prevFilters,
            [`${type}Filters`]: data
        }));
        } catch (error) {
            console.log(error);
        // dispatch(setErrorAction(error.message));
        }
    }, []);

    useEffect(() => {
        getFiltersByType('categories');
        getFiltersByType('brand');
    }, [getFiltersByType]);

    // Код фільтру по чекбоксам
    const valueChange = (event) => {
    const { name, checked } = event.target;
    const filterType = event.target.getAttribute('data-filter-type');

        setSelectedFilters((prevSelectedFilters) => {
        const updatedFilters = { ...prevSelectedFilters };

        if (checked) {
            updatedFilters[filterType] = [...updatedFilters[filterType], name];
        } else {
            updatedFilters[filterType] = updatedFilters[filterType].filter((filter) => filter !== name);
        }

        return updatedFilters;
        });
    };


    return (
        <div className={styles.filter}>
            <div className={styles.filter__container}>
                <div className={styles.filter__nav}>
                    <button className={`${styles.filter__navBtnFilter + ' ' + styles.btnEffect}`}>
                        {/* <FilterIcon /> */}
                        <span className={styles.filter__title}>Filters</span>
                    </button>
                    <div className={styles.filter__navTitle}>
                        <FilterIcon />
                        <span className={styles.filter__title}>Filters</span>
                    </div>
                    <div className={styles.filter__navContent}>
                        <div className={styles.filter__dropdown}>
                            <h4 className={styles.filter__dropdownTitle}>Categories</h4>
                            <button type="button" className={styles.filter__dropdownBtn} onClick={() => toggleDropdown('categories')}>
                                <span className={styles.filter__dropdownBtnText}>{selectedFilters.categories.length > 0 ? `Selected ${selectedFilters.categories.length} items` : 'Select'}</span>
                            </button>
                            <ul className={`${styles.filter__dropdownList} ${isDropdownOpen === 'categories' && styles.open}`}>
                                {filters?.categoriesFilters?.map((category) => (
                                    <li key={category._id} className={styles.filter__dropdownItem}>
                                    <label htmlFor={category._id}>
                                        <input type="checkbox" id={category._id} name={category.name} data-filter-type="categories" onChange={valueChange} checked={selectedFilters.categories.includes(category.name) ? true : false} />
                                        {category.name}
                                    </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.filter__dropdown}>
                            <h4 className={styles.filter__dropdownTitle}>Brand</h4>
                            <button type="button" className={styles.filter__dropdownBtn} onClick={() => toggleDropdown('brand')}> 
                                <span className={styles.filter__dropdownBtnText}>{selectedFilters.brand.length > 0 ? `Selected ${selectedFilters.brand.length} items` : 'Select'}</span>
                            </button>
                            <ul className={`${styles.filter__dropdownList} ${isDropdownOpen === 'brand' && styles.open}`}>
                                {filters?.brandFilters?.map((brand) => (
                                    <li key={brand._id} className={styles.filter__dropdownItem}>
                                    <label htmlFor={brand._id}>
                                        <input type="checkbox" id={brand._id} name={brand.name} data-filter-type="brand" onChange={valueChange} checked={selectedFilters.brand.includes(brand.name) ? true : false} />
                                        {brand.name}
                                    </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter;