import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import sounds from "../media/sounds/*.mp3";
import glbs from "../media/3d/*.glb";

let models = {};

export let glbSrc = glbs;

export const preload = async () => {
  models.faith = await loadMesh(glbs.faith);
};

export let loadMesh = async (url) => {
  const gltf = await modelLoader(url);
  return gltf.scene.children[0];
};

const loader = new GLTFLoader();

// this utility function allows you to use any three.js
// loader with promises and async/await
const modelLoader = (url) => {
  return new Promise((resolve, reject) => {
    loader.load(url, (data) => resolve(data), null, reject);
  });
};

export const spawn = (thing) => {
  let obj = {};

  if (thing === "pong") {
    if (Math.random() > 0.05) {
      const g = new THREE.SphereBufferGeometry(0.05, 16, 16);
      const m = new THREE.MeshLambertMaterial({ color: 0xcccccc });
      obj.mesh = new THREE.Mesh(g, m);
      obj.rDamp = 0;
    } else {
      // spawn super secret oio bonus paddle
      let paddle = models.paddle.clone();
      paddle.rotation.set(0, Math.random() * 10, 0);
      obj.mesh = paddle;
      obj.rDamp = 0.01 + Math.random() * 0.01;
    }
    obj.sound = sounds.pong;
    obj.mass = 1;
  }

  if (thing === "faith") {
    let faith = models.faith.clone();
    faith.rotation.set(0, Math.random() * 10, 0);
    obj.mesh = faith;
    obj.sound = sounds.laser;
    obj.mass = 3;
    obj.rDamp = 0.01 + Math.random() * 0.03;
  }

  return obj;
};
