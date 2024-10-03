/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Sphere001: THREE.Mesh;
    Sphere002: THREE.Mesh;
    Sphere003: THREE.Mesh;
    Sphere004: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
    ["Material.004"]: THREE.MeshStandardMaterial;
    ["Material.005"]: THREE.MeshStandardMaterial;
  };
};

export default function Telrad(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    require("../assets/3d/telrad.glb")
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
        geometry={nodes.Sphere001.geometry}
        material={materials["Material.001"]}
        position={[-0.749, -0.001, -0.692]}
        scale={1.177}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere002.geometry}
        material={materials["Material.002"]}
        position={[0.974, 0.035, -0.826]}
        scale={1.177}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere003.geometry}
        material={materials["Material.004"]}
        position={[1.038, 0.023, 0.747]}
        scale={1.177}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere004.geometry}
        material={materials["Material.005"]}
        position={[-0.685, -0.013, 0.882]}
        scale={1.177}
      />
    </group>
  );
}

useGLTF.preload(require("../assets/3d/telrad.glb"));
