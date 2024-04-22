import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import HaloShader from "@/components/3d/HaloShader";
import localFont from "next/font/local";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
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

    const topSectionScrollTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: ".topSection",
        start: "top top",
        end: "bottom center",
        scrub: true,
        pin: true,
        markers: true,
      },
      defaults: {
        ease: "power1.in",
        duration: 1.5,
      },
    });

    topSectionScrollTrigger
      .to(".topSection #top_Text1", {
        xPercent: -150,
      })
      .to(
        ".topSection #top_Text2",
        {
          xPercent: 150,
        },
        "<"
      )
      .to(
        ".topSection",
        {
          opacity: 0,
        },
        "<"
      )
      .to(
        ".introSection",
        {
          y: -150,
        },
        "<"
      );
  }, []);

  return (
    <main className="HomePage">
      {/* halo section */}
      <section className={`${myFont.className} topSection`}>
        <HaloShader />
        <div className="nameText" id="top_Text1">
          <p className="para1">FULLSTACK</p>
        </div>
        <div className="nameText" id="top_Text2">
          <p className="para2">DEVELOPER</p>
        </div>
      </section>
      {/* ..... */}

      <section className="introSection">
        <div className="mask">
          <p className="introText">
            Hi, I am Oyeti Oluwatimileyin <span>{`(CHOCOS)`}</span>. A fullstack web developer based in Nigeria. I have spent 4 years
            building several web apps and sites which are scalable, functional and also look goooooooood.
          </p>
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
