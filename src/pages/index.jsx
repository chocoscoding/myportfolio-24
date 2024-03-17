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
    let chars = text.chars;
    let chars2 = text2.chars;

    gsap.from(chars, {
      yPercent: -300,
      stagger: 0.05,
      ease: "back-out",
      duration: 0.4,
    });
    gsap.from(chars2, {
      yPercent: -120,
      stagger: 0.05,
      ease: "back-out",
      delay: 0.4,
      duration: 0.4,
    });
  }, []);
  return (
    <main>
      <section className="nameSection">
        <div className="firstName">
          <p className="nameSpan nameSpan1">Oyeti</p>
        </div>
        <div className="lastName">
          <p className="nameSpan nameSpan2">Timileyin</p>
        </div>
      </section>
    </main>
  );
}
