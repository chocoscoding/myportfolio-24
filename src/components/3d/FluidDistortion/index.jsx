import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import { Wobble } from "@alienkitty/alien.js/three";
import { Sphere } from "@react-three/drei"; // Using Sphere for demonstration

const Scene = () => {
  const [position, setPosition] = useState(new Vector3());

  useEffect(() => {
    const wobble = new Wobble(position);
    wobble.scale = 100;

    const animate = (time) => {
      requestAnimationFrame(animate);
      console.log(position);
      wobble.update(time * 0.001 * 0.5); // seconds * 0.5
      setPosition(wobble.position.clone()); // Update the position state
    };

    animate();

    return () => cancelAnimationFrame(animate); // Cleanup on unmount
  }, [position]);

  return (
    <Canvas style={{ position: "fixed", zIndex: 100 }}>
      <Sphere position={position.toArray()} scale={[0.5, 0.5, 0.5]}>
        <meshStandardMaterial color="orange" />
      </Sphere>
    </Canvas>
  );
};

export default Scene;
