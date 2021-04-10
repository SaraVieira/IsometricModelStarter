import React from "react";
import { useControls } from "leva";

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
  const radius = 10;
  const { intensity } = useControls(
    "Light",
    {
      intensity: { value: 0.4, min: 0, max: 4, step: 0.1 },
    },
    { collapsed: true }
  );
  const colors = useControls(
    "Light",
    {
      leftLightColor: "#ff0000",
      rightLightColor: "#0053ff",
      sirenLightColor: "#E72B4C",
    },
    { collapsed: true }
  );
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
        color={colors.leftLightColor}
      />
      <pointLight
        position={[radius * 2, radius * 2, radius * 2]}
        intensity={intensity}
        {...shadows}
        color={colors.rightLightColor}
      />
      <pointLight
        scale={0.3}
        intensity={0.2}
        position={[-0.44, 0.95, 0.79]}
        color={colors.sirenLightColor}
        {...shadows}
      />
      <pointLight
        scale={0.3}
        intensity={0.2}
        position={[0.4, 0.95, 0.79]}
        color={colors.sirenLightColor}
        {...shadows}
      />
    </group>
  );
};

export default Lights;
