import * as THREE from 'three'

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

export default class GameScene extends THREE.Scene
{
    private readonly objectLoader = new OBJLoader()
    private readonly materialLoader = new MTLLoader()

    private readonly camera: THREE.PerspectiveCamera
    private directionVector = new THREE.Vector3()

    private readonly keydown = new Set<string>()

    private blaster?: THREE.Group

    private bulletMaterial?: MTLLoader.MaterialCreator

    constructor(camera: THREE.PerspectiveCamera)
    {
        super()

        this.camera = camera
    }

    async initializeScene()
    {
        const targetMaterial = await this.materialLoader.loadAsync('assets/targetA.mtl')
        targetMaterial.preload()

        this.bulletMaterial = await this.materialLoader.loadAsync('assets/foamBulletB.mtl')
        this.bulletMaterial.preload()

        const redMaterial = new THREE.MeshPhongMaterial({color: 0xFF0000})
        const greenMaterial = new THREE.MeshPhongMaterial({color: 0x00FF00})
        const whiteMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF})

        const target1 = await this.createTarget(targetMaterial)
        target1.position.x = -1
        target1.position.z = -3

        const target2 = await this.createTarget(targetMaterial)
        target2.position.x = 1
        target2.position.z = -3

        const target3 = await this.createTarget(targetMaterial)
        target3.position.x = 2
        target3.position.z = -3

        const target4 = await this.createTarget(targetMaterial)
        target4.position.x = -2
        target4.position.z = -3

        this.add(target1, target2, target3, target4)

        this.blaster = await this.createBlaster()
        this.add(this.blaster)

        this.blaster.position.z = 3
        this.blaster.add(this.camera)  // parenting the blaster to the camera

        this.camera.position.z = 1
        this.camera.position.y = 0.5

        const light = new THREE.DirectionalLight(0xFFFFFF, 1)
        light.position.set(0, 4, 2)

        this.add(light)

        // adding key listeners for player input
        document.addEventListener('keydown', this.handleKeyDown)
        document.addEventListener('keyup', this.handleKeyUp)

    }

    private handleKeyDown = (event: KeyboardEvent) => {
        this.keydown.add(event.key.toLowerCase())
    }

    private handleKeyUp = (event: KeyboardEvent) => {
        this.keydown.delete(event.key.toLowerCase())
    }

    updateInput()
    {
        if(!this.blaster) return

        const direction = this.directionVector
        this.camera.getWorldDirection(direction)

        const speed = 0.1

        // controls forward and backward movement
        if(this.keydown.has('w') || this.keydown.has('arrowup')) this.blaster.position.add(direction.clone().multiplyScalar(speed))
        if(this.keydown.has('s') || this.keydown.has('arrowndown')) this.blaster.position.add(direction.clone().multiplyScalar(-speed))

        // controls turning the player/camera
        if(this.keydown.has('arrowleft')) this.blaster.rotateY(0.02)
        if(this.keydown.has('arrowright')) this.blaster.rotateY(-0.02)


        // controls strafing
        const strafeDirection = direction.clone()
        const upVector = new THREE.Vector3(0, 1, 0)

        if(this.keydown.has('a')) this.blaster.position.add(strafeDirection.applyAxisAngle(upVector, Math.PI / 2).multiplyScalar(speed))

        if(this.keydown.has('d')) this.blaster.position.add(strafeDirection.applyAxisAngle(upVector, -Math.PI / 2).multiplyScalar(speed))


        // when space is pressed the gun shoots
        if(this.keydown.has(' ')) this.createBullet()
    }

    update()
    {
        this.updateInput()
    }

    private async createTarget(material: MTLLoader.MaterialCreator)
    {
        this.objectLoader.setMaterials(material)

        const modelRoot = await this.objectLoader.loadAsync('assets/targetA.obj')

        modelRoot.rotateY(Math.PI / 2)

        return modelRoot
    }

    private async createBlaster()
    {
        const blasterMaterial = await this.materialLoader.loadAsync('assets/blasterG.mtl')
        blasterMaterial.preload()

        this.objectLoader.setMaterials(blasterMaterial)

        const modelRoot = await this.objectLoader.loadAsync('assets/blasterG.obj')
        return modelRoot
    }

    private async createBullet()
    {
        if(!this.blaster) return

        if(this.bulletMaterial) this.objectLoader.setMaterials(this.bulletMaterial)

        const bulletModel = await this.objectLoader.loadAsync('assets/foamBulletB.obj')

        this.camera.getWorldDirection(this.directionVector)

        const boundingBox = new THREE.Box3().setFromObject(this.blaster)
        const size = boundingBox.getSize(new THREE.Vector3())

        const bulletPosition = this.blaster.position.clone()
        bulletPosition.y += 0.06

        bulletModel.position.add(bulletPosition.add(this.directionVector.clone().multiplyScalar(size.z / 2)))

        // rotates the bullets to match the location of the gun
        bulletModel.children.forEach(child => child.rotateX(-Math.PI / 2))
        bulletModel.rotation.copy(this.blaster.rotation)

        this.add(bulletModel)
    }
}