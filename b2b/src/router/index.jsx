import { Route, Routes } from "react-router-dom";
import { Home, LoginForm, ResetPassword, Cart, Product } from "../pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/password-reset" element={<ResetPassword />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
    </Routes>
  );
}