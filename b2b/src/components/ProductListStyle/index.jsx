import styles from '../ProductList/productList.module.scss';
import { IconCardList, IconTableList } from "../icons";

function ProductListStyle({style, changeStyle}) {
  return (
    <div className={styles.controller}>
      <div className={styles.controller__title}>
        Display Style
      </div>
      <button
        className={styles.controller__btn}
        type='button'
        onClick={() => changeStyle(!style)}>
        {style ? <IconTableList /> : <IconCardList />}
      </button>
    </div>
  )
}

export default ProductListStyle