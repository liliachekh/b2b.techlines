import { useLocation } from 'react-router-dom';
import ProductList from '../../components/ProductList';
import { useGetAllProductsQuery } from '../../store/api/products.api';
import style from './adminProducts.module.scss';
import { useQueryString } from '../../hooks';
import Loader from '../../components/Loader';
export default function AdminProducts(){
  const { search } = useLocation();
  const { params } = useQueryString();
  const perPage = params.perPage;
  const page = params.startPage;

  const { data: products = [], isLoading } = useGetAllProductsQuery(search ? search : `?startPage=${page}&perPage=${perPage}`);
    return (
        <>
        <div className={style.admin}>
        <div className={style.admin__container}>
        {/* {openForm && product
          ? <EditProductForm
            product={product}
            onCloseForm={handleFormClose} />
          : addProduct
            ? <AddProductForm onCloseForm={handleFormClose} />
            : <> */}
              <div className={style.admin__header}>
                <h1 className={style.admin__title}>Products</h1>
                <button className={style.admin__btn} type='button' 
                // onClick={handleAddButton}
                >Add new product</button>
              </div>
              <div className={`${style.admin__table} ${style.table}`}>
                <p className={style.table__cell}>Image</p>
                <p className={style.table__cell}>Name</p>
                <p className={style.table__cell}>Quantity</p>
                <p className={style.table__cell}>Enabled</p>
                <p className={style.table__cell}>Price</p>
                <p className={style.table__cell}>Actions</p>
              </div>
              <ProductList
                {...products}
                customButtonText="Edit"
                // customButtonHandler={handleEditButtonClick}
                adminCard={true}
                // deleteButtonHandler={handleDelButton} 
                />
            {/* </>
        } */}
      </div>
    </div>
        </>
    )
}