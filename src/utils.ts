import { Mesh, SceneSerializer } from "babylonjs";

export function exportMeshes(mesh: Mesh) {
  const json = SceneSerializer.SerializeMesh(mesh, false, false)

  // Configure meshes
  json.meshes.forEach((m: any) => {
    delete m.geometryUniqueId;
    delete m.materialUniqueId;
  });

  json.materials = [];
  json.multiMaterials = [];

  return json
}

