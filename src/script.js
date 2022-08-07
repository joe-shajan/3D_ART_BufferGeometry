import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

const getPoints = () => {
  const vertices = [];
  const colors = [];
  const numPoints = 100;
  const size = 3;
  let x, y, z, r, g, b;
  for (let i = 0; i < numPoints; i++) {
    x = Math.random() * size - size * 0.5;
    y = Math.random() * size - size * 0.5;
    z = Math.random() * size - size * 0.5;

    r = Math.random() * 1.0;
    g = Math.random() * 1.0;
    b = Math.random() * 1.0;

    vertices.push(x, y, z);
    colors.push(r, g, b);
  }
  return { vertices, colors };
};

const getArtThing = ({ vertices, colors }) => {
  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.MeshBasicMaterial({
    vertexColors: true,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5,
  });
  const mesh = new THREE.Mesh(geometry, material);

  const update = () => {
    mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.002;
  };
  return { mesh, update };
};

const points = getPoints();
console.log(points);
const artThing = getArtThing(points);
scene.add(artThing.mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 5;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate

const tick = () => {

  controls.update();

  // Update objects
  artThing.update();
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
