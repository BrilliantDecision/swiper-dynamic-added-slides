interface SwiperImage {
  title: string;
  desc?: string;
  link?: string;
  image?: string;
  aspectRatio: string;
}

interface SwiperResponse {
  swiperImages: SwiperImage[];
}

export type { SwiperImage, SwiperResponse };
