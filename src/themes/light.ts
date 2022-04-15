import common from './common'

export type ThemeType = typeof light

export const light = {
  colors: {
    ...common.colors,
    primary: common.colors.grey10,
    secondary: common.colors.grey20,
    tertiary: common.colors.grey30,
    font: common.colors.grey50,
    shadow: '#efefef',
  },
  fonts: {
    ...common.fonts,
  },
}

