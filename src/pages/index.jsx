import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import HaloShader from "@/components/3d/HaloShader";
gsap.registerPlugin(SplitText);

export default function Home() {
  return (
    <main>
      <section className="nameSection">
        <HaloShader />
        <div className="second nameText">
          <p className="nameSpan nameSpan1">SOFTWARE</p>
        </div>
        <div className="third nameText">
          <p className="nameSpan nameSpan2">ENGINEER</p>
        </div>
      </section>
      <section className="nameSection">
        <div className="second nameText">
          <p className="nameSpan nameSpan1">SOFTWARE</p>
        </div>
        <div className="third nameText">
          <p className="nameSpan nameSpan2">ENGINEER</p>
        </div>
      </section>
      <section className="nameSection">
        <div className="second nameText">
          <p className="nameSpan nameSpan1">SOFTWARE</p>
        </div>
        <div className="third nameText">
          <p className="nameSpan nameSpan2">ENGINEER</p>
        </div>
      </section>
      <section className="nameSection">
        <div className="second nameText">
          <p className="nameSpan nameSpan1">SOFTWARE</p>
        </div>
        <div className="third nameText">
          <p className="nameSpan nameSpan2">ENGINEER</p>
        </div>
      </section>
      <section className="nameSection">
        <div className="second nameText">
          <p className="nameSpan nameSpan1">SOFTWARE</p>
        </div>
        <div className="third nameText">
          <p className="nameSpan nameSpan2">ENGINEER</p>
        </div>
      </section>
    </main>
  );
}
