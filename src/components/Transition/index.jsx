import React, { useEffect, useState } from "react";
import Transition4 from "./Transition5";
import { usePathname } from "next/navigation";

const Index = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      <Transition4 key={pathname} />
      {children}
    </>
  );
};

export default Index;
