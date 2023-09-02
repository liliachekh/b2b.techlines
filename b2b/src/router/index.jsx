import { Route, Routes } from "react-router-dom";
import { Home } from "../pages";
import { Product } from "../pages/Product";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/product/:productId" element={<Product />} />
    </Routes>
  );
}
