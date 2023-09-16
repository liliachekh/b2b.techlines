import styles from "./filter.module.scss";
import { FilterIcon, ArrowDropdown } from "../icons";
import { useState, useEffect, useRef } from "react";
import { useQueryString } from '../../hooks';
import { useGetFiltersQuery } from "../../store/api/filter.api";

function Filter() {
  const { data: filtersBD = [] } = useGetFiltersQuery();
  const { params, setSearchParams } = useQueryString();


  // console.log(filtersBD);
  // console.log(params);

  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleDropdown = (type) => {
    setIsDropdownOpen(isDropdownOpen === type ? null : type);
  };

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

  // const debounce = (fn, delay) => {
  //   let timeoutID;

  //   return function (...args) {
  //     if (timeoutID) {
  //       clearTimeout(timeoutID);
  //     }

  //     timeoutID = setTimeout(() => {
  //       fn(...args);
  //     }, delay);
  //   };
  // };

  const handleSearch = (e) => {
    if (e.target.value) {
      setSearchParams({ ...params, search: e.target.value, startPage: 1 });
    } else {
      const newParams = { ...params };
      delete newParams.search;
      setSearchParams({ ...newParams, startPage: 1 })
    }
  }

  const clearAllFilters = () => {
    setSearchParams({});
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
          <div
            className={`${styles.filter__navContent} ${isFilterOpen && styles.open}`}>
            <div className={styles.filter__dropdownBlock} ref={dropdownRef}>
              <div className={styles.filter__dropdown}>
                <h4 className={styles.filter__dropdownTitle}>Categories</h4>
                <button
                  type="button"
                  className={styles.filter__dropdownBtn}
                  onClick={() => toggleDropdown('categories')}>
                  <span
                    className={styles.filter__dropdownBtnText}>
                    {params?.categories && params.categories.split(',').length > 0 ? `Selected ${params.categories.split(',').length} items` : 'Select'}
                  </span>
                  <ArrowDropdown />
                </button>
                <ul className={`${styles.filter__dropdownList} ${isDropdownOpen === 'categories' && styles.open}`}>
                  {filtersBD?.map((category) => {
                    if (category.type === 'categories')
                      return (
                        <li key={category._id} className={styles.filter__dropdownItem}>
                          <label htmlFor={category.name}>
                            <input
                              type="checkbox"
                              id={category.name}
                              name={category.type}
                              value={category.name}
                              onChange={() => handleCheckbox(category.type, category.name)}
                              checked={params[category.type]?.includes(category.name) ? true : false} />
                            {category.name}
                          </label>
                        </li>)
                        return null;
                  })}
                </ul>
              </div>
              <div className={styles.filter__search}>
                <h4 className={styles.filter__dropdownTitle}>Search product</h4>
                <input
                  type="text"
                  id="search"
                  name="search"
                  onChange={handleSearch}
                  value={params?.search || ''} />
              </div>
              <div className={styles.filter__dropdown}>
                <h4 className={styles.filter__dropdownTitle}>Brand</h4>
                <button
                  type="button"
                  className={styles.filter__dropdownBtn}
                  onClick={() => toggleDropdown('brand')}>
                  <span
                    className={styles.filter__dropdownBtnText}>
                    {params?.brand && params.brand.split(',').length > 0 ? `Selected ${params.brand.split(',').length} items` : 'Select'}
                  </span>
                  <ArrowDropdown />
                </button>
                <ul className={`${styles.filter__dropdownList} ${isDropdownOpen === 'brand' && styles.open}`}>
                  {filtersBD?.map((category) => {
                    if (category.type === 'brand')
                      return (
                        <li key={category._id} className={styles.filter__dropdownItem}>
                          <label htmlFor={category.name}>
                            <input
                              type="checkbox"
                              id={category.name}
                              name={category.type}
                              value={category.name}
                              onChange={() => handleCheckbox(category.type, category.name)}
                              checked={params[category.type]?.includes(category.name) ? true : false} />
                            {category.name}
                          </label>
                        </li>)
                        return null;
                  })}
                </ul>
              </div>
            </div>
            <div className={styles.filter__navigation}>
              <button
                type="button"
                className={`${styles.filter__navigationBtn + ' ' + styles.btnEffect}`}
                onClick={clearAllFilters}>
                Clear
              </button>
              {/* <button
                type="submit"
                className={`${styles.filter__navigationBtn + ' ' + styles.btnEffect}`}>
                Submit
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter;