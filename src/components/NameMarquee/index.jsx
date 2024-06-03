import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

const Index = () => {
  useGSAP(() => {
    let currentScroll = 0;
    let isScrollingDown = true;

    let tween = gsap
      .to(".marquee_part", {
        xPercent: 100,
        repeat: -1,
        duration: 15,
        ease: "linear",
      })
      .totalProgress(0.5);

    gsap.set(".marquee_inner", { xPercent: -50 });

    const handleScroll = () => {
      const newScrollPosition = window.pageYOffset;

      isScrollingDown = newScrollPosition > currentScroll;
      currentScroll = newScrollPosition;

      gsap.to(tween, { timeScale: isScrollingDown ? -1 : 1 });

      if (isScrollingDown) {
        gsap.to(".arrow", { rotate: 0, duration: 0.125, ease: "power1.inOut" });
      } else {
        gsap.to(".arrow", { rotate: 180, duration: 0.125, ease: "power1.inOut" });
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="marquee">
      <div className="marquee_inner">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={`marquee${i}`} className="marquee_part">
              OYETI OLUWATIMILEYIN
              <div className="arrow"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Index;
