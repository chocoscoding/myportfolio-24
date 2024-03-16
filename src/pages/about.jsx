import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useGSAP } from "@gsap/react";

export default function IndexPage() {
  const boxRef = useRef();

  useGSAP(() => {
    gsap.to(".box", { rotation: "+=360" });
  }, []);

  return (
    <div className="page">
      <h1>About Page</h1>
      <div
        className="box"
        ref={boxRef}>
        About
      </div>
      <div
        className="box"
        ref={boxRef}>
        About
      </div>
      <div
        className="box"
        ref={boxRef}>
        About
      </div>
      <div
        className="box"
        ref={boxRef}>
        About
      </div>
      <div
        className="box"
        ref={boxRef}>
        About
      </div>
      <div
        className="box"
        ref={boxRef}>
        About
      </div>
      <div
        className="box"
        ref={boxRef}>
        About
      </div>
      <div
        className="box"
        ref={boxRef}>
        About
      </div>
      <div
        className="box"
        ref={boxRef}>
        About
      </div>
      <p>
        <Link href="/">Back home</Link>
      </p>
    </div>
  );
}
