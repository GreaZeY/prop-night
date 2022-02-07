
const Plane = () => {

    return (
      <mesh rotation-x={-Math.PI/2} position={[0,-1,0]} receiveShadow >
        <planeBufferGeometry attach='geometry' args={[500, 500]} />
        <meshPhysicalMaterial attach='material' opacity={.4}  color='rgb(240, 240, 240)' />
      </mesh>
    )
};

export default Plane;
