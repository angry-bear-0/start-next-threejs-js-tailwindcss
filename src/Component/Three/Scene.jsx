import { Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "./OrbitControls";

const Scene = ({
  children,
  cameraFov = 75,
  cameraPosition = new Vector3(-5, 5, 5),
  controls = true,
  lights = true,
  ...restProps
}) => {
  return (
    <Canvas shadows camera={{ position: cameraPosition, fov: cameraFov }} {...restProps}>
      {children}
      {lights && (
        <>
          <ambientLight intensity={0.8} />
          <pointLight intensity={1} position={[0, 6, 0]} />
        </>
      )}
      {controls && <OrbitControls makeDefault />}
    </Canvas>
  );
}

export default Scene;