import Navbar from "@/components/Navbar";
import Transition from "@/components/Transition";
import "@/styles/globals.css";
import localFont from 'next/font/local';
import Image from "next/image";

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: [
    {
      path: '../fonts/BrendivaLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/BrendivaBlack.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/BrendivaRegular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/BrendivaMedium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/BrendivaSemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/BrendivaBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/BrendivaExtraBold.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
});
export default function App({ Component, pageProps }) {
  return (<main className={myFont.className}>
    <Image src={`/noise.jpg`} alt="noise bg" className="noise" fill />
    <Transition>

      <Navbar />
      <Component {...pageProps} />
    </Transition>
  </main>
  );
}
