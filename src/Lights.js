import React from "react";

const shadows = {
  "shadow-mapSize-width": 2048,
  "shadow-mapSize-height": 2048,
  "shadow-camera-far": 50,
  "shadow-camera-left": -10,
  "shadow-camera-right": 10,
  "shadow-camera-top": 10,
  "shadow-camera-bottom": -10,
};

const Lights = () => {
  const intensity = 0.2;
  const radius = 10;
  return (
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
  );
};

export default Lights;
