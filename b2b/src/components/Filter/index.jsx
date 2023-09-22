import styles from "./filter.module.scss";
import { FilterIcon, ArrowDropdown } from "../icons";
import { useState, useCallback, useEffect } from "react";
// import { useDispatch } from 'react-redux';
import { fetchData } from "../../utils";
import { useSearchParams } from "react-router-dom";

function Filter() {

    // const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    // const [queryString, setQueryString] = useState('');
    // const [products, setProducts] = useState(null);
    const [filters, setFilters] = useState({
        categoriesFilters: [],
        brandFilters: []
    });
    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
        brand: [],
        search: '',
    });
    const [setSearchParams] = useSearchParams();

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
      };

    const toggleDropdown = (type) => {
        setIsDropdownOpen(isDropdownOpen === type ? null : type); // Если список уже открыт, то закрыть его, иначе открыть выбранный
        console.log(selectedFilters);
        // console.log(products);
      };

    const getFiltersByType = useCallback(async (type) => {
        try {
          const data = await fetchData(`http://localhost:4000/api/filters/${type}`);
        setFilters(prevFilters => ({
            ...prevFilters,
            [`${type}Filters`]: data
        }));
        } catch (error) {
            console.log(error);
        // dispatch(setErrorAction(error.message));
        }
    }, []);

    // рендер всіх товарів
    // const renderProducts = useCallback(async () => {
    //     try {
    //       // Запит до API
    //       const data = await fetchData(`https://storage.techlines.es/api/products/filter`);
    //       setProducts(data);
    //     } catch (error) {
    //         console.log(error);
    //     //   dispatch(setErrorAction(error.message));
    //     }
    // }, []);

    // Функція для відображення товарів згідно обраних фільтрів
    // const applyFilters = useCallback(async () => {
    //     try {
    //     // Оновлення URL з актуальними параметрами фільтрації
    //     // navigate(`/discover?${queryString}`);
    //     // Запит до API з використанням queryString для фільтрації товарів
    //     const data = await fetchData(`https://storage.techlines.es/api/products/filter?${queryString}`);
    //     setProducts(data);
    //     } catch (error) {
    //     // dispatch(setErrorAction(error.message));
    //     console.log(error);
    //     }
    // });
    async function applyFilters() {

        const updatedSearchParams = new URLSearchParams();

        if (selectedFilters.categories.length > 0) {
            updatedSearchParams.set('categories', selectedFilters.categories.join(','));
        }

        if (selectedFilters.brand.length > 0) {
            updatedSearchParams.set('brand', selectedFilters.brand.join(','));
        }

        if (selectedFilters.search !== '') {
            updatedSearchParams.set('search', selectedFilters.search);
        }

        setSearchParams(updatedSearchParams);
    }

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

    // Фільтр пошуку
    const handleChange = (e) => {
        setSelectedFilters({ ...selectedFilters, search: e.target.value });
    }

    useEffect(() => {
        getFiltersByType('categories');
        getFiltersByType('brand');
        // renderProducts();
    }, [getFiltersByType]);

    // useEffect(() => {
    //     let newQueryString = '';
    
    //     if (selectedFilters.categories.length > 0) {
    //         const categoriesString = selectedFilters.categories.join(',');
    //         newQueryString += `&categories=${categoriesString}`;
    //     }
    
    //     if (selectedFilters.brand.length > 0) {
    //       const brandString = selectedFilters.brand.join(',');
    //       newQueryString += `&brand=${brandString}`;
    //     }

    //     if (selectedFilters.search !== '') {
    //       newQueryString += `&prod=${selectedFilters.search}`;
    //     }
    
    //     setQueryString(newQueryString);
    //   }, [selectedFilters]);

    // Очистити всі фільтри
    const clearAllFilters = () => {
        setSelectedFilters({
        ...selectedFilters,
        categories: [],
        brand: [],
        search: '',
        });
        setSearchParams({});
        // renderProducts();
        console.log(selectedFilters);
    };


    return (
        <div className={styles.filter}>
            <div className={styles.filter__container}>
                <div className={styles.filter__nav}>
                    <button type="button" onClick={toggleFilter} className={`${styles.filter__navBtnFilter + ' ' + styles.btnEffect}`}>
                        <span className={styles.filter__title}>Filters</span>
                    </button>
                    <div className={styles.filter__navTitle}>
                        <FilterIcon />
                        <span className={styles.filter__title}>Filters</span>
                    </div>
                    <div className={`${styles.filter__navContent} ${isFilterOpen && styles.open}`}>
                        <div className={styles.filter__dropdownBlock}>
                        <div className={styles.filter__dropdown}>
                            <h4 className={styles.filter__dropdownTitle}>Categories</h4>
                            <button type="button" className={styles.filter__dropdownBtn} onClick={() => toggleDropdown('categories')}>
                                <span className={styles.filter__dropdownBtnText}>{selectedFilters.categories.length > 0 ? `Selected ${selectedFilters.categories.length} items` : 'Select'}</span>
                                <ArrowDropdown/>
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
                        <div className={styles.filter__search}>
                            <h4 className={styles.filter__dropdownTitle}>Search product</h4>
                            <input type="text" id="search" name="search" onChange={handleChange} value={selectedFilters.search}/>
                        </div>
                        <div className={styles.filter__dropdown}>
                            <h4 className={styles.filter__dropdownTitle}>Brand</h4>
                            <button type="button" className={styles.filter__dropdownBtn} onClick={() => toggleDropdown('brand')}> 
                                <span className={styles.filter__dropdownBtnText}>{selectedFilters.brand.length > 0 ? `Selected ${selectedFilters.brand.length} items` : 'Select'}</span>
                                <ArrowDropdown/>
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
                        <div className={styles.filter__navigation}>
                            <button type="button" className={`${styles.filter__navigationBtn + ' ' + styles.btnEffect}`} onClick={clearAllFilters}>Clear</button>
                            <button type="submit" className={`${styles.filter__navigationBtn + ' ' + styles.btnEffect}`} onClick={applyFilters}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter;