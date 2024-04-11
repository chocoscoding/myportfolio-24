import React, { useEffect, useState } from "react";
import Transition5 from "./Transition5";
import { usePathname } from "next/navigation";

const Index = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      <Transition5 key={pathname} />
      <div>{children}</div>
    </>
  );
};

export default Index;
