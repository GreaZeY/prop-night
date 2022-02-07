import {useRef} from 'react'
import { Canvas, extend, useFrame, useThree} from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import './App.css';
import Plane from './components/Plane.jsx'
import Player from './components/playerModel/Player.jsx'
import { Suspense } from 'react'
// import { softShadows } from "@react-three/drei"
// softShadows()
////////////////////--------------------OrbitControls--------------------////////////////////
extend({ OrbitControls });
const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  camera.position.z = -210;
  camera.position.x = 0;
  camera.position.y = 250;
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame(() => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};
////////////////////////////////////////////////////////////////////////////////////

////////////////////--------------------APP--------------------////////////////////
const App=()=> {
  return (
    <Canvas shadows  colorManagement >
       
       <ambientLight intensity={0.3}/>
        <directionalLight
          castShadow
          position={[100,100,0]}
          intensity={.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left = {10}
          shadow-camera-right = {10}
          shadow-camera-top = {10}
          shadow-camera-bottom = {-10}
        />
      
      <CameraControls/>

      {/* <mesh receiveShadow castShadow position-y={25} >
      <boxBufferGeometry  args={[50, 50,50]} />
      <meshStandardMaterial color={'red'} />
      </mesh> */}

      <Plane />

      <Suspense fallback={'Loading Model'}>
      <Player/>
      </Suspense>
      <group>
          <mesh receiveShadow rotation={[-Math.PI / 2 , 0 , 0]} position={[100,-1,100]}>
            <planeBufferGeometry  args={[500,500]}/>
            <shadowMaterial  opacity={1} color="black"/>
          </mesh>
        </group>
    </Canvas>
  );
}

export default App;
