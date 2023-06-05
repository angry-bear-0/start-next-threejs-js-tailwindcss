import { GizmoHelper, OrbitControls, useGLTF, GizmoViewcube } from "@react-three/drei"

const GizmoHelperComponent = () => {
  const { scene } = useGLTF('models/LittlestTokyo.glb')
  console.log(scene);
  return (
    <>
      <primitive object={scene} scale={[0.01, 0.01, 0.01]} />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewcube
          {...{
            color: "white",
            faces: ["Right", "Left", "Top", "Bottom", "Front", "Back"],
            hoverColor: "lightgray",
            opacity: 1,
            strokeColor: "gray",
            textColor: "black",
          }}
        />
      </GizmoHelper>

      <OrbitControls makeDefault />
    </>
  )
}

export default GizmoHelperComponent;