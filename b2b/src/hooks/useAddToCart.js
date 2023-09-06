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

      await setCart(JSON.stringify({ products: newCart })).unwrap();
    } else {
      await setCart(JSON.stringify({ products: { product: id, cartQuantity: amount } })).unwrap();
    }
  }
}