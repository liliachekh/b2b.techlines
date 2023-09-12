import { Route, Routes } from "react-router-dom";
import { Home, LoginForm, ResetPassword, Cart, Profile, Product } from "../pages";
import { ProfileSettings } from "../components/ProfileSettings";
import { ProfileOrders } from "../components/ProfileOrders";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/:productId" element={<Product />} />
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/password-reset" element={<ResetPassword />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/profile" element={<Profile />}>
        <Route index element={<ProfileSettings />} />
        <Route path="/profile/orders" element={<ProfileOrders />} />
      </Route>
    </Routes>
  );
}