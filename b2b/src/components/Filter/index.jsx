import styles from "./filter.module.scss";
import { FilterIcon, ArrowDropdown } from "../icons";
import { useState } from "react";
import { useQueryString } from '../../hooks';
import { useGetFiltersQuery } from "../../store/api/filter.api";

function Filter() {
  const { data: filtersBD = [] } = useGetFiltersQuery();
  const { params: initialParams, setSearchParams } = useQueryString();
  const [params, setParams] = useState(initialParams);

  // console.log(filtersBD);
  // console.log(params);

  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleDropdown = (type) => {
    setIsDropdownOpen(isDropdownOpen === type ? null : type);
  };

  const handleCheckbox = (key, value) => {
    const updatedParams = { ...params };

    if (updatedParams[key]?.includes(value)) {
      updatedParams[key] = updatedParams[key].split(',').filter(a => a !== value).join(',');
    } else {
      updatedParams[key] = (updatedParams[key] || '') + (updatedParams[key] ? ',' : '') + value;
    }

    setParams({ ...updatedParams });
  };

  const handleSearch = (e) => {
    setParams({ ...params, search: e.target.value });
  };

  const clearAllFilters = () => {
    setSearchParams({});
    setParams({});
  };

  const applyFilters = (e) => {
    e.preventDefault();
    setSearchParams({ ...params, startPage: 1 });
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
          <form
            className={`${styles.filter__navContent} ${isFilterOpen && styles.open}`}
            onSubmit={applyFilters}>
            <div className={styles.filter__dropdownBlock}>
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
                    {params?.categories && params.categories.split(',').length > 0 ? `Selected ${params.brand.split(',').length} items` : 'Select'}
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
              <button
                type="submit"
                className={`${styles.filter__navigationBtn + ' ' + styles.btnEffect}`}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Filter;