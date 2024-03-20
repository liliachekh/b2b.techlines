// import styles from "./MainLayout.module.scss"
import Header from "../../components/Header";
import BackToTop from "../../components/BackToTop"
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { Modal } from "../../components/Modal";
import { modalProps } from '../../components/Modal/modalProps';

export function MainLayout() {
  const { loggedIn } = useContext(AuthContext);

  const modalType = useSelector((state) => state.modal.modal)
  
  useEffect(() => {
    modalType
      ? document.body.style.overflow = 'hidden'
      : document.body.style.overflow = 'auto';
  }, [modalType])

  if (loggedIn === false) return <Navigate to="/login" />

  return (
    <>
      {modalType && (
        <Modal {...modalProps.find((modal) => modal.type === modalType)} />
      )}
      <Header />
      <div id='main'>
        <Outlet />
      </div>
      <BackToTop />
      <Footer />
    </>
  )
}