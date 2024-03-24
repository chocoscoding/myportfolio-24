import "@/styles/globals.css";
import localFont from 'next/font/local';

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: [
    {
      path: '../ff/Light.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../ff/Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../ff/Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../ff/Bold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../ff/Semi-Bold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../ff/Book.otf',
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
