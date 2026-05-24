import localFont from 'next/font/local';

/**
 * Inter Tight — self-hosted через next/font/local (WOFF2).
 * Автопреподключение (preload), display: swap → без FOIT/CLS.
 *
 * Веса 700/800/900 указывают на один файл ExtraBold, чтобы font-bold и
 * font-black (900) использовали реальные жирные глифы, а не синтетический bold.
 */
export const inter = localFont({
  src: [
    { path: './fonts/InterTight-Light.woff2', weight: '400', style: 'normal' },
    { path: './fonts/InterTight-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/InterTight-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/InterTight-ExtraBold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/InterTight-ExtraBold.woff2', weight: '800', style: 'normal' },
    { path: './fonts/InterTight-ExtraBold.woff2', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', 'arial', 'sans-serif'],
  preload: true,
});
