import EditProductForm from "../../components/EditProductForm";
import AddProductForm from "../../components/AddProductForm";
import AdminHeader from "../../components/AdminHeader";
import AdminParams from "../../components/AdminParams";
import BackToTop from "../../components/BackToTop"
import style from "./AdminCustomers.module.scss";
import { useGetProductsQuery, useDeleteProductMutation } from "../../store/api/products.api";
import { useGetAllCustomersQuery } from "../../store/api/customers.api";
import Loader from "../../components/Loader";
import { useCallback, useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import Filter from "../../components/Filter";
import { useQueryString } from '../../hooks';
import { useLocation } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { modalProps } from '../../components/Modal/modalProps';
import { fetchData } from "../../utils";
import { showModal } from '../../store/modalSlice';
import { baseUrl } from "../../utils/vars";
import AuthAdminContext from "../../context/AuthAdminContext";
import { useAuthAdminContext } from "../../context/AuthAdminContext";
import { AdminCustomerCard } from "../../components/AdminCustomerCard";

export function AdminCustomers() {

    const { search } = useLocation();
    const { params } = useQueryString();
    const navigate = useNavigate();
    const perPage = params.perPage;
    const page = params.startPage;
    const { data: customers = [], error, isLoading, refetch} = useGetAllCustomersQuery();
    const { data: productsList = [], refetch: refetchProductsList } = useGetProductsQuery();
    const [delProduct ] = useDeleteProductMutation();
    const modalType = useSelector((state) => state.modal.modal);
    const [openForm, setOpenForm] = useState(false);
    const [productId, setProductId] = useState(null);
    const [product, setProduct] = useState(null);
    const [addProduct, setAddProduct] = useState(false);
    const [adminParam, setAdminParam] = useState(null);
    const dispatch = useDispatch();
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [activeButton, setActiveButton] = useState('');

    // const { loggedInAdmin } = useAuthAdminContext();
    const { loggedInAdmin } = useContext(AuthAdminContext);

    function handleDelButton(id) {
      // const product = productsList.find((product) => product.itemNo === itemNo);
      // setProduct(product);
      setProductId(id);
      dispatch(showModal('deleteProduct'));
      console.log(loggedInAdmin)
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

    if (error?.status === 400) navigate("/not-found");

    if (loggedInAdmin === false) navigate("/not-found");
  
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
    {/* {!openForm && !addProduct && !adminParam && (
      <Filter />
    )}   */}
    <div className={style.admin__nav}>
      <Link to="/admin" className={style.admin__btn}>Products</Link>
      <Link to="/admin/customers" className={activeButton === 'admin/customers' ? `${style.admin__btn}` : `${style.admin__btn_active}`}>Customers</Link>
    </div>
    <div className={style.admin}>
    <div className={style.admin__container}>
          {openForm && product
            ? <EditProductForm
              product={product}
              onCloseForm={handleFormClose} 
              refetchProducts={refetchProductsList}
              setSuccessMsg={setSuccessMsg}
              setErrorMsg={setErrorMsg}/>
            : addProduct
              ? <AddProductForm onCloseForm={handleFormClose} refetchProducts={refetchProductsList}/>
            : adminParam
              ? <AdminParams adminParam={adminParam} onCloseForm={handleFormClose} setSuccessMsg={setSuccessMsg} setErrorMsg={setErrorMsg}/>
              : <>
                <div className={style.admin__header}>
                  <h1 className={style.admin__title}>Customers</h1>
                  <div className={style.admin__headerBtns}>
                  </div>
                </div>
                <div className={`${style.admin__table} ${style.table}`}>
                  <p className={style.table__cell}>ID</p>
                  <p className={style.table__cell}>Email</p>
                  <p className={style.table__cell}>First Name</p>
                  <p className={style.table__cell}>Last Name</p>
                  <p className={style.table__cell}>VAT</p>
                  <p className={style.table__cell}>Enabled</p>
                  <p className={style.table__cell}>Actions</p>
                </div>
                {/* <ProductList
                  {...products}
                  customButtonHandler={handleEditButtonClick}
                  adminCard={true}
                  deleteButtonHandler={handleDelButton} 
                  /> */}
                <div className={style.customers}>
                  {customers.map(customer => (
                      <AdminCustomerCard {...customer}/>
                    ))
                  }
                </div> 
              </>
          }
      </div>
      </div>
    </>
    )
}