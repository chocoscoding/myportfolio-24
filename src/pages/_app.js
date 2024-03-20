import "@/styles/globals.css";
import localFont from 'next/font/local';

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/Light.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Bold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Semi-bold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Book.otf',
      weight: '900',
      style: 'normal',
    },
  ],
});
export default function App({ Component, pageProps }) {
  return (<main className={myFont.className}>

    <Component {...pageProps} />
  </main>
  );
}
