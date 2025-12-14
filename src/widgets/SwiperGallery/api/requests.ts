import { setDelay } from "@/shared/tools/api/delay";
import { getRandomInteger } from "@/shared/tools/generators/numbers";
import { SWIPER_IMAGES } from "../model/images";

const getMockImages = async (delay: number) => {
  await setDelay(delay);
  return SWIPER_IMAGES;
};

const getMoreMockImages = async (delay: number, count: number) => {
  await setDelay(delay);
  const mockImages = Array(count)
    .fill(0)
    .map(
      () =>
        SWIPER_IMAGES.swiperImages[
          getRandomInteger(0, SWIPER_IMAGES.swiperImages.length - 1)
        ]
    );
  return { mockImages };
};

export { getMockImages, getMoreMockImages };
