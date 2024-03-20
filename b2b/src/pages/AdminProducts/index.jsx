import ProductList from "../../components/ProductList";
import EditProductForm from "../../components/EditProductForm";
import AddProductForm from "../../components/AddProductForm";
import AdminHeader from "../../components/AdminHeader";
import AdminParams from "../../components/AdminParams";
import BackToTop from "../../components/BackToTop"
import style from "./AdminProducts.module.scss";
import { useGetAllProductsQuery, useGetProductsQuery, useDeleteProductMutation } from "../../store/api/products.api";
import Loader from "../../components/Loader";
import { useCallback, useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import Filter from "../../components/Filter";
import { useQueryString } from '../../hooks';
import { useLocation } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { modalProps } from '../../components/Modal/modalProps';
import { fetchData } from "../../utils";
import { showModal } from '../../store/modalSlice';
import { baseUrl } from "../../utils/vars";
import AuthAdminContext from "../../context/AuthAdminContext";

export function AdminProducts() {

    const { search } = useLocation();
    const { params } = useQueryString();
    const perPage = params.perPage;
    const page = params.startPage;
    const { data: products = [], error, isLoading, refetch} = useGetAllProductsQuery(search ? search : `?startPage=${page}&perPage=${perPage}`);
    const { data: productsList = [], refetch: refetchProductsList } = useGetProductsQuery();
    const [delProduct ] = useDeleteProductMutation();

    const modalType = useSelector((state) => state.modal.modal);
    const [editForm, setEditForm] = useState(false);
    const [productId, setProductId] = useState(null);
    const [product, setProduct] = useState(null);
    const [addForm, setAddForm] = useState(false);
    const [adminParam, setAdminParam] = useState(null);
    const dispatch = useDispatch();
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const { loggedInAdmin } = useContext(AuthAdminContext);

    function handleDelButton(id) {
      setProductId(id);
      dispatch(showModal('deleteProduct'));
    }

    async function deleteProduct(product) {
      try {
        await delProduct(product.itemNo);
        dispatch(showModal('saved'));
        refetchProductsList();
      } catch (error) {
        dispatch(showModal('error'));
      }
    }

    function handleEditButtonClick(id) {
      setProductId(id);
      setEditForm(true);
    }

    function handleAddButton() {
      setAddForm(true)
    }
  
    function handleFormClose() {
      setEditForm(false);
      setProductId(null);
      setProduct(null);
      setAddForm(false);
      setAdminParam(null);
    }

    function handleAdminParamsButton(param) {
      setAdminParam(param);
    }

    function handleCopyButtonClick(copyProduct) {
      setProduct(copyProduct);
      setAddForm(true);
    }

    const getProduct = useCallback(async () => {
    const product = await fetchData(`${baseUrl}products/${productId}`)
    setProduct(product);
    // if (!product) return <Loader />;
  }, [productId]);

    useEffect(() => {
      productId && getProduct();
    }, [getProduct, productId]);

    useEffect(() => {
      refetch();
    }, [productsList, refetch]);

    useEffect(() => {
      if (errorMsg || successMsg) {
      const timer = setTimeout(() => {
        setErrorMsg(null);
        setSuccessMsg(null);
        clearTimeout(timer);
      }, 2500);
      }
    }, [errorMsg, successMsg]);

    if (isLoading) return <Loader />;

    if (error?.status === 400) return <Navigate to="/not-found" />;

    if (loggedInAdmin === false) return <Navigate to="/not-found" />;

    return (
    <>
    {errorMsg && <div className={style.admin__errorMessage}>{errorMsg}</div>}
    {successMsg && <div className={style.admin__successMessage}>Changes saved successfully</div>}
    {modalType && (
      <Modal data={modalProps.find((modal) => modal.type === modalType)} 
      onDelete={() => deleteProduct(product)}
      onCloseForm={handleFormClose} 
      />
    )}
    <AdminHeader loggedIn={true} />
    <BackToTop />
    {!editForm && !addForm && !adminParam && (
      <Filter />
    )}
    <div className={style.admin}>
    <div className={style.admin__container}>
          {editForm && product
            ? <EditProductForm
              product={product}
              onCloseForm={handleFormClose} 
              refetchProducts={refetchProductsList}
              setSuccessMsg={setSuccessMsg}
              setErrorMsg={setErrorMsg}/>
            : addForm
              ? <AddProductForm productCopy={product} onCloseForm={handleFormClose} refetchProducts={refetchProductsList}/>
            : adminParam
              ? <AdminParams adminParam={adminParam} onCloseForm={handleFormClose} setSuccessMsg={setSuccessMsg} setErrorMsg={setErrorMsg}/>
              : <>
                <div className={style.admin__header}>
                  <h1 className={style.admin__title}>Products</h1>
                  <div className={style.admin__headerBtns}>
                  <button className={style.admin__btn} type='button' onClick={()=> handleAdminParamsButton('brand')} >Brands</button>
                  <button className={style.admin__btn} type='button' onClick={()=> handleAdminParamsButton('categories')} >Categories</button>
                  <button className={style.admin__btn} type='button' onClick={handleAddButton} >Add new product</button>
                  </div>
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
                <ProductList
                  {...products}
                  customButtonHandler={handleEditButtonClick}
                  adminCard={true}
                  deleteButtonHandler={handleDelButton}
                  copyButtonHandler={handleCopyButtonClick} 
                  />
              </>
          }
      </div>
      </div>
    </>
    )
}