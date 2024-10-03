/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Sphere002: THREE.Mesh;
    Sphere001: THREE.Mesh;
    Sphere003: THREE.Mesh;
  };
  materials: {
    ["Material.002"]: THREE.MeshStandardMaterial;
  };
};

export default function Coccobacillus(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    require("../assets/3d/coccobacilli.glb")
  ) as GLTFResult;
  const meshRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(0.1); // Start with a smaller scale
  const targetScale = 1; // Final scale to reach
  const zoomSpeed = 0.02; // Speed of zooming in
  const rotationSpeed = 0.01; // Speed of rotation
  const [isZooming, setIsZooming] = useState(true); // Control zooming state

  // Animation logic
  useFrame(() => {
    if (meshRef.current) {
      // Zooming logic
      if (isZooming) {
        if (scale < targetScale) {
          setScale((prev) => Math.min(prev + zoomSpeed, targetScale)); // Increase scale
        } else {
          setIsZooming(false); // Stop zooming
        }
      } else {
        // Rotate the model after zooming
        meshRef.current.rotation.y += rotationSpeed; // Rotate around the Y-axis
      }

      // Apply the scale to the mesh
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group {...props} dispose={null} position={[0, 1, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere002.geometry}
        material={materials["Material.002"]}
        position={[1.676, 0.182, -1.91]}
        rotation={[-0.877, -0.17, -0.84]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001.geometry}
        material={materials["Material.002"]}
        position={[0.11, 0.011, -0.125]}
        rotation={[-1.574, 0.296, -1.494]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere003.geometry}
        material={materials["Material.002"]}
        position={[-1.615, 0.264, 1.522]}
        rotation={[0.788, 1.01, 0.653]}
      />
    </group>
  );
}

useGLTF.preload(require("../assets/3d/coccobacilli.glb"));
