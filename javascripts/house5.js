import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls'
import { GLTFLoader } from 'GLTFLoader'

document.addEventListener('DOMContentLoaded', () => {
  initThree()
})

function initThree() {
  const model = document.querySelector('.house5')
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#323232')

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  )
  camera.position.set(-130, 80, 50)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  model.appendChild(renderer.domElement)

  const loader = new GLTFLoader()
  let houseModel = null

  loader.load(
    './3d/house5/house5.gltf',
    (gltf) => {
      houseModel = gltf.scene
      houseModel.scale.set(1, 1, 1) // Устанавливаем стандартный масштаб
      scene.add(houseModel)
      console.log("Модель загружена!") // Проверяем загрузку
      updateScale()
    },
    undefined,
    (error) => {
      console.log('Error:', error)
    }
  )

  const light = new THREE.AmbientLight(0xeeeeee)
  scene.add(light)

  const dirLight1 = new THREE.DirectionalLight(0xeeeeee, 1)
  dirLight1.position.set(-80, 100, 0)
  scene.add(dirLight1)

  const dirLight2 = new THREE.DirectionalLight(0xeeeeee, 1)
  dirLight2.position.set(50, 100, 0)
  scene.add(dirLight2)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.autoRotate = true
  controls.autoRotateSpeed = 3
  controls.enableDamping = true
  controls.maxDistance = 200
  controls.minDistance = 20
  controls.maxPolarAngle = Math.PI / 2.2

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  function updateScale() {
    if (!houseModel) return // Если модель ещё не загружена, выходим

    if (window.innerWidth >= 414) {
      camera.position.set(-10, 0, 20)
      houseModel.scale.set(0.1, 0.1, 0.1)
      console.log("Масштаб уменьшен до 0.5 при ширине <= 414px")
    } else if (window.innerWidth <= 768) {
      camera.position.set(-100, 60, 40)
      houseModel.scale.set(0.7, 0.7, 0.7)
      console.log("Масштаб уменьшен до 0.7 при ширине <= 768px")
    } else {
      camera.position.set(-130, 80, 50)
      houseModel.scale.set(1, 1, 1) // Оригинальный масштаб при больших экранах
      console.log("Масштаб 1.0 при ширине > 768px")
    }
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    updateScale()
  })
}
