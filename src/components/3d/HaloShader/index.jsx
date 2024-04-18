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

  const updateMousePosition = useCallback((e) => {
    // console.log({ x: e.pageX, y: e.pageY });
    mousePosition.current = { x: e.pageX, y: e.pageY };
  }, []);

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

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
    };
  }, [updateMousePosition]);

  useFrame((state) => {
    const { clock } = state;

    mesh.current.material.uniforms.iTime.value = clock.getElapsedTime();
    mesh.current.material.uniforms.iMouse.value = new Vector2(mousePosition.current.x, mousePosition.current.y);
  });
  return (
    <mesh
      onClick={(e) => console.log("click")}
      onContextMenu={(e) => console.log("context menu")}
      onDoubleClick={(e) => console.log("double click")}
      onWheel={(e) => console.log("wheel spins")}
      onPointerUp={(e) => console.log("up")}
      onPointerDown={(e) => console.log("down")}
      onPointerOver={(e) => console.log("over")}
      onPointerOut={(e) => console.log("out")}
      onPointerEnter={(e) => console.log("enter")} // see note 1
      onPointerLeave={(e) => console.log("leave")} // see note 1
      onPointerMove={(e) => console.log("move")}
      onPointerMissed={() => console.log("missed")}
      onUpdate={(self) => console.log("props have been updated")}
      ref={mesh}
      position={[0, 0, 0]}
      scale={3}>
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
