import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import { useGetCartQuery } from "../../store/api/cart.api";

export function Cart() {
  const { data: cart, isLoading } = useGetCartQuery();
  console.log(cart?.products);

  if (isLoading) return <h1>Loading</h1>

  return (
    <>
      <Header />
      {cart?.products?.length > 0 &&
        cart?.products?.map(({product}) => (
          <ProductCard {...product} displayTable={true} key={product?._id} />
        ))}
    </>
  )
}