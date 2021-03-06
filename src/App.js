import * as THREE from "three";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Sepia,
  Vignette,
  Glitch,
  Pixelation,
} from "@react-three/postprocessing";
import React, { Suspense, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useControls, button } from "leva";
import { saveAs } from "file-saver";
import {
  OrbitControls,
  Html,
  ContactShadows,
  Environment,
  Loader,
} from "@react-three/drei";
import Bomb from "./Models/Bomb";
import Book from "./Models/Book";
import House from "./Models/House";
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
  const { model } = useControls("General", {
    model: {
      label: "Model",
      value: "bomb",
      options: ["bomb", "book", "house"],
    },
  });

  const [{ showEnv }] = useControls("General", () => ({
    showEnv: {
      value: true,
      label: "Show Enviroment Lightning",
    },
  }));
  const { planeColor, planeRoughness } = useControls("Materials", {
    planeColor: { value: "#52599d", label: "Plane Color" },
    planeRoughness: { value: 0.5, min: 0, max: 1, label: "Plane Roughness" },
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

  useControls("General", {
    ["Download As Image"]: button(() => {
      console.log(document.getElementsByTagName("canvas")[0]);
      var image = document
        .getElementsByTagName("canvas")[0]
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      saveAs(image, "iso.png");
    }),
  });

  return (
    <>
      {" "}
      <Suspense fallback={<Loading />}>
        {showEnv && <Environment preset={enviroment} />}
        {model === "bomb" && <Bomb scale={size} />}

        {model === "book" && (
          <group position={[0, 0.37, 0]}>
            <Book scale={size * 0.05} />
          </group>
        )}

        {model === "house" && (
          <group
            position={[0, 0.091, 0]}
            rotation={[0, degrees_to_radians(-90), 0]}
          >
            <House scale={size * 0.4} />
          </group>
        )}

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
          <meshStandardMaterial
            roughness={planeRoughness}
            color={planeColor}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0, -40]} scale={[20, 20, 20]}>
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
  const {
    vignette,
    bloom,
    depthOfField,
    noise,
    effects,
    sepia,
    pixel,
    glitch,
  } = useControls(
    "Effects",
    {
      effects: {
        hint: "Turn on to Use the checkbces below",
        label: "Use Post Processing Effects",
        value: false,
      },
      vignette: {
        value: false,
        label: "Vignette",
      },
      bloom: {
        value: false,
        label: "Bloom",
      },
      depthOfField: {
        value: false,
        label: "Depth Of Field",
      },
      noise: {
        value: false,
        label: "Noise",
      },
      sepia: {
        value: false,
        label: "Sepia",
      },
      pixel: {
        value: false,
        label: "Pixelation",
      },
      glitch: {
        value: false,
        label: "Glitch",
      },
    },
    { collapsed: true }
  );
  return (
    <Suspense fallback={<Loading />}>
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
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
        {effects && (
          <EffectComposer>
            {depthOfField && (
              <DepthOfField
                focusDistance={6.1}
                focalLength={0.02}
                bokehScale={2}
                height={480}
              />
            )}
            {bloom && (
              <Bloom
                luminanceThreshold={0}
                luminanceSmoothing={0.9}
                height={300}
              />
            )}
            {noise && <Noise opacity={0.2} />}
            {vignette && <Vignette eskil={false} offset={0.1} darkness={1.1} />}
            {sepia && <Sepia intensity={0.9} />}

            {pixel && <Pixelation granularity={8} />}
            {glitch && (
              <Glitch
                delay={[1.5, 3.5]} // min and max glitch delay
                duration={[0.6, 1.0]} // min and max glitch duration
                active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
                ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
              />
            )}
          </EffectComposer>
        )}
      </Canvas>
      <Loader />
    </Suspense>
  );
};

export default App;
