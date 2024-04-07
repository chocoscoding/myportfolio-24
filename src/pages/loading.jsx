import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import GSDevTools from "gsap/dist/GSDevTools";
gsap.registerPlugin(SplitText, GSDevTools);

export default function Home() {
  const deleteNodes = ({ exclude = [], array }) => {
    array.forEach((ele, index) => {
      if (!exclude.includes(index)) {
        ele.remove();
      }
    });
  };
  useGSAP(() => {
    const names = gsap.utils.toArray(".nickname");

    const textTimeline1 = new gsap.timeline({}),
      textTimeline2 = new gsap.timeline({}),
      textTimeline3 = new gsap.timeline({}),
      textTimeline4 = new gsap.timeline({}),
      textTimeline5 = new gsap.timeline({});
    let text3 = new SplitText(" .nicc", { type: "chars" });

    let chars3 = text3.chars;

    gsap.fromTo(
      "body",
      {
        backgroundColor: "#484848",
      },
      {
        backgroundColor: "#010101",
        delay: 4.8,
        duration: 0.5,
      }
    );

    textTimeline1
      .fromTo(
        names[0],
        {
          y: -400,
          x: 0,
        },
        {
          duration: 0.6,
          y: 62,
          ease: "power1.in",
          delay: 0.8,
        }
      )
      .to(names[0], { y: 30, delay: 0.25, opacity: 20 });

    textTimeline2
      .fromTo(
        names[1],
        {
          y: -400,
        },
        {
          delay: 0.6,
          duration: 0.6,
          y: 62,
          ease: "power1.in",
        }
      )
      .to(names[1], { y: 30, delay: 0.35, opacity: 40 });

    textTimeline3
      .fromTo(
        names[2],
        {
          y: -400,
        },
        {
          delay: 0.4,
          duration: 0.6,
          y: 72,
          ease: "power1.in",
        }
      )
      .to(names[2], { y: 30, delay: 0.4, opacity: 60 });

    textTimeline4
      .fromTo(
        names[3],
        {
          y: -400,
        },
        {
          delay: 0.2,
          duration: 0.6,
          y: 72,
          ease: "power1.in",
        }
      )
      .to(names[3], { y: 30, delay: 0.4, opacity: 80 });

    textTimeline5
      .fromTo(
        names[4],
        {
          y: -400,
        },
        {
          duration: 0.5,
          y: 30,
          ease: "power1.in",
        }
      )
      .to(names[4], { y: 30, delay: 1.35, ease: "power.in", color: "#e6e6e6" })
      .to(".nicc", { position: "relative", duration: 0.1, onComplete: () => deleteNodes({ array: names, exclude: [4] }) })
      .to("first", { display: "block" })
      .to(chars3, {
        onanimationstart: () => {
          chars3.forEach((ele, i) => (i === 2 ? null : (ele.style.zIndex = -1)));
        },
        scale: 0.8,
        margin: "0 -3%",
      })
      .to(chars3[2], {
        onanimationstart: () => {
          chars3[2].classList.add("letter");
        },
        zIndex: 3,
        scale: 20 + 20 * (window.innerWidth * window.innerHeight * (2 / 10000000)),
        duration: 1,
        ease: "power1.in",
      });
  }, []);

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
      </section>
    </main>
  );
}
