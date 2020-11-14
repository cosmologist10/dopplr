const defaultTheme = require('tailwindcss/defaultTheme')
const defaultConfig = require('tailwindcss/defaultConfig')
const tailwindUI = require('@tailwindcss/ui')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },

  purge: ['../src/**/*.tsx', '../src/**/*.ts'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      borderColor: (theme) => ({
        default: theme('colors.gray.200'),
      }),
    },
  },

  variants: defaultConfig.variants,

  plugins: [tailwindUI],
}
