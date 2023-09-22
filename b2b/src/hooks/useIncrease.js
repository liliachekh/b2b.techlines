import { useAddToCart } from "./useAddToCart";
import { useInCart } from "./useInCart";

export function useIncrease(id, quantity, amount, setAmount) {
  const handleAddToCart = useAddToCart();
  const inCart = useInCart(id);

  return async function increase(plus) {
    try {
      if (inCart) {
        if (plus && quantity > amount) {
          handleAddToCart(id, Number(amount) + 1);
        } else if (!plus) {
          handleAddToCart(id, Number(amount) - 1);
        }
      } else {
        if (plus && quantity > amount) {
          setAmount(Number(amount) + 1);
        } else if (!plus) {
          setAmount(Number(amount) - 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}