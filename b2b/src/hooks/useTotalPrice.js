import { useGetCartQuery } from "../store/api/cart.api";
import { useTierPrice } from "./useTierPrice";

export function useTotalPrice() {
  const { data: cart = {} } = useGetCartQuery();
  const tierPrice = useTierPrice();

  const totalPrice = Number(cart?.products
    ?.map(({ product: { currentPrice }, cartQuantity }) => tierPrice(currentPrice) * cartQuantity)
    ?.reduce((prev, next) => prev + next)
    .toFixed(2));

  const deliveryPrice = totalPrice - (cart?.discount || 0) > 2500 ? 0 : 35;

  const totalPriceDiscount = (totalPrice - (cart?.discount || 0) + deliveryPrice).toFixed(2);


  return {
    totalPrice,
    // totalPrice: totalPrice > 2500 ? totalPrice : totalPrice + 35,
    totalPriceByCard: (Number(totalPriceDiscount)* 1.017).toFixed(2),
    deliveryPrice,
    totalPriceDiscount
  }
}