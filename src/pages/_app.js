import Navbar from "@/components/Navbar";
import SmoothScrolling from "@/components/SmoothScrolling";
import Transition from "@/components/Transition";
import "@/styles/globals.css";
import localFont from 'next/font/local';
import Image from "next/image";

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: [
    {
      path: "../fonts/ZT/ztravigsfen-regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
});
export default function App({ Component, pageProps }) {
  return (
    <SmoothScrolling>
      <main className={myFont.className}>

        <Image src={`/noise.jpg`} alt="noise bg" className="noise" fill />
        <Transition>
          <Navbar />
          <div className="childrenWrapper">
            <Component {...pageProps} />
          </div>
        </Transition>
      </main>
    </SmoothScrolling>
  );
}
