import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import GSDevTools from "gsap/dist/GSDevTools";
import { useRef, useState } from "react";
gsap.registerPlugin(SplitText, GSDevTools);
import localFont from "next/font/local";

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
      // ele.remove();
    }
  };

  useGSAP(() => {
    gsap.set(".childrenWrapper", { autoAlpha: 0 });
    gsap.set([".counter_1", ".counter_2", ".counter_3", ".counter_4", ".counter_5"], {
      y: -100,
      x: 25,
      autoAlpha: 0,
    });
    gsap.set(".counter_0", { y: "center", x: 25, autoAlpha: 1 });

    const LoadProgress = (progress) => {
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
        setTimeout(() => {
          setIsLoading(false);
          document.querySelector(".counter-mask")?.remove();
        }, 400);
      }
    };

    setTimeout(() => {
      LoadProgress(0);
    }, 100);
    setTimeout(() => {
      LoadProgress(1);
    }, 200);
    setTimeout(() => {
      LoadProgress(2);
    }, 300);
    setTimeout(() => {
      LoadProgress(3);
    }, 400);
    setTimeout(() => {
      LoadProgress(4);
    }, 500);
    setTimeout(() => {
      LoadProgress(5);
    }, 600);
    setTimeout(() => {
      LoadProgress(6);
    }, 700);

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
          duration: 1.3,
          y: 10,
          ease: "back.out(2)",
          stagger: { each: 0.15, from: "start" },
        }
      )
      .fromTo(".nicc", { color: "transparent" }, { delay: 0.75, ease: "power1.in", duration: 1, color: "#ffffff" })
      .to([chars3[0], chars3[1], chars3[3], chars3[4], chars3[5]], {
        onStart: () => {
          chars3[2].classList.add("letter");
          chars3.forEach((ele, i) => (i === 2 ? null : (ele.style.zIndex = -1)));
        },
        scale: 0.85,
        delay: "0.2",
        duration: 1.3,
        each: "power1.in",
      })
      .to(chars3[0], {
        x: "350",
        duration: 1,
        opacity: 0,
        ease: "power1.in(2)",
      })
      .to(
        chars3[5],
        {
          x: "-550",
          duration: 1,
          opacity: 0,
          ease: "power1.in(2)",
        },
        "-=1.5"
      )
      .to(
        chars3[1],
        {
          x: "200",
          duration: 0.9,
          opacity: 0,
          ease: "power1.in(2)",
        },
        "-=0.75"
      )
      .to(
        chars3[4],
        {
          x: "-403",
          duration: 0.9,
          opacity: 0,
          ease: "power1.in(2)",
        },
        "-=.95"
      )
      .to(
        chars3[2],
        {
          x: "50",
          duration: 0.75,
          ease: "power1.in(2)",
        },
        "-=.4"
      )
      .to(
        chars3[3],
        {
          x: "-103",
          duration: 0.75,
          opacity: 0,
          ease: "power1.in(2)",
        },
        "-=1"
      )
      .to(chars3[2], {
        delay: -0.3,
        zIndex: 13,
        scale: "40vw 40vh",
        duration: 1.9,
        ease: "power1.in(2)",
      })
      .to(".loadingSection", { opacity: 0 }, "-=1")
      .to(".childrenWrapper", { autoAlpha: 1 }, "-=1")
      .then(removeLoadingSection);
  }, [isLoading]);

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