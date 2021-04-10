import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  ContactShadows,
  Environment,
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

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Environment background preset="park"></Environment>
        <Model />
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
          <meshStandardMaterial color="#4C5CFF" />
        </mesh>
        <Lights />
      </Suspense>
      <OrbitControls ref={ref} />
    </>
  );
}

const App = () => {
  const [loaded, setLoaded] = useState();
  return (
    <Canvas
      colorManagement
      shadowMap
      shadows
      onCreated={() => setLoaded(true)}
      orthographic
      dpr={[1, 2]}
      camera={{
        scale: 0.45,
        position: [-5.80215, 6.006, 8.65757],
        rotation: [degrees_to_radians(60), degrees_to_radians(-35.7), 0],
      }}
    >
      <Viewer />
      {!loaded && <Loading />}
    </Canvas>
  );
};

export default App;
