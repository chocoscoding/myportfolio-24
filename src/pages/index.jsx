import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
gsap.registerPlugin(SplitText);

export default function Home() {
  return (
    <main>
      <section className="nameSection">
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
