import ProductList from "../../components/ProductList";
import EditProductForm from "../../components/EditProductForm";
import style from "./AdminProducts.module.scss";
import { useGetAllProductsQuery } from "../../store/api/products.api";
import Loader from "../../components/Loader";
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Filter from "../../components/Filter";
import { useQueryString, useTitle } from '../../hooks';
import { useLocation } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { modalProps } from '../../components/Modal/modalProps';
import { fetchData } from "../../utils";
import { baseUrl } from "../../utils/vars";

export function AdminProducts() {

    const { search } = useLocation();
    const { params } = useQueryString();
    const navigate = useNavigate();
    const perPage = params.perPage;
    const page = params.startPage;
    const { data: products = [], error, isLoading } = useGetAllProductsQuery(search ? search : `?startPage=${page}&perPage=${perPage}`);

    const modalType = useSelector((state) => state.modal.modal);
    const [openForm, setOpenForm] = useState(false);
    const [productId, setProductId] = useState(null);
    const [product, setProduct] = useState(null);
    const [addProduct, setAddProduct] = useState(false);

    function handleEditButtonClick(id) {
      setProductId(id);
      setOpenForm(true);
      console.log(productId);
      console.log(product);
    }
  
    function handleFormClose() {
      setOpenForm(false);
      setProductId(null);
      setProduct(null);
      setAddProduct(false)
    }

    const getProduct = useCallback(async () => {
    const product = await fetchData(`${baseUrl}products/${productId}`)
    setProduct(product);
    // if (!product) return <Loader />;
  }, [productId]);

    useEffect(() => {
      productId && getProduct();
      console.log(product);
    }, [getProduct, productId]);
  
    useEffect(() => {
      modalType
        ? document.body.style.overflow = 'hidden'
        : document.body.style.overflow = 'auto';
    }, [modalType]);

    if (isLoading) return <Loader />;

    if (error?.status === 400) navigate("/not-found");
  
    return (
    <>
    {modalType && (
      <Modal data={modalProps.find((modal) => modal.type === modalType)} 
      // onDelete={() => deleteProduct(product)} 
      />
    )}
    {/* <AdminHeader loggedIn={true} /> */}
    {!openForm && !addProduct && (
      <Filter />
    )}
    <div className={style.admin}>
          {openForm && product
            ? <EditProductForm
              product={product}
              onCloseForm={handleFormClose} />
            // : addProduct
            //   ? <AddProductForm onCloseForm={handleFormClose} />
              : <>
                <div className={style.admin__container}>
                <div className={style.admin__header}>
                  <h1 className={style.admin__title}>Products</h1>
                  <button className={style.admin__btn} type='button' >Add new product</button>
                </div>
                <div className={`${style.admin__table} ${style.table}`}>
                  <p className={style.table__cell}>Image</p>
                  <p className={style.table__cell}>Name</p>
                  <p className={style.table__cell}>Brand</p>
                  <p className={style.table__cell}>Quantity</p>
                  <p className={style.table__cell}>Enabled</p>
                  <p className={style.table__cell}>Price</p>
                  <p className={style.table__cell}>Actions</p>
                </div>
                </div>
                <ProductList
                  {...products}
                  customButtonHandler={handleEditButtonClick}
                  adminCard={true}
                  // deleteButtonHandler={handleDelButton} 
                  />
              </>
          }
      </div>
    </>
    )
}