interface TouchEventsData {
  isTouched?: boolean
  isMoved?: boolean
  allowTouchCallbacks?: boolean
  touchStartTime?: number
  isScrolling?: boolean
  currentTranslate?: number
  startTranslate?: number
  allowThresholdMove?: boolean
  focusableElements?: string
  lastClickTime: number
  clickTimeout?: number
  velocities: []
  allowMomentumBounce?: boolean
  startMoving?: boolean
  pointerId: number | null
  touchId: number | null
}

export interface SwiperTouchTypes {
  touchEventsData?: TouchEventsData
}
