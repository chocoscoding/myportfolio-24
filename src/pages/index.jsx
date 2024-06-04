"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import HaloShader from "@/components/3d/HaloShader";
import localFont from "next/font/local";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import CustomEase from "gsap/dist/CustomEase";
import CustomWiggle from "gsap/dist/CustomWiggle";
import { useStore } from "zustand";
import LoadingStore from "@/providers/LoadingStore";
import NameMarquee from "@/components/NameMarquee";
import { BsArrowDown } from "react-icons/bs";
import { BlurScrollEffect } from "@/utils/blur-effect/blurScrollEffect";

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

  const { pauseOtherAnimations: pauseThisAnimation } = useStore(LoadingStore);

  const { contextSafe } = useGSAP({ scope: homePageRef.current });

  const mouseLeaveAnimation = contextSafe((e) => {
    const children = e.currentTarget.children;
    let text = new SplitText(children[0], { type: "chars" });
    let text2 = new SplitText(children[1], { type: "chars" });
    let chars1 = text.chars;
    let chars2 = text2.chars;

    gsap.to(chars1, {
      yPercent: 100,
      stagger: {
        each: 0.01,
        from: "start",
        ease: "linear",
      },
    });
    gsap.to(chars2, {
      yPercent: 100,
      stagger: {
        each: 0.01,
        from: "start",
        ease: "linear",
      },
    });
  });
  const mouseEnterAnimation = contextSafe((e) => {
    const children = e.currentTarget.children;
    //split the elements using gsap splitText
    let text = new SplitText(children[0], { type: "chars" });
    let text2 = new SplitText(children[1], { type: "chars" });
    let chars1 = text.chars;
    let chars2 = text2.chars;

    gsap.to(chars1, {
      yPercent: -100,
      stagger: {
        each: 0.01,
        from: "end",
        ease: "linear",
      },
    });
    gsap.to(chars2, {
      yPercent: -100,
      // delay: 0.1,
      stagger: {
        each: 0.01,
        from: "end",
        ease: "linear",
      },
    });
  });

  useGSAP(
    () => {
      window.scrollTo(0, 0);

      const topSectionScrollTrigger = gsap.timeline({
        scrollTrigger: {
          trigger: ".top_Section",
          start: "top+=25% top",
          end: "bottom center-=5%",
          scrub: true,
          markers: true,
        },
        defaults: {
          ease: "power1.in",
          // duration: 1.5,
        },
      });

      topSectionScrollTrigger.to(".top_Section", {
        scale: 0.8,
        opacity: 0.35,
      });

      const scrollYoyo = gsap.timeline({});

      // Animate the icon to move up and down in a yoyo manner
      scrollYoyo.to(".scroll_icon", {
        y: "12px",
        duration: 0.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      const introSectionScrollTrigger = gsap.timeline({
        scrollTrigger: {
          trigger: ".aboutMe",
          scrub: 2,
        },
        defaults: {
          ease: "power1.in(1.5)",
          duration: 1.5,
        },
      });
      const introTextLineSplit = new SplitText(".introText", { type: "lines,chars" });
      const charsSplit = introTextLineSplit.chars;

      //intro text chars split CS
      const CS1 = charsSplit.slice(0).slice(0, 3);
      const CS3 = charsSplit.slice(0).slice(26, 34);

      introSectionScrollTrigger;

      gsap.to(
        CS1,
        {
          color: "#e6dec6",
          startAt: { filter: "drop-shadow(0px 0px 0px #ffdbf5)" },
          filter: "drop-shadow(0px 0px 20px #ffdbf5)",
          fontSize: () => "+=0.1px",
        },
        "+=2.9"
      );
      gsap.to(CS3, {
        scrollTrigger: {
          trigger: CS3,
        },
        onStart: () => {
          gsap
            .timeline({
              defaults: {
                repeat: 3,
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
      });
    },
    { scope: homePageRef }
  );

  useEffect(() => {
    const spans = document.querySelectorAll(".introText span div");
    spans.forEach((span) => {
      span.classList.add(myFont.className);
    });
    new BlurScrollEffect(document.querySelector(".introText"));
  }, []);

  useGSAP(() => {
    const element1 = document.querySelector(".occup1").children;
    const element2 = document.querySelector(".occup2").children;
    const introTimeline = gsap.timeline({ paused: true });

    introTimeline.from([element1[0], element2[0]], {
      yPercent: -100,
      delay: 0.5,
      stagger: {
        each: 0.01,
        from: "end",
        ease: "linear",
      },
    });
    if (!pauseThisAnimation) {
      introTimeline.play();
    }
  }, [pauseThisAnimation]);

  return (
    <main className="HomePage" ref={homePageRef}>
      {/* halo section */}
      <section className={`top_Section`}>
        <HaloShader />
        <div className={`${myFont.className} nameText`} id="top_Text1">
          <NameMarquee />
        </div>
        <div className="bottom">
          <div className="left">
            <div className="occup1" onMouseLeave={mouseLeaveAnimation} onMouseEnter={mouseEnterAnimation}>
              <p>Fullstack Web</p>
              <p className="secondP">Fullstack Web</p>
            </div>
            <div className="occup2" onMouseLeave={mouseLeaveAnimation} onMouseEnter={mouseEnterAnimation}>
              <p>Developer</p>
              <p className="secondP">Developer</p>
            </div>
          </div>
        </div>
        <div className="bottom2">
          <p className="scroll">scroll</p>
          <BsArrowDown className="scroll_icon" />
        </div>
      </section>
      {/* ..... */}

      <section className="aboutMe">
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
