import { AbstractMesh, Material, Mesh, NullEngine, Scene, SceneLoader } from "babylonjs";
import "babylonjs-loaders";
import express, { NextFunction } from 'express';
import { Request, Response } from "express";
import { FBXLoader } from "../loaders/fbx/loader";
import { exportMaterial, exportMeshes, exportTexture } from "../utils";
(global as any).XMLHttpRequest = require('xhr2').XMLHttpRequest;

SceneLoader.RegisterPlugin(new FBXLoader());

const engine = new NullEngine();
const router = express.Router();

/* POST models loader. */
router.post('/loader', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. upload file through api gateway
    // 2. minio return files url
    // 3. load files and serialize meshes materials and textures.
    const scene = new Scene(engine);
    const jsonMeshes = [];
    const jsonMaterials = [];
    const jsonTextures = [];
    const { rootUrl, sceneFileName } = req.body;
    const { meshes } = await SceneLoader.ImportMeshAsync("", rootUrl, sceneFileName, scene);
    const materials = scene.materials;
    const textures = scene.textures;
    for (const mesh of meshes.filter((m: AbstractMesh) => m.subMeshes)) {
      jsonMeshes.push(exportMeshes(mesh as Mesh))
    }

    for (const material of materials.filter((m: Material) => m !== scene.defaultMaterial)) {
      jsonMaterials.push(exportMaterial(material));
    }

    for (const texture of textures) {
      jsonTextures.push(exportTexture(texture));
    }

    res.json({ meshes: jsonMeshes, materials: jsonMaterials, textures: jsonTextures })
  } catch (err) {
    next(err)
  }
});

export default router;
