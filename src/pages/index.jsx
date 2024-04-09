import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
gsap.registerPlugin(SplitText);

export default function Home() {
  const nameSectionTl = new gsap.timeline();
  const nameSectionTl2 = new gsap.timeline();
  useGSAP(() => {
    let text = new SplitText(" .nameSpan1", { type: "chars" });
    let text2 = new SplitText(" .nameSpan2", { type: "chars" });
    let nickname = new SplitText(".nickname", { type: "words" });
    let chars = text.chars;
    let chars2 = text2.chars;
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
      delay: 1.8,
      duration: 0.4,
    });
  }, []);
  return (
    <main>
      <section className="nameSection">
        <div className="first">
          <p className="nameSpan nickname">CHOCOS</p>
        </div>
        <div className="second">
          <p className="nameSpan nameSpan1">SOFTWARE</p>
        </div>
        <div className="third">
          <p className="nameSpan nameSpan2">ENGINEER</p>
        </div>
      </section>
      <section className="nameSection">
        <div className="first">
          <p className="nameSpan nickname">CHOCOS</p>
        </div>
        <div className="second">
          <p className="nameSpan nameSpan1">SOFTWARE</p>
        </div>
        <div className="third">
          <p className="nameSpan nameSpan2">ENGINEER</p>
        </div>
      </section>
    </main>
  );
}
