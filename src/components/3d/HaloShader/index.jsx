import { OrbitControls, useAspect } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { MathUtils, Vector2 } from "three";

import vertexShader from "!!raw-loader!./vertexShader.glsl";
import fragmentShader from "!!raw-loader!./fragmentShader.glsl";

const Blob = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  const mousePosition = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      iMouse: { value: new Vector2(0, 0) },
      iTime: {
        type: "f",
        value: 1.0,
      },
      iResolution: {
        type: "v2",
        value: new Vector2(9, 6),
      },
    }),
    []
  );
  const updateMousePosition = useCallback((e) => {
    mousePosition.current.x = -(e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.current.y = (e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
    };
  }, [updateMousePosition]);

  useFrame((state) => {
    const { clock } = state;

    mesh.current.material.uniforms.iTime.value = clock.getElapsedTime() * 0.85;
    mesh.current.material.uniforms.iMouse.value = new Vector2(mousePosition.current.x, mousePosition.current.y);
  });
  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={3}>
      <planeGeometry args={[9, 6]} />
      <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} wireframe={false} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas className="halo-canvas" camera={{ position: [0.0, 0.0, 8.0] }}>
      <Blob />
      <axesHelper />
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
