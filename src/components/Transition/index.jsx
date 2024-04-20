import React, { useEffect, useState } from "react";
import Transition5 from "./Transition5";
import { usePathname } from "next/navigation";

const Index = ({ children }) => {
  const pathname = usePathname();
  const [show, setShow] = useState("show");

  useEffect(() => {
    setShow("hide");
  }, [pathname]);
  return (
    <>
      <Transition5 key={pathname} setShow={setShow} />
      {show === "show" ? <div>{children}</div> : null}
    </>
  );
};

export default Index;
