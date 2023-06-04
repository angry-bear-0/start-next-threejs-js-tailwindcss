import { Canvas } from "@react-three/fiber";
import Floor from "./Floor";
import LightBulb from "./LightBlub";
import Box from "./Box";
import OrbitControls from "./OrbitControls";
import Draggable from "./Draggable";
import { Suspense } from "react";
import { GizmoHelper} from "@react-three/drei";
const Scene = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas
        shadows
        camera={{
          position: [-6, 7, 7],
        }}
      >
        <GizmoHelper/>
        <ambientLight color={"white"} intensity={0.3} />
        <LightBulb position={[0, 3, 3]} />
        <Draggable>
          <Suspense fallback={null}>
            <Box rotation={[0, 30, 0]} />
          </Suspense>
        </Draggable>
        <OrbitControls />
        <Floor position={[0, -1, 0]} />
      </Canvas>
    </div>
  );
}

export default Scene;