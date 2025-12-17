import classNames from "classnames";
import { useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { SwiperSlide } from "swiper/react";

import styles from "./styles.module.scss";
import type { GallerySlideProps } from "./types";
import { computeSlideSizes } from "../../tools/computeSlideWidth";
import { useMediaQuery } from "@/shared/tools/hooks/useMediaQuery";

export const SLIDE_HEIGHT_DESKTOP = 480;
export const SLIDE_HEIGHT_TABLET = 360;
export const SLIDE_HEIGHT_MOBILE = 160;

export const GallerySlide = ({
  slideProps,
  isLoading,
  id,
  image,
  aspectRatio,
}: GallerySlideProps) => {
  const { className, ...restSlideProps } = slideProps || {};
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const mediaMobile = useMediaQuery("mobileMax");
  const mediaTablet = useMediaQuery("tabletMax");

  const slideHeight = useMemo(() => {
    if (mediaTablet) {
      return SLIDE_HEIGHT_TABLET;
    } else if (mediaMobile) {
      return SLIDE_HEIGHT_MOBILE;
    }

    return SLIDE_HEIGHT_DESKTOP;
  }, [mediaMobile, mediaTablet]);

  const slideWidth = useMemo(
    () => computeSlideSizes({ aspectRatio, slideHeight }),
    [aspectRatio, slideHeight]
  );

  return (
    <SwiperSlide
      data-id={id}
      style={{ width: slideWidth }}
      className={classNames(styles.slide, className)}
      {...restSlideProps}
    >
      <div className={styles.imageWrapper}>
        <img
          src={image}
          className={classNames(styles.slideImage, {
            [styles.slideImageAppear]: isImgLoaded,
          })}
          loading="lazy"
          onLoad={() => setIsImgLoaded(true)}
        />
        <div className="swiper-lazy-preloader"></div>
        {isLoading ? (
          <Skeleton
            height="100%"
            width="100%"
            containerClassName={classNames(styles.skeletonImgWrapper, {
              [styles.skeletonImgWrapperAppear]: isLoading,
            })}
            className={styles.skeletonImg}
            baseColor={"#fafafa"}
          />
        ) : null}
      </div>
    </SwiperSlide>
  );
};

GallerySlide.displayName = "SwiperSlide";
