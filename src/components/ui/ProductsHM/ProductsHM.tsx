import { Swiper, SwiperSlide } from "swiper/react";
import CardProductHM from "../CardProductHM/CardProductHM";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

const ProductsHM = () => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
    >
      <SwiperSlide>
        <CardProductHM producto={""} />
      </SwiperSlide>
    </Swiper>
  );
};

export default ProductsHM;
