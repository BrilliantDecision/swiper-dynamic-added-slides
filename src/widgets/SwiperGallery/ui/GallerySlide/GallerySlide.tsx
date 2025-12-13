import { ConditionalRender, Img } from "@g2b/shared/components";
import { useMediaQuery } from "@g2b/shared/hooks";
import { computeSlideSizes } from "@g2b/shared/modules/ContentPage/helpers/computeSlideWidth";
import { colors } from "@g2b/shared/utils/constants";
import classNames from "classnames";
import { useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { SwiperSlide } from "swiper/react";

import styles from "./styles.module.scss";
import type { GallerySlideProps } from "./types";

export const SLIDE_HEIGHT_DESKTOP = 480;
export const SLIDE_HEIGHT_TABLET = 360;
export const SLIDE_HEIGHT_MOBILE = 160;

export const GallerySlide = ({
  image,
  caption,
  slideProps,
  isLoading,
  aspectRatio,
  id,
}: GallerySlideProps) => {
  const { className, ...restSlideProps } = slideProps || {};
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const mediaMobile = useMediaQuery("mobileMax");
  const mediaTablet = useMediaQuery("tabletMax");

  const slideHeight = useMemo(() => {
    if (!mediaTablet && !mediaMobile) {
      return SLIDE_HEIGHT_TABLET;
    } else if (navigator.maxTouchPoints > 1 && mediaTablet) {
      return SLIDE_HEIGHT_TABLET;
    } else if (mediaTablet && !mediaMobile) {
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
        <Img
          image={image}
          className={classNames(styles.slideImage, {
            [styles.slideImageAppear]: isImgLoaded,
          })}
          loading="lazy"
          onLoad={() => setIsImgLoaded(true)}
        />
        <div className="swiper-lazy-preloader"></div>
        <ConditionalRender condition={!!isLoading}>
          <Skeleton
            height="100%"
            width="100%"
            containerClassName={classNames(styles.skeletonImgWrapper, {
              [styles.skeletonImgWrapperAppear]: isLoading,
            })}
            className={styles.skeletonImg}
            baseColor={colors["$natural-3"]}
          />
        </ConditionalRender>
        <ConditionalRender condition={!!caption}>
          <div className={styles.captionWrapper}>
            <p className={styles.captionText}>{caption}</p>
          </div>
        </ConditionalRender>
      </div>
    </SwiperSlide>
  );
};

GallerySlide.displayName = "SwiperSlide";
