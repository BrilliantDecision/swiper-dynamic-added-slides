import { setDelay } from "@/shared/tools/api/delay";
import { getRandomInteger } from "@/shared/tools/generators/numbers";
import { SWIPER_IMAGES } from "../model/images";

const getMockImages = async (delay: number) => {
  await setDelay(delay);
  return SWIPER_IMAGES;
};

const getMockImage = async (delay: number) => {
  await setDelay(delay);
  const randomImgIndex = getRandomInteger(1, SWIPER_IMAGES.swiperImages.length);
  return SWIPER_IMAGES.swiperImages[randomImgIndex];
};

export { getMockImages, getMockImage };
