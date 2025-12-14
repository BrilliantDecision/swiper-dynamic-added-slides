import type { Swiper } from "swiper/types";

import type { SwiperTouchTypes } from "./types";

const resetTouchEvent = (s: Swiper & SwiperTouchTypes) => {
  s.touchEventsData = {
    isTouched: undefined,
    isMoved: undefined,
    allowTouchCallbacks: undefined,
    touchStartTime: undefined,
    isScrolling: undefined,
    currentTranslate: undefined,
    startTranslate: undefined,
    allowThresholdMove: undefined,
    focusableElements: s.params.focusableElements,
    lastClickTime: 0,
    clickTimeout: undefined,
    velocities: [],
    allowMomentumBounce: undefined,
    startMoving: undefined,
    pointerId: null,
    touchId: null,
  };

  s.touches = {
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    diff: 0,
  };
};

export { resetTouchEvent };
