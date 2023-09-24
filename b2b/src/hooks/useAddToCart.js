import { useSetCartMutation, useGetCartQuery } from "../store/api/cart.api";

export function useAddToCart() {
  const [setCart] = useSetCartMutation();
  const { data: cart = {} } = useGetCartQuery();

  return async (id, amount) => {
    if (cart?.products.length > 0) {
      const newCart = cart?.products.map(({ product, cartQuantity }) => {
        if (product._id === id) return {
          product: product._id,
          cartQuantity: amount
        }
        return { product: product._id, cartQuantity: cartQuantity }
      });

      if (newCart.every(({ product }) => product !== id)) newCart.push({ product: id, cartQuantity: amount });

      const res = await setCart({ products: newCart }).unwrap();
      console.log(res)
    } else {
      await setCart({ products: { product: id, cartQuantity: amount } }).unwrap();
    }
  }
}