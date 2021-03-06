// scene
var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
// camera
//var camera = new THREE.PerspectiveCamera(100, aspect, 0.1, 1000);
var camera = new THREE.OrthographicCamera(
	-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, 1, 1000 );
camera.position.z = 500;

// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

var loader = new THREE.TextureLoader();
// mesh = geometry + material(texture)
var geometry = new THREE.SphereGeometry(150, 128, 128);
var texture = loader.load('earth2.png');
var material = new THREE.MeshPhongMaterial({
	color: 0x99FFFF,
	specular: 0x333333,
	shininess: 20, 
	map: texture,
  specularMap: texture,
  normalMap: texture,
});
var earth = new THREE.Mesh(geometry, material);

// three point lighting
var keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
var fillLight = new THREE.DirectionalLight(0xffffff, 1.5);
var rimLight = new THREE.DirectionalLight(0xffffff, 1.5);

keyLight.position.set(0, -80, 80);
fillLight.position.set(80, 0, -80);
rimLight.position.set(-80, 80, 0);

// put mesh and light into scene
scene.add(earth);
scene.add(keyLight);
scene.add(fillLight);
scene.add(rimLight);

// animation and interacton
var clock = new THREE.Clock();
var controls = new THREE.OrbitControls(camera);

var render = function () {
	requestAnimationFrame(render);
	//self-rotation
	earth.rotation.x += 0.01;//THREE.Math.degToRad(45);
	earth.rotation.y += 0.01;//THREE.Math.degToRad(45);
	// orbit-rotation
	var time = clock.getElapsedTime() * 0.5;
	earth.position.x = Math.cos(time) * 300;
	earth.position.y = Math.sin(time) * 300;
 
	controls.update();
	renderer.render(scene, camera);
};

render();