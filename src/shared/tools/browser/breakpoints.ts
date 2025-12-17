export const size = {
  mobile: 767,
  tablet: 1023,
  tabletIpad: 1365,
  hd: 1280,
  netbook: 1439,
  desktop: 1919,
};

export enum Screens {
  desktopMax = 1920,
  desktop = 1440,
  netbook = 1024,
  tablet = 768,
  mobile = 320,
}

export const breakpoints = {
  mobileMin: `(min-width: ${size.mobile + 1}px)`,
  mobileMax: `(max-width: ${size.mobile}px)`,
  tabletMin: `(min-width: ${size.tablet + 1}px)`,
  tabletMax: `(max-width: ${size.tablet}px)`,
  hdMax: `(max-width: ${size.hd}px)`,
  hdMin: `(min-width: ${size.hd + 1}px)`,
  netbookMin: `(min-width: ${size.netbook + 1}px)`,
  netbookMax: `(max-width: ${size.netbook}px)`,
  desktopMin: `(min-width: ${size.desktop + 1}px)`,
  desktopMax: `(max-width: ${size.desktop}px)`,
};
