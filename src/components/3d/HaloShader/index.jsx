import { Canvas } from "@react-three/fiber";
import Mesh from "./Mesh";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Scene = () => {
  useGSAP(() => {
    gsap.from(".halo-canvas", {
      opacity: 0,
      delay: 0.1,
      duration: 1.1,
      ease: "power1.in",
    });
  }, []);
  return (
    <Canvas className="halo-canvas" camera={{ position: [0.0, 0.0, 8.0] }}>
      <Mesh />
    </Canvas>
  );
};

export default Scene;
