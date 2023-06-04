const Floor = (props) => {
  return (
    <mesh {...props} receiveShadow>
      <boxGeometry args={[10, 1, 10]} />
      <meshPhysicalMaterial color='white' />
    </mesh>
  );
}

export default Floor;