/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/bookMin.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[6.75, 0.02, -6.85]} scale={[142.58, 142.58, 142.58]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014.geometry}
          material={materials.book}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014_1.geometry}
          material={materials["book paper"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014_2.geometry}
          material={materials["book latch"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/bookMin.glb");