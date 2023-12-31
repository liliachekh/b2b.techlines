// import styles from "./MainLayout.module.scss"
import Header from "../../components/Header";
import BackToTop from "../../components/BackToTop"
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../../components/Footer";

export function MainLayout() {
  const { loggedIn } = useContext(AuthContext);

  if (loggedIn === false) return <Navigate to="/login" />

  return (
    <>
      <Header />
      <div id='main'>
        <Outlet />
      </div>
      <BackToTop />
      <Footer />
    </>
  )
}