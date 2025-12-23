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
import { SwiperImage } from "../api/types";
import { Autoplay } from "swiper/modules";

type AddSlydesAsyncProps = {
  s: Swiper;
  onSlidesUpdated: (e: Swiper, mockImages: SwiperImage[]) => void;
  onTransitionTimeout: (mockImages: SwiperImage[]) => void;
  onBeforeDisable?: () => void;
};

const SwiperGallery = () => {
  const [images, setImages] = useState(
    adapterImagesWithId(SWIPER_IMAGES.swiperImages)
  );
  const [isLoading, setIsLoading] = useState(false);

  const addSlidesAsync = async ({
    s,
    onBeforeDisable,
    onSlidesUpdated,
    onTransitionTimeout,
  }: AddSlydesAsyncProps) => {
    setIsLoading(true);
    onBeforeDisable?.();

    s.allowTouchMove = false;

    const startLoadTime = performance.now();
    const { mockImages } = await getMoreMockImages(10, SLIDES_COUNT);
    const finishLoadTime = performance.now() - startLoadTime;
    const delayTime =
      finishLoadTime < TRANSITION_SPEED ? TRANSITION_SPEED - finishLoadTime : 0;

    s.once("slidesUpdated", (e) => {
      onSlidesUpdated(e, mockImages);
      s.allowTouchMove = true;
      resetTouchEvent(s);
    });

    setTimeout(() => {
      onTransitionTimeout(mockImages);
      setIsLoading(false);
    }, delayTime);
  };

  const addSlidesAsyncLeft = useCallback(async (s: Swiper) => {
    addSlidesAsync({
      s,
      onBeforeDisable: () => {
        requestAnimationFrame(() => {
          s.slideTo(0, TRANSITION_SPEED, false);
        });
      },
      onSlidesUpdated: (_, mockImages) => {
        s.slideTo(mockImages.length, 0, false);
      },
      onTransitionTimeout: (mockImages) => {
        setImages((prevImages) => [
          ...adapterImagesWithId(mockImages),
          ...prevImages,
        ]);
      },
    });
  }, []);

  const addSlidesAsyncRight = useCallback(async (s: Swiper) => {
    addSlidesAsync({
      s,
      onBeforeDisable: () => {
        requestAnimationFrame(() => {
          s.slideToClosest();
        });
      },
      onSlidesUpdated: () => {
        s.slideTo(s.activeIndex + 1, TRANSITION_SPEED, false);
      },
      onTransitionTimeout: (mockImages) => {
        setImages((prevImages) => [
          ...prevImages,
          ...adapterImagesWithId(mockImages),
        ]);
      },
    });
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
          modules={[Autoplay]}
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
