import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import HaloShader from "@/components/3d/HaloShader";
import localFont from "next/font/local";

const myFont = localFont({
  src: [
    {
      path: "../fonts/ZT/ztravigsfen-alternate.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

gsap.registerPlugin(SplitText);

export default function Home() {
  useGSAP(() => {
    const topSectionTimeline = gsap.timeline({});

    topSectionTimeline
      .fromTo(
        "#top_Text1 p",
        {
          yPercent: 300,
        },
        {
          yPercent: 10,
          duration: 1.3,
          ease: "power1.out(0.5)",
        }
      )
      .from(
        "#top_Text2 p",
        {
          yPercent: -300,
          ease: "power1.out(0.5)",
          duration: 1.3,
        },
        "<"
      );
  }, []);
  return (
    <main className="HomePage">
      <section className={`${myFont.className} topSection`}>
        <HaloShader />
        <div className="nameText" id="top_Text1">
          <p className="para1">SOFTWARE</p>
        </div>
        <div className="nameText" id="top_Text2">
          <p className="para2">ENGINEER</p>
        </div>
      </section>
      <section className="nameSection">
        <div className="second nameText">
          <p className="nameSpan nameSpan1">SOFTWARE</p>
        </div>
        <div className="third nameText">
          <p className="nameSpan nameSpan2">ENGINEER</p>
        </div>
      </section>
      <section className="nameSection">
        <div className="second nameText">
          <p className="nameSpan nameSpan1">SOFTWARE</p>
        </div>
        <div className="third nameText">
          <p className="nameSpan nameSpan2">ENGINEER</p>
        </div>
      </section>
      <section className="nameSection">
        <div className="second nameText">
          <p className="nameSpan nameSpan1">SOFTWARE</p>
        </div>
        <div className="third nameText">
          <p className="nameSpan nameSpan2">ENGINEER</p>
        </div>
      </section>
      <section className="nameSection">
        <div className="second nameText">
          <p className="nameSpan nameSpan1">SOFTWARE</p>
        </div>
        <div className="third nameText">
          <p className="nameSpan nameSpan2">ENGINEER</p>
        </div>
      </section>
    </main>
  );
}
