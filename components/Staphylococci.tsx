/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Sphere043: THREE.Mesh;
    Sphere008: THREE.Mesh;
    Sphere001: THREE.Mesh;
    Sphere002: THREE.Mesh;
    Sphere003: THREE.Mesh;
    Sphere005: THREE.Mesh;
    Sphere006: THREE.Mesh;
    Sphere009: THREE.Mesh;
    Sphere011: THREE.Mesh;
    Sphere012: THREE.Mesh;
    Sphere004: THREE.Mesh;
  };
  materials: {
    ["Material.043"]: THREE.MeshStandardMaterial;
    ["Material.051"]: THREE.MeshStandardMaterial;
    ["Material.052"]: THREE.MeshStandardMaterial;
    ["Material.053"]: THREE.MeshStandardMaterial;
    ["Material.054"]: THREE.MeshStandardMaterial;
    ["Material.056"]: THREE.MeshStandardMaterial;
    ["Material.057"]: THREE.MeshStandardMaterial;
    ["Material.058"]: THREE.MeshStandardMaterial;
    ["Material.059"]: THREE.MeshStandardMaterial;
    ["Material.060"]: THREE.MeshStandardMaterial;
    ["Material.007"]: THREE.MeshStandardMaterial;
  };
};

export default function Staphylococci(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    require("../assets/3d/staphylococci.glb")
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
        geometry={nodes.Sphere043.geometry}
        material={materials["Material.043"]}
        position={[0.528, -0.501, 0.105]}
        rotation={[-0.048, -0.628, -0.064]}
        scale={0.745}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere008.geometry}
        material={materials["Material.051"]}
        position={[-0.153, -0.561, 1]}
        rotation={[-0.048, -0.628, -0.064]}
        scale={0.745}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001.geometry}
        material={materials["Material.052"]}
        position={[1.244, -0.506, -0.721]}
        rotation={[-0.048, -0.628, -0.064]}
        scale={0.745}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere002.geometry}
        material={materials["Material.053"]}
        position={[0.736, 0.623, -0.266]}
        rotation={[-0.048, -0.628, -0.064]}
        scale={0.745}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere003.geometry}
        material={materials["Material.054"]}
        position={[-0.178, 0.665, 0.248]}
        rotation={[-0.048, -0.628, -0.064]}
        scale={0.745}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere005.geometry}
        material={materials["Material.056"]}
        position={[-0.539, 0.607, 1.045]}
        rotation={[-0.048, -0.628, -0.064]}
        scale={0.745}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere006.geometry}
        material={materials["Material.057"]}
        position={[-0.917, -0.35, 1.149]}
        rotation={[-0.048, -0.628, -0.064]}
        scale={0.745}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere009.geometry}
        material={materials["Material.058"]}
        position={[-0.866, -0.254, -0.041]}
        rotation={[-0.048, -0.628, -0.064]}
        scale={0.745}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere011.geometry}
        material={materials["Material.059"]}
        position={[0.045, -0.278, -0.756]}
        rotation={[-0.048, -0.628, -0.064]}
        scale={0.745}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere012.geometry}
        material={materials["Material.060"]}
        position={[0.752, -0.447, -1.616]}
        rotation={[-0.048, -0.628, -0.064]}
        scale={0.745}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere004.geometry}
        material={materials["Material.007"]}
        position={[0.985, 0.381, -1.383]}
        rotation={[-0.048, -0.628, -0.064]}
        scale={0.745}
      />
    </group>
  );
}

useGLTF.preload(require("../assets/3d/staphylococci.glb"));
