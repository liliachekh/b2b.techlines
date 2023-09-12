// import style from "./Home.module.scss"
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import { useGetAllProductsQuery } from "../../store/api/products.api";
import BackToTop from "../../components/BackToTop"
import Loader from "../../components/Loader";
import Filter from "../../components/Filter";
import { useQueryString } from '../../hooks';
import { useLocation } from "react-router-dom";

export function Home() {
  const { search } = useLocation();
  const { params } = useQueryString();
  const perPage = params.perPage;
  const page = params.startPage;

  const { data: products = [], isLoading } = useGetAllProductsQuery(search ? search : `?startPage=${page}&perPage=${perPage}`);

  if (isLoading) return <Loader/>

  return (
    <>
      <Header />
      <Filter/>
      <ProductList {...products} />
      <BackToTop/>
    </>
  )
}