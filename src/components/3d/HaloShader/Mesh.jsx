import { OrbitControls, TransformControls, useAspect } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Color, MathUtils, Vector2 } from "three";

import vertexShader from "!!raw-loader!./vertexShader.glsl";
import fragmentShader from "!!raw-loader!./fragmentShader.glsl";

const Mesh = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const { size } = useThree();
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      // if (size.width > 1600) {
      //   const scale = Math.min(size.width, size.height) / 500;
      //   mesh.current.scale.set(scale, scale, scale);
      // } else if (size.width <= 1440) {
      //   const scale = Math.min(size.width, size.height) / 295;
      //   mesh.current.scale.set(scale, scale, scale);
      // } else if ((size.width > 360) & (screen.width <= 1048)) {
      //   console.log("condition ran");
      //   const scale = Math.min(size.width, size.height) / 225;
      //   mesh.current.scale.set(scale, scale, scale);
      // } else {
      // if (size.width < 501) {
      //   const scale = Math.min(size.width, size.height) / 135;
      //   mesh.current.scale.set(scale, scale, scale);
      // }
      // }
    };

    handleResize(); // Call the resize function initially

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);

  const uniforms = useMemo(
    () => ({
      iColor: { value: new Color("#006531") },
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
    const { uv } = e;

    mousePosition.current.x = uv.x * 1.2;
    mousePosition.current.y = uv.y * 1.2;
    mesh.current.rotation.x = uv.x * 0.09;
    mesh.current.rotation.y = uv.y * 0.09;
    mesh.current.rotation.z = uv.y * 0.09;
  }, []);

  const onMouseUp = useCallback((event) => {
    mesh.current.position.z = 0.0;
  }, []);
  const onMouseDown = useCallback((event) => {
    mesh.current.position.z = 0.75;
  }, []);

  useFrame((state) => {
    const { clock } = state;

    mesh.current.material.uniforms.iTime.value = clock.getElapsedTime() * 0.85;
    mesh.current.material.uniforms.iMouse.value = new Vector2(mousePosition.current.x, mousePosition.current.y);
  });

  return (
    <mesh
      onPointerMove={(e) => updateMousePosition(e)}
      onPointerDown={onMouseDown}
      onPointerUp={onMouseUp}
      ref={mesh}
      position={[0, 0, 0]}
      scale={3}>
      <planeGeometry args={[9, 6]} />
      <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} wireframe={false} />
    </mesh>
  );
};

export default Mesh;
