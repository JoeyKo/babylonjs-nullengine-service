const express = require('express')
const app = express()
const port = 4100;
const BABYLON = require("babylonjs");
const LOADERS = require("babylonjs-loaders");
global.XMLHttpRequest = require('xhr2').XMLHttpRequest;

const engine = new BABYLON.NullEngine();

app.get('/model-loader', async (req, res) => {
  // 1. upload file through api gateway
  // 2. minio return files url
  // 3. 
  const scene = new BABYLON.Scene(engine);
  const { meshes } = await BABYLON.SceneLoader.ImportMeshAsync("", "https://www.babylonjs.com/Assets/DamagedHelmet/glTF/", "DamagedHelmet.gltf", scene);
  for (const mesh of meshes) {
    console.log(mesh.serialize())
  }
  res.send(scene.meshes.map(mesh => mesh.name).join(','))
})

app.listen(port, () => {
  console.log(`NullEngine Babylon Listen on: ${port}`)
})