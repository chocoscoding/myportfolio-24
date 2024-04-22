import React, { useEffect, useState } from "react";
import Transition5 from "./Transition5";
import { usePathname } from "next/navigation";

const Index = ({ children }) => {
  const [show, setShow] = useState("show");

  return (
    <>
      {/* <Transition5 setShow={setShow} /> */}
      {show === "show" ? <div>{children}</div> : null}
    </>
  );
};

export default Index;
