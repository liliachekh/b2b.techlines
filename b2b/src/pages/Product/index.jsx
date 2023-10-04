import style from './product.module.scss';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ProductDetails from '../../components/ProductDetails';
import Loader from '../../components/Loader';
import { useGetProductQuery } from '../../store/api/products.api';
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export function Product() {
  const { productId } = useParams();
  const { loggedIn } = useContext(AuthContext);
  const { data: product, error, isLoading } = useGetProductQuery(productId);
  const navigate = useNavigate();

  if (isLoading) return <Loader />;

  if (error?.status === 400) navigate("/not-found");
  
  if (loggedIn === false) return <Navigate to="/login" />;

  return (
    <div className={style.productDetails}>
      <div className={style.productDetails__container}>
        {product && <ProductDetails {...product} />}
      </div>
    </div>
  )
}