import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color } from "three";
// import "./scene.css";

import vertexShader from "!!raw-loader!./vertexShader.glsl";
import fragmentShader from "!!raw-loader!./fragmentShader.glsl";

const MovingPlane = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_colorA: { value: new Color("#FFE486") },
      u_colorB: { value: new Color("#FEB3D9") },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} wireframe={false} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [1.0, 1.0, 1.0] }}>
      <MovingPlane />
    </Canvas>
  );
};

export default Scene;
