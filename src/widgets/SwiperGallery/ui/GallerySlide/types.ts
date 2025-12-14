import { type SwiperSlideProps } from "swiper/react";
import { SwiperImage } from "../../api/types";

export interface GallerySlideProps extends SwiperImage {
  id?: string;
  slideProps?: SwiperSlideProps;
  isLoading?: boolean;
}
