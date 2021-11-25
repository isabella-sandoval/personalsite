import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#background'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

torus.position.z = 30;
torus.position.setX(-10);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const gridHelper = new THREE.GridHelper(200, 50);
const lighthelper = new THREE.PointLightHelper(pointLight);

scene.add(lighthelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addObjects(){
  const geometry = new THREE.SphereGeometry(0.25, 24,24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff});
  const obj = new THREE.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

  obj.position.set(x, y, z);
  scene.add(obj)

}

Array(30).fill().forEach(addObjects)

const backgroundTexture = new THREE.TextureLoader().load('background-unsplash.jpg')
scene.background = backgroundTexture;

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();

  renderer.render(scene, camera);

}

animate()


const bellaTexture = new THREE.TextureLoader().load('bella.jpg');

const bella = new THREE.Mesh(
  new THREE.BoxGeometry(10,10,10),
  new THREE.MeshBasicMaterial({ map: bellaTexture })
);

scene.add(bella);


const moonTexture = new THREE.TextureLoader().load('splash.jpg');
const normalTexture = new THREE.TextureLoader().load('splash.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(10);


const conegeometry = new THREE.ConeGeometry( 5, 20, 32 );
const conematerial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cone = new THREE.Mesh( conegeometry, conematerial );
scene.add( cone );


cone.position.z = 50;
cone.position.setX(15);


const cylindergeometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const cylindermaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( cylindergeometry, cylindermaterial );
scene.add( cylinder );

cylinder.position.z = -30;
cylinder.position.setX(-30);
