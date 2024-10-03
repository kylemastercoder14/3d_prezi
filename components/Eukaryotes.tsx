/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Sphere005: THREE.Mesh;
    Sphere004: THREE.Mesh;
    Sphere003: THREE.Mesh;
    Sphere001: THREE.Mesh;
    Sphere: THREE.Mesh;
    Sphere002: THREE.Mesh;
    Sphere006: THREE.Mesh;
    Sphere007: THREE.Mesh;
    Cylinder004: THREE.Mesh;
    Mball001: THREE.Mesh;
    Mball002: THREE.Mesh;
  };
  materials: {
    ["Material.007"]: THREE.MeshPhysicalMaterial;
    ["Material.005"]: THREE.MeshStandardMaterial;
    ["Material.003"]: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
    Material: THREE.MeshStandardMaterial;
    ["Material.008"]: THREE.MeshStandardMaterial;
    ["Material.010"]: THREE.MeshStandardMaterial;
    ["Material.011"]: THREE.MeshStandardMaterial;
  };
};

export default function Eukaryotes(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    require("../assets/3d/eukaryotic.glb")
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
        geometry={nodes.Sphere005.geometry}
        material={materials["Material.007"]}
        position={[-0.003, -0.104, 0.554]}
        rotation={[Math.PI, -0.096, Math.PI]}
        scale={[2.203, 2.367, 2.424]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere004.geometry}
        material={materials["Material.005"]}
        position={[-0.023, 0.077, 0.332]}
        rotation={[Math.PI, -0.096, Math.PI]}
        scale={2.244}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere003.geometry}
        material={materials["Material.003"]}
        position={[0.269, 0.147, 0.408]}
        rotation={[3.094, -0.117, -3.112]}
        scale={0.204}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001.geometry}
        material={materials["Material.001"]}
        position={[0.118, 0.083, 0.412]}
        rotation={[3.094, -0.117, -3.112]}
        scale={[0.511, 0.549, 0.562]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials["Material.002"]}
        position={[0.114, 0.123, 0.358]}
        rotation={[3.094, -0.117, -3.112]}
        scale={0.52}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere002.geometry}
        material={materials.Material}
        position={[1.369, 0.009, -0.596]}
        rotation={[3.094, -0.117, -3.112]}
        scale={0.115}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere006.geometry}
        material={materials["Material.008"]}
        position={[0.676, -0.008, -1.02]}
        rotation={[3.094, -0.117, -3.112]}
        scale={[0.086, 0.115, 0.087]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere007.geometry}
        material={materials.Material}
        position={[-1.746, 0.019, 0.297]}
        rotation={[3.094, -0.117, -3.112]}
        scale={0.115}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        material={materials["Material.010"]}
        position={[-1.506, 0.066, -0.303]}
        rotation={[-0.785, 0.827, -0.613]}
        scale={[-0.01, -0.274, -0.01]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mball001.geometry}
        material={materials["Material.011"]}
        position={[-1.316, -0.071, -0.989]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mball002.geometry}
        material={materials["Material.011"]}
        position={[0.506, 0.054, -0.227]}
        scale={-0.342}
      />
    </group>
  );
}

useGLTF.preload(require("../assets/3d/eukaryotic.glb"));
