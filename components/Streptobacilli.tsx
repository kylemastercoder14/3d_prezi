/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Sphere: THREE.Mesh;
    Sphere001: THREE.Mesh;
    Sphere002: THREE.Mesh;
    Sphere003: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshPhysicalMaterial;
    ["Material.002"]: THREE.MeshPhysicalMaterial;
    ["Material.003"]: THREE.MeshPhysicalMaterial;
    ["Material.004"]: THREE.MeshPhysicalMaterial;
  };
};

export default function Streptobacilli(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    require("../assets/3d/streptobacilli.glb")
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
    <group {...props} dispose={null} position={[0, 5, -5]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials["Material.001"]}
        position={[4.486, 2.004, 2.468]}
        rotation={[-0.561, -0.018, -0.142]}
        scale={0.225}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001.geometry}
        material={materials["Material.002"]}
        position={[4.45, 2.391, 3.175]}
        rotation={[-0.527, -0.023, -0.142]}
        scale={0.225}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere002.geometry}
        material={materials["Material.003"]}
        position={[4.411, 2.776, 3.854]}
        rotation={[-0.423, -0.038, -0.139]}
        scale={0.225}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere003.geometry}
        material={materials["Material.004"]}
        position={[4.334, 3.067, 4.579]}
        rotation={[-0.232, -0.064, -0.129]}
        scale={0.225}
      />
    </group>
  );
}

useGLTF.preload(require("../assets/3d/streptobacilli.glb"));
