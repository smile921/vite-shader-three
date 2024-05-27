// @ts-nocheck
import { Object3D, Vector3, Scene } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./public/draco/gltf/");
dracoLoader.setDecoderConfig({ type: "js" });

export const loadGlb: (url: string) => Promise<GLTF> = (url) => {
  return new Promise((resolve, reject) => {
    var loader = new GLTFLoader();
    loader.setCrossOrigin("anonymous");
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      url,
      (gltf: GLTF) => {
        resolve(gltf);
      },
      undefined,
      (error: Error) => {
        reject(error);
      }
    );
  });
};

/**
 * 经纬度坐标转球面坐标
 * @param {radius} 地球半径
 * @param {longitude} 经度(角度值)
 * @param {latitude} 纬度(角度值)
 */
export const lon2xyz = (
  radius: number,
  longitude: number,
  latitude: number
): Vector3 => {
  let lon = (longitude * Math.PI) / 180; // 转弧度值
  const lat = (latitude * Math.PI) / 180; // 转弧度值
  lon = -lon; // js坐标系z坐标轴对应经度-90度，而不是90度

  // 经纬度坐标转球面坐标计算公式
  const x = radius * Math.cos(lat) * Math.cos(lon);
  const y = radius * Math.sin(lat);
  const z = radius * Math.cos(lat) * Math.sin(lon);

  // 返回球面坐标
  return new Vector3(x, y, z);
};

/**
 * @description: 销毁物体对象
 * @param {object} THREE.Object3D 销毁的物体
 * @param {parent} THREE.Object3D 销毁的物体的父级，从父级移除物体
 * @return {void}
 */
export const distoryObject = (
  object: Object3D | null,
  parent: Object3D | Scene | null
) => {
  if (object && parent) {
    parent.remove(object);
    const children = object.children as THREE.Mesh[];
    if (!children) return;
    children.forEach(({ geometry, material, children }) => {
      geometry?.dispose();
      if (Array.isArray(material)) {
        material.forEach((m) => m?.dispose());
      } else {
        material?.dispose();
      }
      if (children.length)
        children.forEach((item) => distoryObject(item, object));
    });
  }
};
