import style from './product.module.scss';
import { Navigate, useParams } from 'react-router-dom';
import ProductDetails from '../../components/ProductDetails';
import Loader from '../../components/Loader';
import { useGetProductQuery } from '../../store/api/products.api';
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export function Product() {
  const { productId } = useParams();
  const { loggedIn } = useContext(AuthContext);
  const { data: product, error, isLoading } = useGetProductQuery(productId);

  if (isLoading) return <Loader />

  if (error?.status === 400) return <Navigate to='/not-found' />;
  
  if (loggedIn === false) return <Navigate to="/login" />

  return (
    <div id='main'>
      <div className={style.productDetails}>
        <div className={style.productDetails__container}>
          <ProductDetails {...product} />
        </div>
      </div>
    </div>
  )
}