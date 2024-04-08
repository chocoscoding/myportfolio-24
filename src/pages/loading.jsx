import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import GSDevTools from "gsap/dist/GSDevTools";
import { useRef, useState } from "react";
gsap.registerPlugin(SplitText, GSDevTools);

export default function Home() {
  const loadingList = [0, 22, 40, 66, 80, 100];
  const [isLoading, setIsLoading] = useState(true);
  useGSAP(() => {
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
    }, 1000);
    setTimeout(() => {
      LoadProgress(1);
    }, 2000);
    setTimeout(() => {
      LoadProgress(2);
    }, 3000);
    setTimeout(() => {
      LoadProgress(3);
    }, 4000);
    setTimeout(() => {
      LoadProgress(4);
    }, 5000);
    setTimeout(() => {
      LoadProgress(5);
    }, 6000);
    setTimeout(() => {
      LoadProgress(6);
    }, 7000);

    const names = gsap.utils.toArray(".nickname");

    console.log(isLoading);
    const textTimeline1 = new gsap.timeline({
        paused: isLoading,
      }),
      textTimeline2 = new gsap.timeline({
        paused: isLoading,
      });
    let text3 = new SplitText(" .nicc", { type: "chars" });

    let chars3 = text3.chars;
    //replace all these with a stagger animation

    textTimeline1
      .fromTo(
        [names[3], names[2], names[1], names[0]],
        {
          autoAlpha: 0,
          y: -400,
          x: 0,
          stagger: 0.12,
        },
        {
          autoAlpha: 1,
          delay: 0.75,
          duration: 1,
          y: 10,
          ease: "back.out(2.5)",
          stagger: 0.12,
        }
      )
      .fromTo([names[3], names[2], names[1], names[0]], { opacity: 20 }, { display: "none" });

    textTimeline2
      .fromTo(
        names[4],
        {
          y: -400,
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.8,
          y: 10,
          ease: "power1.in",
        }
      )
      .to(names[4], { y: 10, delay: 0.15, ease: "power1.in", duration: 1, color: "#e6e6e6" })
      .to(".nicc", { position: "relative", duration: 0.7 })
      .to(chars3, {
        onStart: () => {
          chars3[2].classList.add("letter");
          chars3.forEach((ele, i) => (i === 2 ? null : (ele.style.zIndex = -1)));
        },

        scale: 0.8,
        margin: "0 -3%",
      })
      .to(chars3[2], {
        delay: -0.3,
        zIndex: 3,
        scale: "60vh 60vw",
        duration: 1.5,
        ease: "power1.in",
      })
      .to("loadingSection", { display: "none" });
  }, [isLoading]);

  return (
    <main>
      <section className="loadingSection">
        <div className="first">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <p
                className={`nameSpan nickname${i === 4 ? " nicc" : ""}`}
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
    </main>
  );
}
