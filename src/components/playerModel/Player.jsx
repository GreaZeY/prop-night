import { useLoader, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
const Player = () => {
  const [anim, setAnim] = useState(0); //current animation index
  const player = useRef();
  const fbx = useLoader(FBXLoader, "/models/fbx/players/idle.fbx");
  const anims = ["Running"]; // defining all animations
  const runningAnim = useLoader(
    FBXLoader,
    `/models/fbx/players/${anims[0]}.fbx`
  ); // loading animations

  let mixer;

  useEffect(() => {
    mixer = new THREE.AnimationMixer(fbx);

    const action = mixer.clipAction(fbx.animations[anim]);
    action.play();
  }, [anim]);

  useEffect(() => {
    fbx.animations.push(runningAnim.animations[0]);
    fbx.receiveShadow = true;
    fbx.castShadow = true;
    fbx.scale.set(0.5, 0.5, 0.5);
    console.log(fbx);
    player.current.position.z = -250;

    document.addEventListener("keyup", (e) => {
      console.log("up");
      setAnim(0);
    });

    document.addEventListener("keydown", (e) => {
      console.log(e);
      switch (e.code) {
        case "ArrowUp":
          setAnim(1);
          break;
      }
    });
  }, []);

  useFrame((state, delta) => {
    mixer?.update(delta);

    if (anim) player.current.position.z += 1;
  });

  return (
      <primitive ref={player} object={fbx} />
  );
};

export default Player;
