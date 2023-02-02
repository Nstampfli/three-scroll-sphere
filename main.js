import { AxesHelper, BufferGeometry,  Clock,  Float32BufferAttribute,  Group,  Line,  LineBasicMaterial,  MathUtils,  Mesh, MeshNormalMaterial, PerspectiveCamera, Points, PointsMaterial, Scene, Sphere, TextureLoader, WebGLRenderer, SphereBufferGeometry, MeshBasicMaterial, SphereGeometry, MeshPhongMaterial, AmbientLight, PointLight  } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import './style.css'


// Récupération de la taille de la fenêtre pour définir la taille de la scène
var width = window.innerWidth;
var height = window.innerHeight;

// Initialisation de la scène
var scene = new Scene();

// Initialisation de la caméra
var camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 5;

// Initialisation du rendu
var renderer = new WebGLRenderer();
renderer.setSize(width, height);

document.body.appendChild(renderer.domElement).style.position='absolute'

// Initialisation des sphères
var sphere1 = new SphereGeometry(0.5, 32, 32);
var sphere2 = new SphereGeometry(0.5, 32, 32);
var sphere3 = new SphereGeometry(0.5, 32, 32);

// Initialisation des matériaux pour les sphères
var material1 = new MeshBasicMaterial({ color: 0x0000ff });
var material2 = new MeshBasicMaterial({ color: 0x00ff00 });
var material3 = new MeshBasicMaterial({ color: 0xffa500 });

// Initialisation des mesh pour les sphères
var mesh1 = new Mesh(sphere1, material1);
var mesh2 = new Mesh(sphere2, material2);
var mesh3 = new Mesh(sphere3, material3);

// Positionnement des sphères sur la scène
mesh1.position.x = -1;
mesh2.position.x = 0;
mesh3.position.x = 1;

// Ajout des sphères sur la scène
scene.add(mesh1);
scene.add(mesh2);
scene.add(mesh3);


// Liste pour stocker les sphères divisées
var dividedSpheres = [];

// Fonction pour diviser les sphères en plusieurs sphères aléatoirement
function divideSphere(mesh) {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  // Déplacement de la scène en fonction du défilement de la page
  renderer.domElement.style.top = scrollTop + "px";

  if (dividedSpheres.length <= 20) {
    var sphere = new SphereGeometry(mesh.geometry.parameters.radius / 2, 32, 32);
    var material = mesh.material.clone();
    var dividedMesh = new Mesh(sphere, material);
      dividedMesh.position.x = mesh.position.x + (Math.random() - 0.5) * 3;
      dividedMesh.position.y = mesh.position.y + (Math.random() - 0.5) * 3;
      dividedMesh.position.z = mesh.position.z + (Math.random() - 0.5) * 3;
    scene.add(dividedMesh);
    dividedSpheres.push(dividedMesh);
  }

  dividedSpheres.forEach(s => {
    s.position.x += (Math.random()-0.5 ) / 3;
    s.position.y += (Math.random()-0.5 ) / 3;
    s.position.z += (Math.random()-0.5 ) / 3;
  })

  mesh1.position.x += (Math.random()-0.5 ) / 3;;
  mesh2.position.x += (Math.random()-0.5 ) / 3;;
  mesh3.position.x += (Math.random()-0.5 ) / 3;;
  mesh1.position.y += (Math.random()-0.5 ) / 3;;
  mesh2.position.y += (Math.random()-0.5 ) / 3;;
  mesh3.position.y += (Math.random()-0.5 ) / 3;;
  mesh1.position.z += (Math.random()-0.5 ) / 3;;
  mesh2.position.z += (Math.random()-0.5 ) / 3;;
  mesh3.position.z += (Math.random()-0.5 ) / 3;;

}

// Ajout de l'écouteur de défilement de la page
window.addEventListener("scroll", function () {
  // Appel de la fonction pour diviser les sphères lors du défilement
  divideSphere(mesh1);
  divideSphere(mesh2);
  divideSphere(mesh3);
});

// Boucle de rendu
var render = function () {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

render();