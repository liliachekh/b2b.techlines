import styles from "./filter.module.scss";
import { FilterIcon } from "../icons";

function Filter() {

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

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}