import { useState } from "react";
import styles from './adminProducts.module.scss';
import ProductList from "../ProductList";
import { useGetAllProductsQuery, useGetProductQuery } from "../../store/api/products.api";
import { useLocation } from "react-router-dom";
import { useQueryString } from "../../hooks";
import Loader from "../Loader";

export default function AdminProducts(){
  const [openForm, setOpenForm] = useState(false);
  const { search } = useLocation();
  const { params } = useQueryString();
  const perPage = params.perPage;
  const page = params.startPage;

  const { data: products = [], isLoading } = useGetAllProductsQuery(search ? search : `?startPage=${page}&perPage=${perPage}`);
  if (isLoading) return <Loader />
  
  return <>
    <div className={styles.admin}>
        <div className={styles.admin__container}>
        {
            <ProductList
              {...products}
              customButtonText="Edit"
              // customButtonHandler={handleEditButtonClick} 
            />
        }
        </div>
    </div>
    </>
}