import { useGetCartQuery } from "../store/api/cart.api";

export function useInCart(id) {
  const { data: cart = {} } = useGetCartQuery();

  return cart?.products?.find(({ product }) => product._id === id)
}