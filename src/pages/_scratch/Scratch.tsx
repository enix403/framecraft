import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Bounds } from "@react-three/drei";
import polygonClipping from "polygon-clipping";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import { getInitialPlan } from "@/lib/demo/initialPlan";

/* =============================================== */

// Constants
const CELL_SIZE = 5;
const WALL_HEIGHT = 50;

// Helper: Build a wall geometry with door openings by splitting it into segments.
function buildWallGeometry(wall, allDoors) {
  const { row, col, length, direction, width } = wall;
  const T = width * CELL_SIZE; // wall thickness
  let segments = [];

  // Filter doors for this wall.
  let wallDoors;
  if (direction === "h") {
    wallDoors = allDoors.filter((door) =>
      door.direction === "h" && door.row === row && door.col >= col && door.col < col + length
    );
  } else {
    wallDoors = allDoors.filter((door) =>
      door.direction === "v" && door.col === col && door.row >= row && door.row < row + length
    );
  }

  // For each wall, we create segments along its length that are not occupied by a door.
  // We'll work in local coordinates along the wall’s main axis.
  const totalLength = length * CELL_SIZE; // total wall length in pixels
  let doorIntervals = [];
  if (direction === "h") {
    // For horizontal walls, local X coordinate.
    doorIntervals = wallDoors.map((door) => {
      const dStart = (door.col - col) * CELL_SIZE;
      const dEnd = dStart + door.length * CELL_SIZE;
      return [dStart, dEnd];
    });
  } else {
    // For vertical walls, local Z coordinate.
    doorIntervals = wallDoors.map((door) => {
      const dStart = (door.row - row) * CELL_SIZE;
      const dEnd = dStart + door.length * CELL_SIZE;
      return [dStart, dEnd];
    });
  }
  // Sort door intervals by starting coordinate.
  doorIntervals.sort((a, b) => a[0] - b[0]);

  let currentStart = 0;
  doorIntervals.forEach(([dStart, dEnd]) => {
    if (dStart > currentStart) {
      segments.push([currentStart, dStart]);
    }
    currentStart = Math.max(currentStart, dEnd);
  });
  if (currentStart < totalLength) {
    segments.push([currentStart, totalLength]);
  }

  // For each segment, create a box geometry.
  let segmentGeometries = [];
  if (direction === "h") {
    // Horizontal wall: extends along X.
    segments.forEach(([s, e]) => {
      const segLength = e - s;
      if (segLength <= 0) return;
      // Create a box with dimensions: (segLength, WALL_HEIGHT, T)
      const geom = new THREE.BoxGeometry(segLength, WALL_HEIGHT, T);
      // Translate the geometry so its center is at:
      // x: (s + segLength/2), y: WALL_HEIGHT/2, z: T/2.
      geom.translate(s + segLength / 2, WALL_HEIGHT / 2, T / 2);
      segmentGeometries.push(geom);
    });
  } else {
    // Vertical wall: extends along Z.
    segments.forEach(([s, e]) => {
      const segLength = e - s;
      if (segLength <= 0) return;
      // Create a box with dimensions: (T, WALL_HEIGHT, segLength)
      const geom = new THREE.BoxGeometry(T, WALL_HEIGHT, segLength);
      // Translate so its center is at: x: T/2, y: WALL_HEIGHT/2, z: (s + segLength/2)
      geom.translate(T / 2, WALL_HEIGHT / 2, s + segLength / 2);
      segmentGeometries.push(geom);
    });
  }

  // Merge all segments into one geometry.
  return BufferGeometryUtils.mergeGeometries(segmentGeometries, true);
}

function build3DModel(plan) {
  // STEP 1: Build the floor mesh (using previous approach).
  const roomPolygons = [];
  plan.rooms.forEach((room) => {
    room.rects.forEach(([row, col, width, height]) => {
      const x = col * CELL_SIZE;
      const y = row * CELL_SIZE;
      const w = width * CELL_SIZE;
      const h = height * CELL_SIZE;
      roomPolygons.push([[x, y], [x + w, y], [x + w, y + h], [x, y + h]]);
    });
  });
  const unioned = polygonClipping.union(...roomPolygons.map((poly) => [poly]));
  let globalMinX = Infinity, globalMinY = Infinity, globalMaxX = -Infinity, globalMaxY = -Infinity;
  const floorShapes = [];
  if (unioned && unioned.length > 0) {
    unioned.forEach((polygon) => {
      polygon.forEach((ring) => {
        ring.forEach(([x, y]) => {
          globalMinX = Math.min(globalMinX, x);
          globalMinY = Math.min(globalMinY, y);
          globalMaxX = Math.max(globalMaxX, x);
          globalMaxY = Math.max(globalMaxY, y);
        });
      });
      const shape = new THREE.Shape();
      const outerRing = polygon[0];
      outerRing.forEach(([x, y], idx) => {
        if (idx === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      });
      shape.lineTo(outerRing[0][0], outerRing[0][1]);
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
  const floorGeometries = floorShapes.map((shape) => new THREE.ShapeGeometry(shape));
  let floorGeometry;
  if (floorGeometries.length === 1) {
    floorGeometry = floorGeometries[0];
  } else if (floorGeometries.length > 1) {
    floorGeometry = BufferGeometryUtils.mergeGeometries(floorGeometries);
  } else {
    floorGeometry = new THREE.PlaneGeometry(1, 1);
  }
  // const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
  const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xe3bf9d, side: THREE.DoubleSide });
  const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
  // Rotate floor: use -Math.PI/2 to have it lie on the XZ plane.
  floorMesh.rotation.x = +Math.PI / 2;
  // Slightly lower the floor.
  floorMesh.position.y = -0.1;

  // STEP 2: Build wall meshes using our segmentation method.
  const wallMeshes = plan.walls.map((wall) => {
    let geometry;
    if (wall.direction === "h") {
      geometry = buildWallGeometry(wall, plan.doors);
    } else {
      geometry = buildWallGeometry(wall, plan.doors);
    }
    // const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xa0522d });
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xFD7A5F });
    const mesh = new THREE.Mesh(geometry, wallMaterial);
    // For both wall types, the plan's (col, row) maps to (x, z).
    const posX = wall.col * CELL_SIZE;
    const posZ = wall.row * CELL_SIZE;
    mesh.position.set(posX, 0, posZ);
    return mesh;
  });

  // STEP 3: Center the entire model based on the floor bounding box.
  const centerX = (globalMinX + globalMaxX) / 2;
  const centerY = (globalMinY + globalMaxY) / 2;
  const group = new THREE.Group();
  group.add(floorMesh);
  wallMeshes.forEach((mesh) => group.add(mesh));
  group.position.set(-centerX, 0, -centerY);
  return group;
}

/* =============================================== */

const model = build3DModel(getInitialPlan());

// #8BB1B4

export function Scratch() {
  // Memoize the model so it only rebuilds when the plan changes.

  // <color attach='background' args={["#202020"]} />
  return (
    <Canvas camera={{ position: [-10, 40, 5], near: 0.1, far: 100 }}>
      <color attach='background' args={["#b3b48b"]} />

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
