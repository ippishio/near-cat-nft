
import * as THREE from 'three';
import {isOpen, randID, isSignedIn} from "./near.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const textureload = new THREE.TextureLoader();
const backgroundTexture = textureload.load('bg.jpg');

scene.background = backgroundTexture;
var TopMaterialArray = [];
TopMaterialArray.push( new THREE.MeshStandardMaterial({map: textureload.load("side_top.png") }));
TopMaterialArray.push( new THREE.MeshStandardMaterial({map: textureload.load("side_top.png") }));
TopMaterialArray.push( new THREE.MeshStandardMaterial({map: textureload.load("top.png") }));
TopMaterialArray.push(  new THREE.MeshStandardMaterial({map: textureload.load("top.png") }));
TopMaterialArray.push( new THREE.MeshStandardMaterial({map: textureload.load("side_top.png") }));
TopMaterialArray.push(  new THREE.MeshStandardMaterial({map: textureload.load("side_top.png") }));
var BotMaterialArray = [];
BotMaterialArray.push( new THREE.MeshStandardMaterial({map: textureload.load("side_bot.png") }));
BotMaterialArray.push( new THREE.MeshStandardMaterial({map: textureload.load("side_bot.png") }));
BotMaterialArray.push( new THREE.MeshStandardMaterial({map: textureload.load("top.png") }));
BotMaterialArray.push(  new THREE.MeshStandardMaterial({map: textureload.load("top.png") }));
BotMaterialArray.push( new THREE.MeshStandardMaterial({map: textureload.load("side_bot.png") }));
BotMaterialArray.push(  new THREE.MeshStandardMaterial({map: textureload.load("side_bot.png") }));
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.set(0,10,30);
camera.rotation.set(-0.2,0,0);
const crateGeometry = new THREE.BoxGeometry(10,5,10);
const crateTop = new THREE.Mesh(crateGeometry, TopMaterialArray);
const crateBot = new THREE.Mesh(crateGeometry, BotMaterialArray);
const geometry = new THREE.TorusGeometry(10,2,16,100);
const material = new THREE.MeshStandardMaterial({color: 0x3c3b3b, wireframe: false});
const torus = new THREE.Mesh(geometry, material);
const ambientLight = new THREE.AmbientLight(0xffffff);
crateTop.position.setY(5);
scene.add(ambientLight);
//scene.add(torus);
var image;
if(isOpen) {
 const imageTexture = new THREE.MeshStandardMaterial({map: textureload.load("images/"+randID.toString()+".png") })
 const imageGeometry = new THREE.PlaneGeometry(10,10);
 image = new THREE.Mesh(imageGeometry, imageTexture);
 image.position.set(0,10,0);
}
scene.add(crateTop,crateBot);
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
  if(isOpen) {
    crateTop.rotation.y =0;
    crateBot.rotation.y += 0.005;
    crateTop.position.y += 0.2;
    if(crateTop.position.y > 12)
      scene.add(image);
    //crateBot.position.y -= 0.7;
  } else {
    crateTop.rotation.y += 0.02;
    crateBot.rotation.y += 0.02;
    
  }
}
animate()