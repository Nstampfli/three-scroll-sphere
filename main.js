import { Mesh, PerspectiveCamera, Scene, BufferGeometry,SphereGeometry, WebGLRenderer, MeshStandardMaterial, BoxGeometry, PointLight, AmbientLight, Group, BufferAttribute, PointsMaterial, Points  } from 'three'

import Stats from 'three/examples/jsm/libs/stats.module'

const scene = new Scene()

const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const boxGeometry = new BoxGeometry(0,0,0)
const material = new MeshStandardMaterial()

const cube = new Mesh(boxGeometry, material)
cube.position.set(0, 0.5, -10)
scene.add(cube)

const particlesCount = 1000
const positions = new Float32Array(particlesCount * 3)

for(let i = 0; i < particlesCount; i++)
{
    positions[i * 3 + 0] = (Math.random() - 0.5) * 50
    positions[i * 3 + 1] =  (Math.random() - 0.5) * 50
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50
}

const particlesGeometry = new BufferGeometry()
particlesGeometry.setAttribute('position', new BufferAttribute(positions, 3))
// Material
const particlesMaterial = new PointsMaterial({
    color: '#ffeded',
    sizeAttenuation: true,
    size: 0.03
})

// Points
const particles = new Points(particlesGeometry, particlesMaterial)
const groupParticules = new Group()

groupParticules.add(particles)
scene.add(groupParticules)

const light = new AmbientLight( 0xaaaaaa ); // soft white light
scene.add( light );

const pointLight = new PointLight( 0xaaaaaa, 1, 100 );
pointLight.position.set( 4, 2, 4 );
scene.add( pointLight );

const pointLight2 = new PointLight( 0xaaaaaa, 1, 100 );
pointLight2.position.set( -3, 3, 2 );
scene.add( pointLight2 );


const SphereGeometry1 = new SphereGeometry(0.35, 32, 32);

const material1 = new  MeshStandardMaterial({ color: '#06326c' });
const material2 = new  MeshStandardMaterial({ color: '#031e41' });
const material3 = new  MeshStandardMaterial({ color: '#01eb7b' });

const sphere = new Mesh(SphereGeometry1, material1)
const sphere2 = new Mesh(SphereGeometry1, material2)
const sphere3 = new Mesh(SphereGeometry1, material3)

sphere.position.set(0, 0.5, -5)
sphere2.position.set(-1.1, 0.5, -5)
sphere3.position.set(1.1, 0.5, -5)
const group = new Group()

let lotSphere = []
let lotSphere2 = []
let lotSphere3 = []

let randomPosSphere = []
let randomPosSphere2 = []
let randomPosSphere3 = []

function randomNum(min, max){
    return Math.floor(Math.random() * (max - (min) + 1)) + (min);
}


for(let i=0; i<randomNum(8,16); i++) {
    let a = new Mesh(SphereGeometry1, material1)
    a.position.set(0, 0.5, -5)
    group.add(a)
    lotSphere.push(a)
}
for(let i=0; i<randomNum(8,16); i++) {
    let b = new Mesh(SphereGeometry1, material2)
    b.position.set(-1.1, 0.5, -5)
    group.add(b)
    lotSphere2.push(b)
}
for(let i=0; i<randomNum(8,16); i++) {
    let c = new Mesh(SphereGeometry1, material3)
    c.position.set(1.1, 0.5, -5)
    group.add(c)
    lotSphere3.push(c)
}

for(let i=0; i<20; i++) {
    randomPosSphere.push(randomNum(-6,6))
    randomPosSphere2.push(randomNum(-6,6))
    randomPosSphere3.push(randomNum(-6,6))
}

group.add(sphere)
group.add(sphere2)
group.add(sphere3)
scene.add(group)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

/* Liner Interpolation
 * lerp(min, max, ratio)
 */
function lerp(x, y, a) {
    return (1 - a) * x + a * y
}

// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(start, end) {
    return (scrollPercent - start) / (end - start)
}

const animationScripts = []

//add an animation that spheres moove in orbit
animationScripts.push({
    start: 0,
    end: 101,
    func: () => {
        let orbitRadius = 0.1;
        let date = Date.now() * 0.0007;
        lotSphere.forEach(s =>  s.position.set(
            Math.cos(date) * orbitRadius,
            Math.cos(date) * orbitRadius + 0.5,
            Math.sin(date) * orbitRadius - 5
        ))
        sphere.position.set(
            Math.cos(date) * orbitRadius,
            Math.cos(date) * orbitRadius + 0.5,
            Math.sin(date) * orbitRadius - 5
        );
        lotSphere2.forEach(s2 =>  s2.position.set(
            Math.cos(date) * orbitRadius - 1,
            -Math.sin(date) * orbitRadius + 0.5,
            Math.cos(date) * orbitRadius - 5
        ))
        sphere2.position.set(
            Math.cos(date) * orbitRadius - 1,
            -Math.sin(date) * orbitRadius + 0.5,
            Math.cos(date) * orbitRadius - 5
        );
        lotSphere3.forEach(s3 =>  s3.position.set(
            -Math.cos(date) * orbitRadius +1,
            Math.sin(date) * orbitRadius + 0.5,
            Math.sin(date) * orbitRadius - 5
        ))
        sphere3.position.set(
            -Math.cos(date) * orbitRadius +1,
            Math.sin(date) * orbitRadius + 0.5,
            Math.sin(date) * orbitRadius - 5
        );
    },
})

//add an animation that moves the groupe through first 20 percent of scroll
animationScripts.push({
    start: 0,
    end: 20,
    func: () => {
        camera.lookAt(cube.position)
        camera.position.set(0, 1, 2)
        cube.position.z = lerp(-10, 0, scalePercent(0, 20))
        group.position.z = lerp(0, 5, scalePercent(0, 20))
    },
})
               

//add an animation that moves the camera between 20-50 percent of scroll
animationScripts.push({
    start: 20,
    end: 50,
    func: () => {
        camera.position.x = lerp(0, 2, scalePercent(20, 50))
        camera.position.y = lerp(1, 4, scalePercent(20, 50))
        camera.position.z = lerp(2, -7, scalePercent(20, 50))
        camera.lookAt(cube.position)
    },
})

//add an animation that spheres mooves in space between 50-70 percent of scroll
animationScripts.push({
    start: 50,
    end: 70,
    func: () => {
        lotSphere.forEach((s,i) => {
            s.position.x = lerp(s.position.x, randomPosSphere[i], scalePercent(50, 70))
            s.position.y = lerp(s.position.y, randomPosSphere[i+1], scalePercent(50, 70))
            s.position.z = lerp(s.position.z, randomPosSphere[i+2]-5, scalePercent(50, 70))
        })

        lotSphere2.forEach((s2,i) => {
            s2.position.x = lerp(s2.position.x, randomPosSphere2[i], scalePercent(50, 70))
            s2.position.y = lerp(s2.position.y, randomPosSphere2[i+1], scalePercent(50, 70))
            s2.position.z = lerp(s2.position.z, randomPosSphere2[i+2]-5, scalePercent(50, 70))
        })

        lotSphere3.forEach((s3,i) => {
            s3.position.x = lerp(s3.position.x, randomPosSphere3[i], scalePercent(50, 70))
            s3.position.y = lerp(s3.position.y, randomPosSphere3[i+1], scalePercent(50, 70))
            s3.position.z = lerp(s3.position.z, randomPosSphere3[i+2]-5, scalePercent(50, 70))
        })

        camera.position.x = lerp(2, -4, scalePercent(50, 70))
        camera.position.y = lerp(4, 7, scalePercent(50, 70))
        camera.position.z = lerp(-7, 3, scalePercent(50, 70))

        camera.lookAt(cube.position)

    },
})

