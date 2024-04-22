import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import HaloShader from "@/components/3d/HaloShader";
import localFont from "next/font/local";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";
import CustomEase from "gsap/dist/CustomEase";
import CustomWiggle from "gsap/dist/CustomWiggle";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, CustomWiggle);
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
  const homePageRef = useRef();
  useGSAP(
    () => {
      window.scrollTo(0, 0);
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
          end: "+=1400",
          scrub: true,
          pin: true,
          pinSpacing: true,
          // markers: true,
        },
        defaults: {
          ease: "power1.in",
          // duration: 1.5,
        },
      });

      topSectionScrollTrigger
        .to(".topSection #top_Text1", {
          xPercent: -150,
          duration: 1.5,
        })
        .to(
          ".topSection #top_Text2",
          {
            duration: 1.5,
            xPercent: 150,
          },
          "<"
        )
        .to(
          ".topSection",
          {
            delay: 0.9,
            opacity: 0,
          },
          "<"
        )
        .to(
          ".introSection",
          {
            yPercent: -160,
          },
          "<"
        );

      const introSectionScrollTrigger = gsap.timeline({
        scrollTrigger: {
          trigger: ".introSection",
          start: "top-=110% center",
          end: "+=1010",
          scrub: 2,
          pin: true,
          pinSpacing: false,
          // markers: true,
        },
        defaults: {
          ease: "power1.in(1.5)",
          duration: 1.5,
        },
      });
      const introTextLineSplit = new SplitText(".introText", { type: "lines,chars" });
      const lineSplit = introTextLineSplit.lines;
      const charsSplit = introTextLineSplit.chars;

      //intro text chars split CS
      const CS1 = charsSplit.slice(0).slice(0, 3);
      const CS2 = charsSplit.slice(0).slice(3, 26);
      const CS3 = charsSplit.slice(0).slice(26, 34);
      const CS4 = charsSplit.slice(0).slice(35, charsSplit.length - 1);
      const CS5 = charsSplit.slice(0).slice(0, charsSplit.length - 1);
      const CS6 = charsSplit.slice(0)[charsSplit.length - 1];
      introSectionScrollTrigger
        .from(lineSplit, {
          y: 400,
          opacity: 0,
          skewX: 50,
          // duration: 2,
          stagger: 0.3,
          ease: "circ.out(1.5)",
        })
        .to(
          CS1,
          {
            color: "#e6dec6",
            startAt: { filter: "drop-shadow(0px 0px 0px #ffdbf5)" },
            filter: "drop-shadow(0px 0px 20px #ffdbf5)",
            fontSize: () => "+=0.1px",
          },
          "+=2.9"
        )
        .to(
          CS2,
          {
            color: "#e6dec6",
            stagger: 0.3,
            fontSize: () => "+=0.1px",
          },
          "+=1.1"
        )
        .to(CS3, {
          onStart: () => {
            gsap
              .timeline({
                defaults: {
                  repeat: 2,
                  yoyo: true,
                  yoyoEase: true,
                  // repeatDelay: 0.5,
                },
              })
              .to(CS3, {
                y: -10,
              })
              .to(CS3, {
                y: 0,
              });
          },
          color: "#0cd16b",
          startAt: { filter: "drop-shadow(0px 0px 0px #99f1c4)" },
          filter: "drop-shadow(0px 0px 20px #0cd16b)",
        })
        .to(CS4, {
          delay: 0.9,
          color: "#e6dec6",
          stagger: 0.3,
          fontSize: () => "+=0.1px",
        })
        .to(CS5, {
          opacity: 0.01,
        })
        .to(CS6, {
          color: "#e6dec6",
          scale: 20,
          opacity: 1,
        })
        .to(
          CS6,
          {
            xPercent: -3000,
            yPercent: 100,
            opacity: 0,
          },
          "<"
        );

      const spans = document.querySelectorAll(".introText span div");
      spans.forEach((span) => {
        span.classList.add(myFont.className);
      });
    },
    { scope: homePageRef },
    []
  );

  // stagger: 0.06,
  // opacity: 0,
  // scale: 0.8,
  return (
    <main className="HomePage" ref={homePageRef}>
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
        <div className="">
          <p className="introText">
            Hi,👋 <br /> I am Oyeti Oluwatimileyin <span>{`{CHOCOS}`}</span>. A fullstack web developer based in Nigeria. I have spent 4
            years building several web apps and sites which are scalable, functional and also look goooooooood. based in Nigeria. I have
            spent 4 years building several web apps and sites which are scalable, functional and also look goooooooood.
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
