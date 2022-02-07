
const Plane = () => {

    return (
      <mesh rotation-x={-Math.PI/2} receiveShadow >
        <planeBufferGeometry attach='geometry' args={[5000, 5000]} />
        <meshPhysicalMaterial attach='material'  color={'rgb(240, 240, 240)'} />
      </mesh>
    )
};

export default Plane;
