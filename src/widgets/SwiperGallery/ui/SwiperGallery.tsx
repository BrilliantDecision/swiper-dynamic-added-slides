import { Container } from "@/shared/ui";
import { Swiper as ReactSwiper } from "swiper/react";
import styles from "./styles.module.scss";

const SwiperGallery = () => {
  return (
    <div className={styles.wrapper}>
      <Container className={styles.blockWrapper}>
        <ReactSwiper
          lazyPreloadPrevNext={5}
          slidesPerView="auto"
          breakpoints={{
            0: {
              spaceBetween: 8,
            },
            768: {
              spaceBetween: 12,
            },
            1024: {
              spaceBetween: 24,
            },
          }}
          // onTransitionEnd={onUpdateNav}
          // onAfterInit={onUpdateNav}
          // {...swiperProps}
        >
          {/* {images.map((image, index) => (
            <GallerySlide
              key={image.id}
              isLoading={isLoading}
              slideProps={{
                onClick: () => onClickSlideMain(index),
              }}
              {...image}
            />
          ))} */}
        </ReactSwiper>
      </Container>
    </div>
  );
};

export { SwiperGallery };
