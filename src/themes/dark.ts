import common from './common'

export type ThemeType = typeof dark

export const dark = {
  colors: {
    ...common.colors,
    primary: common.colors.grey50,
    secondary: common.colors.grey40,
    tertiary: common.colors.grey30,
    font: '#ffffff',
    shadow: '#000000',
  },
  fonts: {
    ...common.fonts,
  },
}

