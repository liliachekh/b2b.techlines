import ProductList from "../../components/ProductList";
import EditProductForm from "../../components/EditProductForm";
import AddProductForm from "../../components/AddProductForm";
import AdminHeader from "../../components/AdminHeader";
import AdminParams from "../../components/AdminParams";
import style from "./AdminProducts.module.scss";
import { useGetAllProductsQuery, useGetProductsQuery, useDeleteProductMutation } from "../../store/api/products.api";
import Loader from "../../components/Loader";
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Filter from "../../components/Filter";
import { useQueryString } from '../../hooks';
import { useLocation } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { modalProps } from '../../components/Modal/modalProps';
import { fetchData } from "../../utils";
import { showModal } from '../../store/modalSlice';
import { baseUrl } from "../../utils/vars";

export function AdminProducts() {

    const { search } = useLocation();
    const { params } = useQueryString();
    const navigate = useNavigate();
    const perPage = params.perPage;
    const page = params.startPage;
    const { data: products = [], error, isLoading, refetch} = useGetAllProductsQuery(search ? search : `?startPage=${page}&perPage=${perPage}`);
    const { data: productsList = [], refetch: refetchProductsList } = useGetProductsQuery();
    const [delProduct ] = useDeleteProductMutation();

    const modalType = useSelector((state) => state.modal.modal);
    const [openForm, setOpenForm] = useState(false);
    const [productId, setProductId] = useState(null);
    const [product, setProduct] = useState(null);
    const [addProduct, setAddProduct] = useState(false);
    const [adminParam, setAdminParam] = useState(null);
    const dispatch = useDispatch();

    function handleDelButton(id) {
      // const product = productsList.find((product) => product.itemNo === itemNo);
      // setProduct(product);
      setProductId(id);
      dispatch(showModal('deleteProduct'));
    }

    async function deleteProduct(product) {
      try {
        await delProduct(product.itemNo);
        dispatch(showModal('saved'));
        refetchProductsList();
      } catch (error) {
        // dispatch(setErrorAction(error.message));
        dispatch(showModal('error'));
        console.log(error);
      }
    }

    function handleEditButtonClick(id) {
      setProductId(id);
      setOpenForm(true);
    }

    function handleAddButton() {
      setAddProduct(true)
    }
  
    function handleFormClose() {
      setOpenForm(false);
      setProductId(null);
      setProduct(null);
      setAddProduct(false);
      setAdminParam(null);
    }

    function handleAdminParamsButton(param) {
      setAdminParam(param);
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
      modalType
        ? document.body.style.overflow = 'hidden'
        : document.body.style.overflow = 'auto';
    }, [modalType]);

    useEffect(() => {
      refetch();
    }, [productsList, refetch])

    if (isLoading) return <Loader />;

    if (error?.status === 400) navigate("/not-found");
  
    return (
    <>
    {modalType && (
      <Modal data={modalProps.find((modal) => modal.type === modalType)} 
      onDelete={() => deleteProduct(product)}
      onCloseForm={handleFormClose} 
      />
    )}
    <AdminHeader loggedIn={true} />
    {!openForm && !addProduct && !adminParam && (
      <Filter />
    )}
    <div className={style.admin}>
    <div className={style.admin__container}>
          {openForm && product
            ? <EditProductForm
              product={product}
              onCloseForm={handleFormClose} 
              refetchProducts={refetchProductsList}/>
            : addProduct
              ? <AddProductForm onCloseForm={handleFormClose} refetchProducts={refetchProductsList}/>
            : adminParam
              ? <AdminParams adminParam={adminParam} onCloseForm={handleFormClose}/>
              : <>
                <div className={style.admin__header}>
                  <h1 className={style.admin__title}>Products</h1>
                  <button className={style.admin__btn} type='button' onClick={()=> handleAdminParamsButton('brand')} >Brands</button>
                  <button className={style.admin__btn} type='button' onClick={()=> handleAdminParamsButton('categories')} >Categories</button>
                  <button className={style.admin__btn} type='button' onClick={handleAddButton} >Add new product</button>
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
                  />
              </>
          }
      </div>
      </div>
    </>
    )
}