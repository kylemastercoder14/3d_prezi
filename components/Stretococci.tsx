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
    Sphere005: THREE.Mesh;
    Sphere006: THREE.Mesh;
    Sphere007: THREE.Mesh;
  };
  materials: {
    ["Material.003"]: THREE.MeshStandardMaterial;
    ["Material.006"]: THREE.MeshStandardMaterial;
    ["Material.007"]: THREE.MeshStandardMaterial;
    ["Material.008"]: THREE.MeshStandardMaterial;
    ["Material.009"]: THREE.MeshStandardMaterial;
    ["Material.010"]: THREE.MeshStandardMaterial;
    ["Material.011"]: THREE.MeshStandardMaterial;
  };
};
export default function Stretococci(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    require("../assets/3d/stretococci.glb")
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
        material={materials["Material.003"]}
        position={[0.553, -0.616, -0.009]}
        rotation={[0, 1.514, 0]}
        scale={0.609}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere002.geometry}
        material={materials["Material.006"]}
        position={[-0.146, -0.589, 0.044]}
        rotation={[0, 1.514, 0]}
        scale={0.609}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere003.geometry}
        material={materials["Material.007"]}
        position={[-0.781, -0.581, 0.057]}
        rotation={[0, 1.514, 0]}
        scale={0.609}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere004.geometry}
        material={materials["Material.008"]}
        position={[-1.363, -0.588, 0.335]}
        rotation={[0, 1.514, 0]}
        scale={0.609}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere005.geometry}
        material={materials["Material.009"]}
        position={[-1.804, -0.566, 0.988]}
        rotation={[0, 1.514, 0]}
        scale={0.609}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere006.geometry}
        material={materials["Material.010"]}
        position={[1.231, -0.536, -0.169]}
        rotation={[0, 1.514, 0]}
        scale={0.609}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere007.geometry}
        material={materials["Material.011"]}
        position={[1.962, -0.591, -0.155]}
        rotation={[0, 1.514, 0]}
        scale={0.609}
      />
    </group>
  );
}

useGLTF.preload(require("../assets/3d/stretococci.glb"));
