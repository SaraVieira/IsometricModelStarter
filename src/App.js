import * as THREE from "three";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import {
  OrbitControls,
  Html,
  ContactShadows,
  Environment,
  Loader,
} from "@react-three/drei";
import Model from "./Model";
import Lights from "./Lights";

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

const Loading = () => {
  return "loading";
};

function Viewer() {
  const ref = useRef();
  const { viewport } = useThree();
  const size = viewport.width / 20;
  const [{ showEnv }, set] = useControls("General", () => ({
    showEnv: {
      value: true,
      label: "Show Enviroment Lightning",
    },
  }));
  const { planeColor } = useControls("Materials", {
    planeColor: { value: "#4C5CFF", label: "Plane Color" },
  });
  const { enviroment } = useControls("General", {
    enviroment: {
      label: "Enviroment",
      value: "park",
      options: [
        "sunset",
        "dawn",
        "night",
        "warehouse",
        "forest",
        "apartment",
        "studio",
        "city",
        "park",
        "lobby",
      ],
    },
  });

  return (
    <>
      {" "}
      <Suspense fallback={<Loading />}>
        {showEnv && <Environment preset={enviroment} />}
        <Model scale={size} />
        <ContactShadows
          position={[0, 0, 0]}
          width={10}
          height={10}
          far={20}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          position={[0, -0.00001, 0]}
          scale={[200, 200, 200]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeBufferGeometry />
          <meshStandardMaterial color={planeColor} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, -10]} scale={[20, 20, 20]}>
          <planeBufferGeometry />
          <meshStandardMaterial color={planeColor} side={THREE.DoubleSide} />
        </mesh>
        <Lights />
        {viewport.width < viewport.height && viewport.width < 800 ? (
          <Html>
            <p className="rotate">Please rotate your phone for a better view</p>
          </Html>
        ) : null}
      </Suspense>
      <OrbitControls ref={ref} />
    </>
  );
}

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Canvas
        colorManagement
        shadowMap
        shadows
        orthographic
        dpr={[1, 2]}
        camera={{
          scale: 0.45,
          position: [-5.80215, 6.006, 8.65757],
          rotation: [degrees_to_radians(60), degrees_to_radians(-35.7), 0],
        }}
      >
        <Viewer />
      </Canvas>
      <Loader />
    </Suspense>
  );
};

export default App;
