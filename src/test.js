import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ARButton } from "./lib/ARButton.js";

let camera, scene, renderer;
let model;

const init = () => {
  // Initialize Three.js components
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    20
  );
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Load GLB model and attach it to the camera
  const gltfLoader = new GLTFLoader();
  const glbFilePath = "./media/3d/direction_arrows.glb";
  gltfLoader.load(glbFilePath, (gltf) => {
    model = gltf.scene;
    model.position.set(0, 0, -0.5); // Adjust position as needed
    camera.add(model);
  });

  // Add camera to the scene
  scene.add(camera);

  // Add lights
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1.5);
  light.position.set(0.5, 1, 1);
  scene.add(light);

  // Add AR button
  document.body.appendChild(
    ARButton.createButton(renderer, {
      requiredFeatures: ["hit-test"],
      optionalFeatures: ["dom-overlay"],
      domOverlay: { root: document.getElementById("overlay") },
    })
  );

  // Add resize listener
  window.addEventListener("resize", onWindowResize, false);

  // Start rendering
  animate();
};

// Window resize handler
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
  renderer.setAnimationLoop(render);
}

// Render function
function render() {
  // If model exists, update its position to be stuck to the camera
  if (model) {
    model.position.copy(camera.position);
    model.position.y -= 0.5; // Adjust as needed to keep it in the middle of the screen
    // Add slight up and down motion
    model.position.y += Math.sin(Date.now() * 0.001) * 0.05;
  }

  renderer.render(scene, camera);
}

// Initialize the app
init();
