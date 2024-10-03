/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Sphere003: THREE.Mesh;
    Sphere007: THREE.Mesh;
    Sphere005: THREE.Mesh;
    Sphere006: THREE.Mesh;
    Sphere008: THREE.Mesh;
    Sphere010: THREE.Mesh;
    Sphere011: THREE.Mesh;
    Sphere012: THREE.Mesh;
  };
  materials: {
    ["Material.017"]: THREE.MeshStandardMaterial;
    ["Material.019"]: THREE.MeshStandardMaterial;
    ["Material.024"]: THREE.MeshStandardMaterial;
    ["Material.025"]: THREE.MeshStandardMaterial;
    ["Material.026"]: THREE.MeshStandardMaterial;
    ["Material.027"]: THREE.MeshStandardMaterial;
    ["Material.028"]: THREE.MeshStandardMaterial;
    ["Material.029"]: THREE.MeshStandardMaterial;
  };
};

export default function Garcinae(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    require("../assets/3d/garcinae.glb")
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
        geometry={nodes.Sphere003.geometry}
        material={materials["Material.017"]}
        position={[-0.662, -0.44, -0.726]}
        rotation={[-0.049, 0.344, 0.18]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere007.geometry}
        material={materials["Material.019"]}
        position={[-0.722, -0.5, 0.62]}
        rotation={[-0.049, 0.344, 0.18]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere005.geometry}
        material={materials["Material.024"]}
        position={[0.472, -0.471, 0.677]}
        rotation={[-0.049, 0.344, 0.18]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere006.geometry}
        material={materials["Material.025"]}
        position={[0.532, -0.411, -0.669]}
        rotation={[-0.049, 0.344, 0.18]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere008.geometry}
        material={materials["Material.026"]}
        position={[-0.773, 0.415, 0.673]}
        rotation={[-0.049, 0.344, 0.18]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere010.geometry}
        material={materials["Material.027"]}
        position={[0.48, 0.504, -0.616]}
        rotation={[-0.049, 0.344, 0.18]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere011.geometry}
        material={materials["Material.028"]}
        position={[0.42, 0.444, 0.73]}
        rotation={[-0.049, 0.344, 0.18]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere012.geometry}
        material={materials["Material.029"]}
        position={[-0.714, 0.474, -0.673]}
        rotation={[-0.049, 0.344, 0.18]}
      />
    </group>
  );
}

useGLTF.preload(require("../assets/3d/garcinae.glb"));
