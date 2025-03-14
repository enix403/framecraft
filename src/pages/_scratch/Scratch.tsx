import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds, Stage } from "@react-three/drei";
import * as THREE from "three";

function MeshViewer({ meshGeometry }: { meshGeometry?: THREE.BufferGeometry }) {
  const defaultGeometry = new THREE.BoxGeometry(1, 1, 1);
  const geometry = meshGeometry || defaultGeometry;

  return (
    <Canvas camera={{ position: [3, 3, 3], near: 0.1, far: 100 }}>
      <color attach='background' args={["#202020"]} />

      {/* Enhanced Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, -5, -5]} intensity={0.8} />

      <OrbitControls enableDamping={true} />
      <Bounds fit clip observe margin={2}>
        <mesh geometry={geometry}>
          {/* Phong Material for better shading */}
          <meshPhongMaterial color='lightblue' shininess={100} />
        </mesh>

        {/* Outline Effect for Better Visibility */}
        <lineSegments>
          <edgesGeometry attach='geometry' args={[geometry]} />
          <lineBasicMaterial attach='material' color='black' linewidth={1} />
        </lineSegments>
      </Bounds>
    </Canvas>
  );
}

export function Scratch() {
  return <MeshViewer />;
}
