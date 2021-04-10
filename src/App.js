import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import Model from "./Model";

const shadows = {
  "shadow-mapSize-width": 2048,
  "shadow-mapSize-height": 2048,
  "shadow-camera-far": 50,
  "shadow-camera-left": -10,
  "shadow-camera-right": 10,
  "shadow-camera-top": 10,
  "shadow-camera-bottom": -10,
};

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

const Loading = () => {
  return "loading";
};

function Viewer() {
  const intensity = 0.2;
  const radius = 10;
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
        <group>
          <spotLight
            position={[5, 5, 0]}
            intensity={0.2}
            color="white"
            {...shadows}
          />{" "}
          <pointLight
            position={[-radius * 2, -radius * 2, -radius * 2]}
            intensity={intensity}
            {...shadows}
            color="red"
          />
          <pointLight
            position={[radius * 2, radius * 2, radius * 2]}
            intensity={intensity}
            {...shadows}
            color="blue"
          />
          <pointLight
            scale={0.3}
            intensity={1}
            position={[-0.44, 0.95, 0.79]}
            color="#E72B4C"
            {...shadows}
          />
          <pointLight
            scale={0.3}
            intensity={1}
            position={[0.4, 0.95, 0.79]}
            color="#E72B4C"
            {...shadows}
          />
        </group>
      </Suspense>

      <OrbitControls ref={ref} />
    </>
  );
}

const App = () => {
  return (
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
  );
};

export default App;
