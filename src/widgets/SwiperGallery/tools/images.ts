import { generateId } from "@/shared/tools/generators/ids";
import { SwiperImage } from "../api/types";

const adapterImagesWithId = (images: SwiperImage[]) => {
  return images.map((img) => ({ ...img, id: generateId() }));
};

export { adapterImagesWithId };
