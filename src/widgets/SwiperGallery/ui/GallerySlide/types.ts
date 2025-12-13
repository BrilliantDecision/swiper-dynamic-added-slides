import type { IGalleryBlockItem } from '@g2b/shared/api/models'
import { type SwiperSlideProps } from 'swiper/react'

export interface GallerySlideProps extends IGalleryBlockItem {
  id?: string
  slideProps?: SwiperSlideProps
  isLoading?: boolean
}
