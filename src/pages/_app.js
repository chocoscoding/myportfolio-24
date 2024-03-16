import "@/styles/globals.css";
import localFont from 'next/font/local';

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: [
    {
      path: '../fonts/PlainLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/PlainLightItalic.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../fonts/PlainRegular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/PlainRegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/PlainUltrabold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/PlainUltraBoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
});
export default function App({ Component, pageProps }) {
  return (<main className={myFont.className}>

    <Component {...pageProps} />
  </main>
  );
}
