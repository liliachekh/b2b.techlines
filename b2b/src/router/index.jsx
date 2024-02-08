import { Route, Routes } from "react-router-dom";
import { Home, LoginForm, ResetPassword, Cart, Profile, Product, Order, NotFound } from "../pages";
import { ProfileSettings } from "../components/ProfileSettings";
import { ProfileOrders } from "../components/ProfileOrders";
import { MainLayout } from "../pages/MainLayout";
import { AboutUs } from "../pages/AboutUs";
import { Contacts } from "../pages/Contacts";
import { Delivery } from "../pages/Delivery";
import { PrivacyPolicy } from "../pages/PrivacyPolicy";
import { TermsAndConditions } from "../pages/TermsAndConditions";
import { CookiePolicy } from "../pages/CookiePolicy";
import { ProfileShipping } from "../components/ProfileShipping";
import { Payment3DS } from "../components/Payment3DS";

export default function Router() {
  return (
    <Routes>
      <Route path="/payment3DS" element={<Payment3DS />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="/:productId" element={<Product />} /> */}
        {/* <Route path="/product" > */}
          <Route path="/product/:productId" element={<Product />} />
        {/* </Route> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment" element={<Payment3DS />} />
        <Route path="/profile" element={<Profile />}>
          <Route index element={<ProfileSettings />} />
          <Route path="/profile/orders" element={<ProfileOrders />} />
          <Route path="/profile/shipping" element={<ProfileShipping />} />
        </Route>
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Route>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/password-reset" element={<ResetPassword />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}