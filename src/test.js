import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ARButton } from "./lib/ARButton.js";

// Load GLB model and attach it to the camera
const gltfLoader = new GLTFLoader();
let model;

// Update the file path to point to your GLB model
const glbFilePath = "./media/3d/direction_arrows.glb";

gltfLoader.load(glbFilePath, (gltf) => {
  model = gltf.scene;
  model.position.set(0, 0, -0.5); // Adjust the position as needed
  camera.add(model);
});

// Scene setup
let container, scene, camera, renderer;

const init = () => {
  container = document.createElement("div");
  document.body.appendChild(container);

  scene = new THREE.Scene();

  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1.5);
  light.position.set(0.5, 1, 1);
  scene.add(light);

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
  container.appendChild(renderer.domElement);

  document.body.appendChild(
    ARButton.createButton(renderer, {
      requiredFeatures: ["hit-test"],
      optionalFeatures: ["dom-overlay"],
      domOverlay: { root: document.getElementById("overlay") },
    })
  );

  animate();
};

function animate() {
  renderer.setAnimationLoop(render);
}

function render(timestamp, frame) {
  renderer.render(scene, camera);
}

// Run initialization
init();
