// import style from "./Home.module.scss"
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import { useQueryString } from "../../hooks";
import { useGetAllProductsQuery } from "../../store/api/products.api";

export function Home() {
  const { perPage } = useQueryString();

  const { data: products = [], isLoading } = useGetAllProductsQuery(window.location.search ? window.location.search : `?perPage=${perPage}`);

  if (isLoading) return <h1>Loading</h1>

  return (
    <>
      <Header />
      <ProductList {...products} />
    </>
  )
}