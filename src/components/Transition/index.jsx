import React, { useEffect, useState } from "react";
import Transition from "./Transition";
import Transition2 from "./Transition2";
import Transition3 from "./Transition3";
import Transition4 from "./Transition4";
import { usePathname } from "next/navigation";

const Index = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      {/* <Transition key={pathname} /> */}
      {/* <Transition2 key={pathname} /> */}
      {/* <Transition3 key={pathname} /> */}
      <Transition4 key={pathname} />
      {children}
    </>
  );
};

export default Index;
