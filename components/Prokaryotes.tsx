/* eslint-disable react/no-unknown-property */
/* eslint-disable prettier/prettier */
import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.Mesh;
  };
  materials: {};
};

export default function Prokaryotes(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF(
    require("@/assets/3d/prokaryotes.glb")
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
      if (isZooming) {
        // Zoom in
        if (scale < targetScale) {
          setScale((prev) => Math.min(prev + zoomSpeed, targetScale)); // Increase scale until it reaches targetScale
        } else {
          // Stop zooming and start rotating
          setIsZooming(false);
        }
      } else {
        // Rotate the model after zooming
        meshRef.current.rotation.y += rotationSpeed;
      }
      // Apply the scale
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group {...props} dispose={null} position={[0, -1, 0]}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
      />
    </group>
  );
}

useGLTF.preload(require("../assets/3d/prokaryotes.glb"));