//add an animation that spheres mooves in space between 70-90 percent of scroll

animationScripts.push({
    start: 70,
    end: 90,
    func: () => {
        lotSphere.forEach((s,i) => {
            s.position.x = lerp(randomPosSphere[i], randomPosSphere2[i], scalePercent(70, 90))
            s.position.y = lerp(randomPosSphere[i+1], randomPosSphere2[i+1], scalePercent(70, 90))
            s.position.z = lerp(randomPosSphere[i+2]-5, randomPosSphere2[i+2]-5, scalePercent(70, 90))
        })

        lotSphere2.forEach((s2,i) => {
            s2.position.x = lerp(randomPosSphere2[i], randomPosSphere3[i], scalePercent(70, 90))
            s2.position.y = lerp(randomPosSphere2[i+1], randomPosSphere3[i+1], scalePercent(70, 90))
            s2.position.z = lerp(randomPosSphere2[i+2]-5, randomPosSphere3[i+2]-5, scalePercent(70, 90))
        })

        lotSphere3.forEach((s3,i) => {
            s3.position.x = lerp(randomPosSphere3[i], randomPosSphere[i], scalePercent(70, 90))
            s3.position.y = lerp(randomPosSphere3[i+1], randomPosSphere[i+1], scalePercent(70, 90))
            s3.position.z = lerp(randomPosSphere3[i+2]-5, randomPosSphere[i+2]-5, scalePercent(70, 90))
        })

        camera.position.x = lerp(-4, 5, scalePercent(70, 90))
        camera.position.y = lerp(7, 2, scalePercent(70, 90))
        camera.position.z = lerp(3, 4, scalePercent(70, 90))

        camera.lookAt(cube.position)

    },
})

//add an animation that spheres mooves in space between 90-100 percent of scroll

animationScripts.push({
    start: 90,
    end: 100,
    func: () => {
        lotSphere.forEach((s,i) => {
            s.position.x = lerp(randomPosSphere2[i], s.position.x, scalePercent(90, 100))
            s.position.y = lerp(randomPosSphere2[i+1], s.position.y, scalePercent(90, 100))
            s.position.z = lerp(randomPosSphere2[i+2]-5, s.position.z, scalePercent(90, 100))
        })

        lotSphere2.forEach((s2,i) => {
            s2.position.x = lerp(randomPosSphere3[i], s2.position.x, scalePercent(90, 100))
            s2.position.y = lerp(randomPosSphere3[i+1], s2.position.y, scalePercent(90, 100))
            s2.position.z = lerp(randomPosSphere3[i+2]-5, s2.position.z, scalePercent(90, 100))
        })

        lotSphere3.forEach((s3,i) => {
            s3.position.x = lerp(randomPosSphere[i], s3.position.x, scalePercent(90, 100))
            s3.position.y = lerp(randomPosSphere[i+1], s3.position.y, scalePercent(90, 100))
            s3.position.z = lerp(randomPosSphere[i+2]-5, s3.position.z, scalePercent(90, 100))
        })

        camera.position.x = lerp(5, 0, scalePercent(90, 100))
        camera.position.y = lerp(2, 2, scalePercent(90, 100))
        camera.position.z = lerp(4, -4, scalePercent(90, 100))

        camera.lookAt(cube.position)

    },
})

function playScrollAnimations() {
    animationScripts.forEach((a) => {
        if (scrollPercent >= a.start && scrollPercent < a.end) {
            a.func()
        }
    })
}

let scrollPercent = 0

document.body.onscroll = () => {
    //calculate the current scroll progress as a percentage
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        100
    ;(document.getElementById('scrollProgress')).style.width = `${scrollPercent.toFixed(2)}%`
}

const stats = Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    playScrollAnimations()

    render()

    groupParticules.rotation.y += 0.0001

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

window.scrollTo({ top: 0, behavior: 'smooth' })

animate()