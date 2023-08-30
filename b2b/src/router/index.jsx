import { Route, Routes } from "react-router-dom";
import { Home, Cart } from "../pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
    </Routes>
  );
}
