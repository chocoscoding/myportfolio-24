import Navbar from "@/components/Navbar";
import SmoothScrolling from "@/components/SmoothScrolling";
import Transition from "@/components/Transition";
import "@/styles/globals.css";
import localFont from 'next/font/local';
import Image from "next/image";
import { Lato } from 'next/font/google';

const lato = Lato({ weight: ['100', '300', '400', '700', '900'], subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${lato.style.fontFamily};
        }
      `}</style>
      <SmoothScrolling>
        <Image src={`/noise.webp`} alt="noise bg" className="noise" fill priority loading="eager" />
        <Transition>
          <>
            <Navbar />
            <div className="childrenWrapper">
              <Component {...pageProps} />
            </div>
          </>
        </Transition>
      </SmoothScrolling>
    </>
  );
}
