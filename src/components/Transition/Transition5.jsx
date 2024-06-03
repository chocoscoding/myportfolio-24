import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import GSDevTools from "gsap/dist/GSDevTools";
import { useEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import { useStore } from "zustand";
import LoadingStore from "@/providers/LoadingStore";
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
  const { pauseAnimation, playAnimation } = useStore(LoadingStore);

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
          duration: 1.4,
          y: 10,
          ease: "back.out(2)",
          stagger: { each: 0.15, from: "start" },
        }
      )
      .fromTo(".nickname", { color: "transparent" }, { delay: 0.15, ease: "power1.in", duration: 1.1, color: "#e6dec6" })
      .to(chars3, {
        yPercent: 200,
        autoAlpha: 1,
        duration: 1.1,
        ease: "power1.in(2)",
        stagger: { each: 0.02, from: "center" },
      })

      .to(loadingSectionRef.current, {
        delay: -0.15,
        yPercent: 200,
        duration: 2.8,
        ease: "power1.out(3)",
        onStart: () => {
          playAnimation();
        },
        onComplete: () => {
          setShow("show");
          document.querySelector(".loadingSection").remove();
        },
      });

    const tl1 = setTimeout(() => {
      LoadProgress(0);
    }, 100);
    const tl2 = setTimeout(() => {
      LoadProgress(1);
    }, 200);
    const tl3 = setTimeout(() => {
      LoadProgress(2);
    }, 300);
    const tl4 = setTimeout(() => {
      LoadProgress(3);
    }, 400);
    const tl5 = setTimeout(() => {
      LoadProgress(4);
    }, 500);
    const tl6 = setTimeout(() => {
      LoadProgress(5);
    }, 600);
    const tl7 = setTimeout(() => {
      LoadProgress(6);
    }, 700);

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
      <div className={myFont.className} style={{ overflow: "hidden" }}>
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
