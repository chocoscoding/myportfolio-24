import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
gsap.registerPlugin(SplitText);
import React, { useRef, useState } from "react";
import { TbWorld } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { useGSAP } from "@gsap/react";

const myFont = localFont({
  src: [
    {
      path: "../fonts/ZT/ztravigsfen-alternate.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: navRef.current });
  const openNavAnimation = contextSafe(() => {
    gsap.to("ul", {
      x: 0,
      opacity: 100,
      ease: "power1.out",
      onStart: () => {
        //make color blen normal for dropdown
        navRef.current.style.mixBlendMode = "normal";
      },
    });
    gsap.from("li", {
      delay: 0.2,
      x: 190,
      ease: "power1.out(2)",
      stagger: 0.04,
    });
  });
  const closeNavAnimation = contextSafe(() => {
    gsap.to("ul", {
      x: "100%",
      opacity: 0,
      ease: "power1.in",
      onComplete: () => {
        //revert color blend
        navRef.current.style.mixBlendMode = "difference";
      },
    });
  });

  const toggleNav = () => {
    setNavOpen((prev) => !prev);

    if (navOpen) {
      //if nav was open
      closeNavAnimation();
    } else {
      //if nav was closed
      openNavAnimation();
    }
  };

  const mouseLeaveAnimation = contextSafe((e) => {
    const children = e.currentTarget.children;
    let text = new SplitText(children[0], { type: "chars" });
    let text2 = new SplitText(children[1], { type: "chars" });
    let chars1 = text.chars;
    let chars2 = text2.chars;

    gsap.to(chars1, {
      yPercent: 100,
      stagger: {
        each: 0.04,
        from: "start",
        ease: "power1.out",
      },
      duration: 0.25,
      // delay: 0.1,
    });
    gsap.to(chars2, {
      yPercent: 100,
      stagger: {
        each: 0.04,
        from: "start",
        ease: "power1.out",
      },
      duration: 0.2,
    });
  });
  const mouseEnterAnimation = contextSafe((e) => {
    const children = e.currentTarget.children;
    //split the elements using gsap splitText
    let text = new SplitText(children[0], { type: "chars" });
    let text2 = new SplitText(children[1], { type: "chars" });
    let chars1 = text.chars;
    let chars2 = text2.chars;

    gsap.to(chars1, {
      yPercent: -100,
      stagger: {
        each: 0.04,
        from: "end",
        ease: "power1.in",
      },
      duration: 0.2,
    });
    gsap.to(chars2, {
      yPercent: -100,
      // delay: 0.1,
      stagger: {
        each: 0.04,
        from: "end",
        ease: "power1.in",
      },
      duration: 0.25,
    });
  });

  const menuItems = [
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={navOpen ? "navOpen" : ""}
      ref={navRef}>
      <div className="wrapper">
        <Link href={"/"}>
          <text className={`chocos ${myFont.className}`}>CHOCOS</text>
        </Link>

        <div className="location">
          {/* globe icon */}
          <TbWorld className="icon" />
          <p>LAGOS, NG</p>
        </div>

        <ul>
          {menuItems.map((item, index) => (
            <Link
              key={"navLink" + index}
              href={item.href}>
              <li
                key={"navLi" + index}
                onMouseLeave={mouseLeaveAnimation}
                onMouseEnter={mouseEnterAnimation}>
                <p>{item.label}</p>
                <p className="secondP">{item.label}</p>
              </li>
            </Link>
          ))}
        </ul>

        <hr />
        <RxHamburgerMenu
          onClick={toggleNav}
          className="hamburger"
        />
      </div>
    </nav>
  );
};

export default Navbar;
