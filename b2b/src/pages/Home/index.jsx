// import style from "./Home.module.scss"
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import { useQueryString } from "../../hooks";
import { useGetAllProductsQuery } from "../../store/api/products.api";
import BackToTop from "../../components/BackToTop"
import Loader from "../../components/Loader";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { perPage } = useQueryString();
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate()

  const { data: products = [], isLoading } = useGetAllProductsQuery(window.location.search ? window.location.search : `?perPage=${perPage}`);

  if (isLoading) return <Loader/>

  return (
    <>
    {loggedIn === false && navigate("/login")}
      <Header />
      <ProductList {...products} />
      <BackToTop/>
    </>
  )
}