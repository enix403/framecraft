// ThreeDFloorPlan.jsx
import React, { useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Bounds } from "@react-three/drei";
import polygonClipping from "polygon-clipping";
// For merging geometries, we use BufferGeometryUtils from three/examples
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import { getInitialPlan } from "@/lib/demo/initialPlan";

// Assume same CELL_SIZE used in your 2D plan
const CELL_SIZE = 5;
const WALL_HEIGHT = 50;

function build3DModel(plan) {
  // STEP 1: Build floor geometry from the union of all room rects
  const roomPolygons: any[] = [];
  plan.rooms.forEach(room => {
    room.rects.forEach(([row, col, width, height]) => {
      const x = col * CELL_SIZE;
      const y = row * CELL_SIZE;
      const w = width * CELL_SIZE;
      const h = height * CELL_SIZE;
      // Define a rectangle polygon (as a closed ring).
      roomPolygons.push([
        [x, y],
        [x + w, y],
        [x + w, y + h],
        [x, y + h]
      ]);
    });
  });

  // Wrap each room polygon in an array (each polygon can have holes later)
  // @ts-ignore
  const unioned = polygonClipping.union(...roomPolygons.map(poly => [poly]));

  // Compute overall bounding box from the unioned polygons
  let globalMinX = Infinity,
    globalMinY = Infinity,
    globalMaxX = -Infinity,
    globalMaxY = -Infinity;
  const floorShapes: any[] = [];
  if (unioned && unioned.length > 0) {
    unioned.forEach(polygon => {
      // Each polygon is an array of rings
      polygon.forEach(ring => {
        ring.forEach(([x, y]) => {
          globalMinX = Math.min(globalMinX, x);
          globalMinY = Math.min(globalMinY, y);
          globalMaxX = Math.max(globalMaxX, x);
          globalMaxY = Math.max(globalMaxY, y);
        });
      });
      // Build a shape from the first ring (outer boundary)
      const shape = new THREE.Shape();
      const outerRing = polygon[0];
      outerRing.forEach(([x, y], idx) => {
        if (idx === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      });
      shape.lineTo(outerRing[0][0], outerRing[0][1]);
      // Add holes if present
      if (polygon.length > 1) {
        for (let i = 1; i < polygon.length; i++) {
          const holePath = new THREE.Path();
          polygon[i].forEach(([x, y], idx) => {
            if (idx === 0) holePath.moveTo(x, y);
            else holePath.lineTo(x, y);
          });
          holePath.lineTo(polygon[i][0][0], polygon[i][0][1]);
          shape.holes.push(holePath);
        }
      }
      floorShapes.push(shape);
    });
  }

  // Merge floor shapes into one geometry if possible
  const floorGeometries = floorShapes.map(
    shape => new THREE.ShapeGeometry(shape)
  );
  let floorGeometry;
  if (floorGeometries.length === 1) {
    floorGeometry = floorGeometries[0];
  } else if (floorGeometries.length > 1) {
    floorGeometry = BufferGeometryUtils.mergeGeometries(floorGeometries);
  } else {
    floorGeometry = new THREE.PlaneGeometry(1, 1);
  }

  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    side: THREE.DoubleSide
  });
  const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
  // Rotate so that the floor lies in the XZ plane.
  floorMesh.rotation.x = +Math.PI / 2;
  floorMesh.position.y = -1;

  // STEP 2: Create wall meshes
  const wallMeshes = plan.walls.map(wall => {
    const { row, col, length, direction, width } = wall;
    // Compute starting coordinates in 2D space
    const x = col * CELL_SIZE;
    const y = row * CELL_SIZE;
    let geometry;
    if (direction === "h") {
      // Horizontal wall: extend along X axis.
      geometry = new THREE.BoxGeometry(
        length * CELL_SIZE,
        WALL_HEIGHT,
        width * CELL_SIZE
      );
      // Translate geometry so its bottom-left corner aligns with (x, y)
      geometry.translate(
        (length * CELL_SIZE) / 2,
        WALL_HEIGHT / 2,
        (width * CELL_SIZE) / 2
      );
    } else {
      // Vertical wall: extend along Y axis (mapped to Z in 3D ground plane).
      geometry = new THREE.BoxGeometry(
        width * CELL_SIZE,
        WALL_HEIGHT,
        length * CELL_SIZE
      );
      geometry.translate(
        (width * CELL_SIZE) / 2,
        WALL_HEIGHT / 2,
        (length * CELL_SIZE) / 2
      );
    }
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xa0522d });
    const mesh = new THREE.Mesh(geometry, wallMaterial);
    // Place the wall. In 3D, we map plan's (col, row) to (x, z).
    mesh.position.set(x, 0, y);
    return mesh;
  });

  // STEP 3: Center the entire model.
  // Compute the center of the unioned floor bounding box.
  const centerX = (globalMinX + globalMaxX) / 2;
  const centerY = (globalMinY + globalMaxY) / 2;

  // Create a group and add floor and walls.
  const group = new THREE.Group();
  group.add(floorMesh);
  wallMeshes.forEach(mesh => group.add(mesh));

  // Recenter the group so that its center is at (0,0,0)
  group.position.set(-centerX, 0, -centerY);

  return group;
}

const model = build3DModel(getInitialPlan());

export function Scratch() {
  // Memoize the model so it only rebuilds when the plan changes.

  return (
    <Canvas camera={{ position: [-10, 40, 5], near: 0.1, far: 100 }}>
      <color attach='background' args={["#202020"]} />

      <ambientLight intensity={0.5} />
      {/* <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow /> */}
      {/* <directionalLight position={[-5, -5, -5]} intensity={0.8} /> */}
      <directionalLight position={[100, 150, 100]} intensity={0.8} />
      <directionalLight position={[100, -150, 100]} intensity={0.8} />

      <OrbitControls target={[0, 0, 0]} enableDamping={true} />
      <Bounds fit clip observe margin={1.2}>
        <primitive object={model} />
      </Bounds>
    </Canvas>
  );
}
