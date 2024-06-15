import tailwindForms from '@tailwindcss/forms';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.{html,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      white: '#FFFFFF',
      gray: {
        100: '#374151',
        200: '#6B7280',
        300: '#9CA3AF',
        400: '#D1D5DB',
        600: '#E5E7EB',
        700: '#F3F4F6',
      },
      red: {
        200: '#DD1C1A',
        300: '#FEEBEB',
      },
      green: {
        100: '#059669',
        200: '#10B981',
        300: '#ECFDF5',
      },
    },
  },
  plugins: [tailwindForms],
};
