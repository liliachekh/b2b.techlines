import './productSlider.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { useState } from 'react';

export default function ProductsSlider({ imageUrls }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className='swiper-container'>
      <Swiper
        modules={[FreeMode, Navigation, Thumbs]}
        spaceBetween={0}
        navigation={true}
        grabCursor={true}
        loop={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className='product-images-slider'
      >
        {imageUrls.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <img src={imageUrl} alt="product-images" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        freeMode={true}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs, FreeMode]}
        className='product-images-slider-thumbs'
      >
        {imageUrls.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <div className="product-images-slider-thumbs-wrapper">
              <img src={imageUrl} alt="images-thumb" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}