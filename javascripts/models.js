import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls'
import { GLTFLoader } from 'GLTFLoader'

document.addEventListener('DOMContentLoaded', () => {
  initThree()
})

let currentSceneIndex = 0
let scenes = []
let camera, renderer, controls

function initThree() {
  const model = document.querySelector('.model')

  // Создаём сцену
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#e1e1df')
  scene.position.set(0, -30, 0)

  // Создаём камеру
  camera = new THREE.PerspectiveCamera(50, model.clientWidth / model.clientHeight, 0.1, 3000)
  camera.position.set(-130, 80, 50)

  // Создаём визуализатор-рендерер
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(model.clientWidth, model.clientHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  model.appendChild(renderer.domElement)

  // Подключаем контролы
  controls = new OrbitControls(camera, renderer.domElement)
  controls.autoRotate = true 
  controls.autoRotateSpeed = 3
  controls.enableDamping = true
  controls.maxDistance = 400
  controls.minDistance = 90
  controls.maxPolarAngle = Math.PI / 2.2

  // Добавляем сцены с моделями
  scenes.push(createScene('./3d/house1/house1.gltf', 0))
  scenes.push(createScene('./3d/house2/house2.gltf', 1))
  scenes.push(createScene('./3d/house3/house3.gltf', 2))
  scenes.push(createScene('./3d/house4/house4.gltf', 3))

  renderer.domElement.addEventListener('dblclick', () => switchScene(1))

  animate()
}

function createScene(modelPath, index) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#323232')
  scene.position.set(0, -20, 0)

  // Подключаем модель
  const loader = new GLTFLoader()
  loader.load(
    modelPath,
    (gltf) => {
      scene.add(gltf.scene)
    },
    (error) => {
      console.log('Error loading model:', error)
    }
  )

  // Настраиваем свет
  scene.add(new THREE.AmbientLight(0xeeeeee))
  const light = new THREE.DirectionalLight(0xeeeeee, 1)
  light.position.set(-60, 100, 0)
  light.lookAt(100, 100, 0)
  scene.add(light)

  if (index === 3) {
    light.intensity = 9
    light.color = new THREE.Color(0xffffff)
  }

  return scene
}

function switchScene(direction) {
  currentSceneIndex += direction
  if (currentSceneIndex < 0) currentSceneIndex = scenes.length - 1
  if (currentSceneIndex >= scenes.length) currentSceneIndex = 0

  console.log(`Текущая сцена: ${currentSceneIndex}`)
}

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scenes[currentSceneIndex], camera)
}


window.addEventListener('resize', onWindowResize)

function onWindowResize() {
  const model = document.querySelector('.model')
  const width = model.clientWidth
  const height = model.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
  controls.handleResize()

  if (window.innerWidth <= 768) {
    camera.position.set(-100, 60, 40)
    scenes.forEach(scene => {
      scene.scale.set(0.8, 0.8, 0.8)
    })
  }

  if (window.innerWidth <= 414) {
    camera.position.set(-70, 40, 30)
    scenes.forEach(scene => {
      scene.scale.set(0.6, 0.6, 0.6)
    })
  }
}