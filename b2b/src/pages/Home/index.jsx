// import style from "./Home.module.scss"
import ProductList from "../../components/ProductList";
import { useGetAllProductsQuery } from "../../store/api/products.api";
import Loader from "../../components/Loader";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Filter from "../../components/Filter";
import { useQueryString } from '../../hooks';
import { useLocation } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";

export function Home() {
  useTitle('');
  const { loggedIn } = useContext(AuthContext);
  const { search } = useLocation();
  const { params } = useQueryString();
  const navigate = useNavigate();
  const perPage = params.perPage;
  const page = params.startPage;

  const { data: products = [], error, isLoading } = useGetAllProductsQuery(search ? search : `?startPage=${page}&perPage=${perPage}`);
  
  if (isLoading) return <Loader />;

  if (error?.status === 400) navigate("/not-found");

  if (loggedIn === false) return <Navigate to="/login" />;

  return (
    <>
      <Filter />
      <ProductList {...products} />
    </>
  )
}