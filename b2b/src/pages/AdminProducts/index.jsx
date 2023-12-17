import ProductList from "../../components/ProductList";
import style from "./AdminProducts.module.scss";
import { useGetAllProductsQuery } from "../../store/api/products.api";
import Loader from "../../components/Loader";
import { Navigate, useNavigate } from "react-router-dom";
import Filter from "../../components/Filter";
import { useQueryString, useTitle } from '../../hooks';
import { useLocation } from "react-router-dom";

export function AdminProducts() {

    const { search } = useLocation();
    const { params } = useQueryString();
    const navigate = useNavigate();
    const perPage = params.perPage;
    const page = params.startPage;
  
    const { data: products = [], error, isLoading } = useGetAllProductsQuery(search ? search : `?startPage=${page}&perPage=${perPage}`);

    if (isLoading) return <Loader />;
  
    if (error?.status === 400) navigate("/not-found");
  
    return (
    <>
    {/* {modalType && (
      <Modal data={modalProps.find((modal) => modal.type === modalType)} onDelete={() => deleteProduct(product)} />
    )} */}
    {/* <AdminHeader loggedIn={true} /> */}
    <Filter />
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
                  <button className={style.admin__btn} type='button' >Add new product</button>
                </div>
                <div className={`${style.admin__table} ${style.table}`}>
                  <p className={style.table__cell}>Image</p>
                  <p className={style.table__cell}>Name</p>
                  <p className={style.table__cell}>Author</p>
                  <p className={style.table__cell}>Quantity</p>
                  <p className={style.table__cell}>Enabled</p>
                  <p className={style.table__cell}>Price</p>
                  <p className={style.table__cell}>Actions</p>
                </div>
                <ProductList
                  {...products}
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