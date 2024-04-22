import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import GSDevTools from "gsap/dist/GSDevTools";
import { useEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
gsap.registerPlugin(SplitText, GSDevTools);

const myFont = localFont({
  src: [
    {
      path: "../../fonts/ZT/ztravigsfen-alternate.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

export default function Transition({ children, setShow }) {
  const loadingList = [0, 22, 40, 66, 80, 100];
  const [isLoading, setIsLoading] = useState(true);
  const loadingSectionRef = useRef(null);

  const textTimeline2 = new gsap.timeline({
    paused: isLoading,
  });

  useGSAP(() => {
    gsap.set([".counter_1", ".counter_2", ".counter_3", ".counter_4", ".counter_5"], {
      y: -100,
      x: 25,
      autoAlpha: 0,
    });
    gsap.set(".counter_0", { y: "center", x: 25, autoAlpha: 1 });
    // gsap.set(".transitionChildren", { autoAlpha: 0 });

    const LoadProgress = (progress) => {
      gsap.to(`.counter_${progress}`, {
        autoAlpha: 1,
        y: "center",
        x: 25,
        ease: "power1.out(3)",
      });
      gsap.to(`.counter_${progress - 1}`, {
        autoAlpha: 1,
        yPercent: 200,
      });
      if (loadingList.length === progress) {
        //end loading animation and show intro
        gsap.to(`.counter-mask`, {
          display: "none",
        });
        gsap.to(".first", { autoAlpha: 1 });
        setTimeout(() => {
          textTimeline2.restart();
          document.querySelector(".counter-mask")?.remove();
        }, 400);
      }
    };

    let text3 = new SplitText(".nickname", { type: "chars" });

    let chars3 = text3.chars;

    textTimeline2
      .fromTo(
        chars3,
        {
          y: -400,
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 1.35,
          y: 10,
          ease: "back.out(2)",
          stagger: { each: 0.15, from: "start" },
        }
      )
      .fromTo(".nickname", { color: "transparent" }, { delay: 0.15, ease: "power1.in", duration: 1, color: "#e6dec6" })
      .to(chars3, {
        onStart: () => {
          chars3[2].classList.add("letter");
          chars3.forEach((ele, i) => (i === 2 ? null : (ele.style.zIndex = -1)));
        },
        scale: 0.8,
        // margin: "2%",
        delay: "0.2",
        duration: 1.25,
        each: "power1.in",
      })
      .to(chars3[0], {
        xPercent: 200,
        duration: 1,
        opacity: 0,
        ease: "power1.in(2)",
      })
      .to(
        chars3[5],
        {
          xPercent: -367.5,
          duration: 1,
          opacity: 0,
          ease: "power1.in(2)",
        },
        "<"
      )
      .to(
        chars3[1],
        {
          xPercent: 100,
          duration: 0.75,
          opacity: 0,
          ease: "power1.in(2)",
        },
        "-=.5"
      )
      .to(
        chars3[4],
        {
          xPercent: -150.25,
          duration: 0.75,
          opacity: 0,
          ease: "power1.in(2)",
        },
        "<"
      )
      .to(
        chars3[2],
        {
          xPercent: 40,
          duration: 0.7,
          ease: "power1.in(2)",
        },
        "-=.5"
      )
      .to(
        chars3[3],
        {
          xPercent: -80,
          duration: 0.7,
          opacity: 0,
          ease: "power1.in(2)",
        },
        "<"
      )
      .to(chars3[2], {
        delay: 0.08,
        zIndex: 13,
        scale: "53vw 53vh",
        duration: 1.5,
        ease: "power1.in(2)",
      })
      .to(
        ".loadingSection",
        {
          opacity: 0,
          onStart: () => {
            setShow("show");
          },
          onComplete: () => {
            document.querySelector(".loadingSection").remove();
          },
        },
        "-=0.9"
      );

    const tl1 = setTimeout(() => {
      LoadProgress(0);
    }, 1000);
    const tl2 = setTimeout(() => {
      LoadProgress(1);
    }, 2000);
    const tl3 = setTimeout(() => {
      LoadProgress(2);
    }, 3000);
    const tl4 = setTimeout(() => {
      LoadProgress(3);
    }, 4000);
    const tl5 = setTimeout(() => {
      LoadProgress(4);
    }, 5000);
    const tl6 = setTimeout(() => {
      LoadProgress(5);
    }, 6000);
    const tl7 = setTimeout(() => {
      LoadProgress(6);
    }, 7000);

    return () => {
      clearTimeout(tl1);
      clearTimeout(tl2);
      clearTimeout(tl3);
      clearTimeout(tl4);
      clearTimeout(tl5);
      clearTimeout(tl6);
      clearTimeout(tl7);
    };
  }, [isLoading]);

  return (
    <>
      <div className={myFont.className}>
        <section className="loadingSection" ref={loadingSectionRef}>
          <div className="first">
            {Array(1)
              .fill(0)
              .map((_, i) => (
                <p className={`nameSpan nickname`} key={`loading_nickname${i}`}>
                  CHOCOS
                </p>
              ))}
          </div>
          <div className="counter-mask">
            <div className="container">
              {loadingList.map((ele, i) => (
                <h1 key={"counter_" + i} className={`counter counter_${i}`}>
                  {ele}
                  <span>%</span>
                </h1>
              ))}
            </div>
          </div>
        </section>
      </div>
      {children}
    </>
  );
}
