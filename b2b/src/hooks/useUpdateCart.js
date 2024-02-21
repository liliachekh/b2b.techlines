import { useSetCartMutation, useGetCartQuery } from "../store/api/cart.api";

export function useUpdateCart() {
  const [setCart] = useSetCartMutation();
  const { data: cart = {} } = useGetCartQuery();

  return async (code, discount) => {
    const cartDB = cart?.products.map(({ product, cartQuantity }) => {
      return { product: product._id, cartQuantity: cartQuantity }
    });

    await setCart({ products: cartDB, discount: discount, discountCode: code }).unwrap();
  }
}