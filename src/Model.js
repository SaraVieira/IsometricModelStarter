import * as THREE from "three";
import React, { useState, useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useSpring, animated } from "react-spring/three";

export default function Model(props) {
  const group = useRef();
  const [clickDisc, setClickedDisc] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { pos } = useSpring({
    pos: clickDisc ? [0.2, 0, 0] : [0, 0, 0],
  });
  const { nodes, materials } = useGLTF("/model.gltf");
  const { metalRoughness } = useControls("Materials", {
    metalRoughness: { value: 0, min: 0, max: 1, label: "Metal Roughness" },
  });
  const { metalColor } = useControls("Materials", {
    metalColor: { value: "#ffffff", label: "Metal Color" },
  });
  const { darkerMetalColor } = useControls("Materials", {
    darkerMetalColor: { label: "Dark Metal Color", value: "#414141" },
  });
  const RED = new THREE.MeshPhysicalMaterial({
    transparent: true,
    color: "#f90931",
    metalness: 0,
    transmission: 0.15,
    opacity: 1,
  });

  const Metal = new THREE.MeshPhysicalMaterial({
    color: metalColor,
    metalness: 1,
    roughness: metalRoughness,
    side: THREE.DoubleSide,
  });

  const DarkerMetal = new THREE.MeshPhysicalMaterial({
    color: darkerMetalColor,
    metalness: 1,
    roughness: metalRoughness,
    side: THREE.DoubleSide,
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

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
        material={Metal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Main.geometry}
        material={Metal}
      />
      <animated.group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={pos}
        onClick={() => {
          setClickedDisc(true);
        }}
      >
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
          material={Metal}
        />
      </animated.group>
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
        material={DarkerMetal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001.geometry}
        material={DarkerMetal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle002.geometry}
        material={DarkerMetal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle003.geometry}
        material={Metal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle004.geometry}
        material={DarkerMetal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle005.geometry}
        material={DarkerMetal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle006.geometry}
        material={DarkerMetal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle007.geometry}
        material={DarkerMetal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle008.geometry}
        material={DarkerMetal}
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
        material={Metal}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Main002.geometry}
        material={clickDisc ? materials.countdown : materials["Black tube"]}
      />
    </group>
  );
}

useGLTF.preload("/Friday_09-April-2021_19.25_01.gltf");
