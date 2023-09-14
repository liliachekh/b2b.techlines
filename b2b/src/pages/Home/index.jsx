// import style from "./Home.module.scss"
import ProductList from "../../components/ProductList";
import { useGetAllProductsQuery } from "../../store/api/products.api";
import Loader from "../../components/Loader";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Filter from "../../components/Filter";
import { useQueryString } from '../../hooks';
import { useLocation } from "react-router-dom";

export function Home() {
  const { loggedIn } = useContext(AuthContext);
  const { search } = useLocation();
  const { params } = useQueryString();
  const perPage = params.perPage;
  const page = params.startPage;

  const { data: products = [], isLoading } = useGetAllProductsQuery(search ? search : `?startPage=${page}&perPage=${perPage}`);

  if (isLoading) return <Loader />
  if (loggedIn === false) return <Navigate to="/login" />

  return (
    <>
      <Filter />
      <ProductList {...products} />
    </>
  )
}