import React, { useEffect, useState } from "react";
import Transition5 from "./Transition5";
import { usePathname } from "next/navigation";

const Index = ({ children }) => {
  const [show, setShow] = useState("hide");

  return (
    <>
      <Transition5 setShow={setShow} />
      <div className="transitionChildren">{show === "show" ? <>{children}</> : null}</div>
    </>
  );
};

export default Index;
