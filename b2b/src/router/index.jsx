import { Route, Routes } from "react-router-dom";
import { Home, LoginForm, ResetPassword, Cart, Profile, Product } from "../pages";
import { ProfileSettings } from "../components/ProfileSettings";
import { ProfileOrders } from "../components/ProfileOrders";
import { MainLayout } from "../pages/MainLayout";
import { AboutUs } from "../pages/AboutUs";
import { Contacts } from "../pages/Contacts";
import { Delivery } from "../pages/Delivery";
import { PrivacyPolicy } from "../pages/PrivacyPolicy";
import { TermsAndConditions } from "../pages/TermsAndConditions";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          <Route index element={<ProfileSettings />} />
          <Route path="/profile/orders" element={<ProfileOrders />} />
        </Route>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
        <Route path="/delivery" element={<Delivery/>}/>
        <Route path="/policy" element={<PrivacyPolicy/>}/>
        <Route path="/terms-and-conditions" element={<TermsAndConditions/>}/>
      </Route>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/password-reset" element={<ResetPassword />} />
    </Routes>
  );
}