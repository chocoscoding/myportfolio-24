import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import GSDevTools from "gsap/dist/GSDevTools";
import { useRef, useState } from "react";
import localFont from "next/font/local";
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

export default function Transition() {
  const loadingList = [0, 22, 40, 66, 80, 100];
  const [isLoading, setIsLoading] = useState(true);
  const loadingSectionRef = useRef(null);
  const removeLoadingSection = () => {
    const ele = loadingSectionRef.current;
    if (ele) {
      ele.remove();
    }
  };

  useGSAP(
    (context, contextSafe) => {
      gsap.set([".counter_1", ".counter_2", ".counter_3", ".counter_4", ".counter_5"], {
        y: -100,
        x: 25,
        autoAlpha: 0,
      });
      gsap.set(".counter_0", { y: "center", x: 25, autoAlpha: 1 });
      gsap.set(".childrenWrapper", { autoAlpha: 0 });

      const LoadProgress = contextSafe((progress) => {
        console.log(progress);

        gsap.to(`.counter_${progress}`, {
          autoAlpha: 1,
          y: "center",
          x: 25,
          ease: "power1.out(3)",
        });
        gsap.to(`.counter_${progress - 1}`, {
          autoAlpha: 1,
          y: 300,
        });
        if (loadingList.length === progress) {
          //end loading animation and show intro
          gsap.to(`.counter-mask`, {
            display: "none",
          });
          gsap.to(".first", { autoAlpha: 1 });
          setTimeout(() => {
            setIsLoading(false);
            document.querySelector(".counter-mask")?.remove();
          }, 400);
        }
      });

      const names = gsap.utils.toArray(".nickname");

      const textTimeline1 = new gsap.timeline({
          paused: isLoading,
        }),
        textTimeline2 = new gsap.timeline({
          paused: isLoading,
        });
      let text3 = new SplitText(".nicc", { type: "chars" });

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
            duration: 1.45,
            y: 10,
            ease: "back.out(2)",
            stagger: { each: 0.15, from: "start" },
          }
        )
        .fromTo(".nicc", { color: "transparent" }, { delay: 0.15, ease: "power1.in", duration: 1, color: "#ffffff" })
        .to(chars3, {
          onStart: () => {
            chars3[2].classList.add("letter");
            chars3.forEach((ele, i) => (i === 2 ? null : (ele.style.zIndex = -1)));
          },
          scale: 0.8,
          margin: "2%",
          delay: "0.2",
          duration: 1.6,
          each: "power1.in",
        })
        .to(chars3[2], {
          delay: -0.25,
          zIndex: 13,
          scale: "50vw 50vh",
          duration: 1.9,
          ease: "power1.in(2)",
        })
        .to(".loadingSection", { opacity: 0 })
        .to(".childrenWrapper", { autoAlpha: 1, onComplete: removeLoadingSection }, "-=.45")
        .to(".loadingSection", { opacity: 100 });

      const tl1 = setTimeout(() => {
        LoadProgress(0);
      }, 1000 - 500);
      const tl2 = setTimeout(() => {
        LoadProgress(1);
      }, 2000 - 1500);
      const tl3 = setTimeout(() => {
        LoadProgress(2);
      }, 3000 - 1500);
      const tl4 = setTimeout(() => {
        LoadProgress(3);
      }, 4000 - 1500);
      const tl5 = setTimeout(() => {
        LoadProgress(4);
      }, 5000 - 1500);
      const tl6 = setTimeout(() => {
        LoadProgress(5);
      }, 6000 - 1500);
      const tl7 = setTimeout(() => {
        LoadProgress(6);
      }, 7000 - 1500);
      GSDevTools.create({ css: { zIndex: 10000 } });
    },
    [isLoading]
  );

  return (
    <div className={myFont.className}>
      <section
        className="loadingSection"
        ref={loadingSectionRef}>
        <div className="first">
          {Array(1)
            .fill(0)
            .map((_, i) => (
              <p
                className={`nameSpan nickname nicc`}
                key={`loading_nickname${i}`}>
                CHOCOS
              </p>
            ))}
        </div>
        <div className="counter-mask">
          <div className="container">
            {loadingList.map((ele, i) => (
              <h1
                key={"counter_" + i}
                className={`counter counter_${i}`}>
                {ele}
                <span>%</span>
              </h1>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
