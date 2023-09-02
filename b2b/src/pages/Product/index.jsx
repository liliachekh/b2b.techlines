import style from './product.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../../components/ProductDetails';
import { baseUrl } from '../../utils/vars';
import { useCallback } from 'react';
import { fetchData } from '../../utils';

export function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const productLoad = useCallback(async () => {
    const product = await fetchData(`${baseUrl}products/${productId}`)
    setProduct(product);
  }, [productId, setProduct])

  useEffect(() => {
   productLoad();
  }, [productLoad]);

  return (
    <div id='main'>
      {product &&
        <div className={style.productDetails}>
          <div className={style.productDetails__container}>
            <ProductDetails {...product} />
          </div>
        </div>}
    </div>)
}