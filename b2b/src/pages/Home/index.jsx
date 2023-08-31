// import style from "./Home.module.scss"
import { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import { fetchData } from "../../utils";
import useQueryString from "../../hooks";
import { baseUrl } from "../../utils/vars";
import Filter from "../../components/Filter";

export function Home() {
  const [products, setProducts] = useState([]);
  const { perPage } = useQueryString();

  const getProducts = useCallback(async () => {
    const data = await fetchData(`${baseUrl}products/filter${window.location.search ? window.location.search : `?perPage=${perPage}`}`);
    setProducts(data);
  }, [perPage])

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProducts, window.location.search])

  return (
    <>
      <Header />
      <Filter/>
      <ProductList {...products} />
    </>
  )
}