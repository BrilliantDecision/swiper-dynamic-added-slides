interface SwiperImage {
  title: string;
  desc?: string;
  link?: string;
  image?: string;
}

interface SwiperResponse {
  swiperImages: SwiperImage[];
}

export type { SwiperImage, SwiperResponse };
