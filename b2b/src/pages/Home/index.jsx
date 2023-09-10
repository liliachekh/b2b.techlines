// import style from "./Home.module.scss"
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import { useGetAllProductsQuery } from "../../store/api/products.api";
import BackToTop from "../../components/BackToTop"
import Loader from "../../components/Loader";
import Filter from "../../components/Filter";
import { useSearchParams } from "react-router-dom";

export function Home() {
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || 25;
  const page = searchParams.get('startPage') || 1;

  const { data: products = [], isLoading } = useGetAllProductsQuery(window.location.search ? window.location.search : `?startPage=${page}&perPage=${perPage}`);

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