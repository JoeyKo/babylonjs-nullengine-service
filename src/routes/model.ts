import { Mesh, NullEngine, Scene, SceneLoader } from "babylonjs";
import "babylonjs-loaders";
import express, { NextFunction } from 'express';
import { Request, Response } from "express";
import { FBXLoader } from "../loaders/fbx/loader";
import { exportMeshes } from "../utils";
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
    const { meshes } = await SceneLoader.ImportMeshAsync("", "http://localhost:4100/models/", "Kaws Base.fbx", scene);
    for (const mesh of meshes.filter((m: any) => m.subMeshes)) {
      jsonMeshes.push(exportMeshes(mesh as Mesh))
    }
    res.json({ data: jsonMeshes })

  } catch (err) {
    next(err)
  }
});

export default router;
