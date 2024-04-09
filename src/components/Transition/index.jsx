import React, { useEffect, useState } from "react";
import Transition from "./Transition";
import { usePathname } from "next/navigation";

const Index = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      <Transition key={pathname} />
      {children}
    </>
  );
};

export default Index;
