import { useGetCustomerQuery } from "../store/api/customers.api";

export function useTierPrice() {
  const { data: customer = {} } = useGetCustomerQuery();

  return (currentPrice) => {
    switch (customer.tier) {
      case 'vip':
        return Math.ceil((Number(currentPrice) + Number(currentPrice) * 0.005) * 100) / 100
      case 'premium':
        return Math.ceil((Number(currentPrice) + Number(currentPrice) * 0.01) * 100) / 100
      case 'beginner':
        return Math.ceil((Number(currentPrice) + Number(currentPrice) * 0.02) * 100) / 100

      default:
        break;
    }
  }
}