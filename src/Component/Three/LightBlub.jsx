const LightBulb = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereGeometry args={[0.2, 30, 20]} />
      <meshPhongMaterial emissive={"yellow"} />
    </mesh>
  );
}

export default LightBulb;