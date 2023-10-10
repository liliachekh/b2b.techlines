import styles from "./filter.module.scss";
import { FilterIcon } from "../icons";
import { useState, useEffect, useCallback } from "react";
import { useDebounce, useQueryString } from '../../hooks';
import { useGetFiltersQuery } from "../../store/api/filter.api";
import { FilterType } from "../FilterType";

function Filter() {
  const { data: filtersBD = [] } = useGetFiltersQuery();
  const filters = [...new Set(filtersBD.map((item) => item.type))];
  const { params, setSearchParams } = useQueryString();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(params.search || '');

  const debouncedValue = useDebounce(searchValue, 1000);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  }

  const search = useCallback(() => {
    if (debouncedValue?.length >= 3) {
      setSearchParams({ ...params, search: debouncedValue, startPage: 1 });
    } else {
      if (Object.keys(params).filter((param) => param !== 'search').length > 0) {
        const newParams = { ...params };
        delete newParams.search;
        setSearchParams({ ...newParams });
      } else {
        setSearchParams({});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  useEffect(() => {
    search();
  }, [search])

  const clearAllFilters = () => {
    setSearchParams({});
    setSearchValue('');
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
              {filters?.map((type) => (
                <FilterType
                  key={type}
                  type={type}
                  items={filtersBD.filter((category) => category.type === type)} />
              ))}
            </div>
            <div className={styles.filter__search}>
              <h4 className={styles.filter__dropdownTitle}>Search product</h4>
              <input
                type="text"
                id="search"
                name="search"
                onChange={handleSearch}
                value={searchValue}
              />
            </div>
            <div className={styles.filter__navigation}>
              <button
                type="button"
                className={`${styles.filter__navigationBtn + ' ' + styles.btnEffect}`}
                onClick={clearAllFilters}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter;