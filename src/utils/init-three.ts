// @ts-nocheck

 import { Scene, 
    Clock, AxesHelper, 
    PerspectiveCamera, 
    AmbientLight, ACESFilmicToneMapping,
    WebGLRenderer, Mesh, DoubleSide, ShaderMaterial, PlaneGeometry  } from 'three'
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

 type Config = {
   camera : PerspectiveCamera,
   scene : Scene,
   renderer : WebGLRenderer,
   controls : OrbitControls,
   clock : Clock
 }

export function init(dom : HTMLElement, config : Config ) {
  let {camera, scene, renderer, controls, clock } = config
  scene = new Scene();
  clock = new Clock()

  const axesHelper = new AxesHelper(20);
  scene.add(axesHelper);

  const w = window.innerWidth;
  const h = window.innerHeight;
  const asp = w / h;

  camera = new PerspectiveCamera(60, asp, 0.1, 999999);
  camera.position.set(0, 0, 6.5);
  scene.add(camera);

  const light = new AmbientLight(0xffffff, 1);
  light.position.copy(camera.position);
  scene.add(light);

  // const dlight = new THREE.DirectionalLight(0xffffff, 1);
  // dlight.position.set(0, 0, 150);
  // scene.add(dlight);

  renderer = new WebGLRenderer();
  renderer.setSize(w, h);
  renderer.setClearColor('#e6fcf5',1);

//   renderer.outputEncoding = THREE.sRGBEncoding; // 定义渲染器的输出编码
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.5; // 色调映射的曝光级别。默认是1
  const domToAttach : HTMLElement = dom ? dom : document.body 
  domToAttach.appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
}

export function animate(config : Config ) {
  let {camera, scene, renderer, controls, clock } = config
  renderer.render(scene, camera); 
  controls.update();
  window.requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const asp = w / h;
  camera.aspect = asp;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  renderer.setClearColor('#e6fcf5',1);
  renderer.render(scene, camera);
  renderer.setPixelRatio(window.devicePixelRatio);
});

export function setFrag(mesh : Mesh,
    title : String, 
    str : String, 
    materialStr = 'float color = 1.0;') {

  mesh.material.fragmentShader = mesh.material.fragmentShader.replace(
      `${materialStr}`,
      [`//${title}`, str].join("\n")

  )

}
export function createMesh(vertexShader : String | undefined,fragmentShader : String | undefined){
  if(!vertexShader){
    vertexShader = ` 
    varying vec2 vUv;
    void main(){ 
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 ); 
        vUv=uv;
    } `;
  }
  if(!fragmentShader){
    fragmentShader = ` 
    // fragmentFn;
    varying vec2 vUv;
    
    void main(){ 
        float color = 1.0;
        // replaceFragmentShader;
        gl_FragColor =vec4(color,color,color,1.0);
    } 
    
    `;
  }

  const material = new ShaderMaterial({
    transparent: true,
    side: DoubleSide,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });
  const mesh = new Mesh(new PlaneGeometry(1, 1), material)
  return mesh;
}
