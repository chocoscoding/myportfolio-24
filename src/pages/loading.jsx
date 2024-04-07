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

    const circleTimeline = new gsap.timeline();
    let text = new SplitText(" .nameSpan1", { type: "chars" });
    let text2 = new SplitText(" .nameSpan2", { type: "chars" });
    let text3 = new SplitText(" .nicc", { type: "chars" });
    let nickname = new SplitText(".nick", { type: "words" });
    let chars = text.chars;
    let chars2 = text2.chars;
    let chars3 = text3.chars;

    let nicknameChars = nickname.words;
    gsap.from(nicknameChars, {
      xPercent: -300,
      stagger: 0.05,
      ease: "ease-in-out",
      duration: 1.5,
    });
    gsap.from(chars, {
      yPercent: -300,
      stagger: 0.05,
      ease: "back-out",
      duration: 0.4,
      delay: 1.4,
    });
    gsap.from(chars2, {
      yPercent: -120,
      stagger: 0.05,
      ease: "back-out",
      delay: 1.2,
      duration: 0.4,
    });

    ////

    gsap.fromTo(
      "body",
      {
        backgroundColor: "#444444",
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
          duration: 0.7,
          y: 52,
          ease: "power1.in",
          delay: 0.9,
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
          delay: 0.7,
          duration: 0.7,
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
          delay: 0.5,
          duration: 0.7,
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
          duration: 0.7,
          y: 82,
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
      .to(".nicc", { position: "relative", onComplete: () => deleteNodes({ array: names, exclude: [4] }) })
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
          <p className="nameSpan nickname">CHOCOS</p>
          <p className="nameSpan nickname">CHOCOS</p>

          <p className="nameSpan nickname">CHOCOS</p>
          <p className="nameSpan nickname">CHOCOS</p>
          <p className="nameSpan nickname nicc">CHOCOS</p>
          {/* <div className="circle"></div> */}
        </div>
      </section>

      {/* <section className="nameSection">
        <div className="first">
          <p className="nameSpan nickname">CHOCOS</p>
        </div>
        <div className="second">
          <p className="nameSpan nameSpan1">SOFTWARE</p>
        </div>
        <div className="third">
          <p className="nameSpan nameSpan2">ENGINEER</p>
        </div>
      </section> */}
    </main>
  );
}
