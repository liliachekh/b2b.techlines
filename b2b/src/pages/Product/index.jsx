import style from './product.module.scss';
import { useParams } from 'react-router-dom';
import ProductDetails from '../../components/ProductDetails';
import Loader from '../../components/Loader';
import { useGetProductQuery } from '../../store/api/products.api';
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Product() {
  const { productId } = useParams();
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate()
  const { data: product, error, isLoading } = useGetProductQuery(productId);

  if (isLoading) return <Loader />

  if (error?.status === 400) return <h3>Page 404</h3>;

  return (<>
    {loggedIn === false && navigate("/login")}
    <div id='main'>
      <div className={style.productDetails}>
        <div className={style.productDetails__container}>
          <ProductDetails {...product} />
        </div>
      </div>
    </div>
    </>
  )
}