import React, { useEffect, useState } from "react";
import Transition4 from "./Transition4";
import { usePathname } from "next/navigation";

const Index = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      <Transition4 key={pathname} />
      <div>{children}</div>
    </>
  );
};

export default Index;
