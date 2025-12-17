import { Container } from "@/shared/ui";
import { Swiper as ReactSwiper } from "swiper/react";
import styles from "./styles.module.scss";
import { useCallback, useState } from "react";
import { SWIPER_IMAGES } from "../model/images";
import type { Swiper } from "swiper/types";
import { getMoreMockImages } from "../api/requests";
import { SLIDES_COUNT, TRANSITION_SPEED } from "../model/config";
import { resetTouchEvent } from "../tools/resetTouchEvent";
import { adapterImagesWithId } from "../tools/images";
import { GallerySlide } from "./GallerySlide";

/**
 * Два способа подгрузки слайдов
 * во время листания сладера
 * в момент событие transitionEnd, т.е. в момент остановки листания слайдера
 */

const SwiperGallery = () => {
  const [images, setImages] = useState(
    adapterImagesWithId(SWIPER_IMAGES.swiperImages)
  );
  const [isLoading, setIsLoading] = useState(false);

  const addSlidesAsyncLeft = useCallback(async (s: Swiper) => {
    setIsLoading(true);
    s.allowTouchMove = false;

    const prevTranslate = s.translate;

    const startLoadTime = performance.now();
    const { mockImages } = await getMoreMockImages(1000, SLIDES_COUNT);
    const finishLoadTime = performance.now() - startLoadTime;

    s.setTranslate(prevTranslate);

    s.once("slidesUpdated", (s) => {
      s.slideTo(mockImages.length, 0, false);
      s.allowTouchMove = true;
      resetTouchEvent(s);
    });

    const delayTime = finishLoadTime < TRANSITION_SPEED ? finishLoadTime : 0;

    setTimeout(() => {
      setImages((prevImages) => [
        ...adapterImagesWithId(mockImages),
        ...prevImages,
      ]);
      setIsLoading(false);
    }, delayTime);
  }, []);

  const addSlidesAsyncRight = useCallback(async (s: Swiper) => {
    setIsLoading(true);
    s.allowTouchMove = false;

    const startLoadTime = performance.now();
    const { mockImages } = await getMoreMockImages(1000, SLIDES_COUNT);
    const finishLoadTime = performance.now() - startLoadTime;

    s.once("slidesUpdated", (s) => {
      s.slideTo(s.activeIndex + 1, TRANSITION_SPEED, false);
      s.allowTouchMove = true;
      resetTouchEvent(s);
    });

    const delayTime = finishLoadTime < TRANSITION_SPEED ? finishLoadTime : 0;

    setTimeout(() => {
      setImages((prevImages) => [
        ...prevImages,
        ...adapterImagesWithId(mockImages),
      ]);
      setIsLoading(false);
    }, delayTime);
  }, []);

  const onReachBeginning = (s: Swiper) => {
    addSlidesAsyncLeft(s);
  };

  const onReachEnd = (s: Swiper) => {
    addSlidesAsyncRight(s);
  };

  return (
    <div className={styles.wrapper}>
      <Container className={styles.blockWrapper}>
        <ReactSwiper
          initialSlide={2}
          lazyPreloadPrevNext={5}
          slidesPerView="auto"
          onReachBeginning={onReachBeginning}
          onReachEnd={onReachEnd}
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
        >
          {images.map((image) => (
            <GallerySlide key={image.id} isLoading={isLoading} {...image} />
          ))}
        </ReactSwiper>
      </Container>
    </div>
  );
};

export { SwiperGallery };
