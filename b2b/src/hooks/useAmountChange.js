import { useAddToCart } from "./useAddToCart";
import { useInCart } from "./useInCart";

export function useAmountChange(id, quantity, setAmount) {
  const handleAddToCart = useAddToCart();
  const inCart = useInCart(id);

  return function handleAmountChange(e) {
    if (e.target.value > 0 && e.target.value <= quantity) {
      inCart ? handleAddToCart(id, e.target.value) : setAmount(e.target.value);
    }
  }
}