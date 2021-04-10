import * as THREE from "three";
import React, { Suspense, useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/Friday_09-April-2021_19.25_01.gltf");
  const RED = new THREE.MeshPhysicalMaterial({
    transparent: true,
    color: "#f90931",
    metalness: 0,
    transmission: 0.15,
    opacity: 1,
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Big_cable.geometry}
        material={materials["Black tube"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Handles.geometry}
        material={materials.METAL}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Main.geometry}
        material={materials.METAL}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={materials.Black}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005_1.geometry}
        material={materials.METAL}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cable_Front.geometry}
        material={materials["Red Cable"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BezierCurve003.geometry}
        material={materials["Blue Cable"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BezierCurve004.geometry}
        material={materials["Yellow Cable"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BezierCurve005.geometry}
        material={materials["Green Cable"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Small_Cable.geometry}
        material={nodes.Small_Cable.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BezierCurve008.geometry}
        material={materials["Material.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Holder.geometry}
        material={materials["METAL Black"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001.geometry}
        material={materials["METAL Black"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle002.geometry}
        material={materials["METAL Black"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle003.geometry}
        material={materials.METAL}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle004.geometry}
        material={materials["METAL Black"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle005.geometry}
        material={materials["METAL Black"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle006.geometry}
        material={materials["METAL Black"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle007.geometry}
        material={materials["METAL Black"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle008.geometry}
        material={materials["METAL Black"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Siren.geometry}
        material={RED}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Siren_Holder.geometry}
        material={materials.METAL}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Main002.geometry}
        material={materials.countdown}
      />
    </group>
  );
}

useGLTF.preload("/Friday_09-April-2021_19.25_01.gltf");
