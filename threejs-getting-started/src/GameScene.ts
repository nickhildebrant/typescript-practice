import * as THREE from 'three'

import { Object3D } from 'three';
import { MaterialLoader } from 'three';

export default class GameScene extends THREE.Scene
{
    private readonly objectLoader = new THREE.ObjectLoader()
    private readonly materialLoader = new THREE.MaterialLoader()

    initializeScene()
    {
        const cubeGemometry = new THREE.BoxGeometry()
        const sphereGeometry = new THREE.SphereGeometry()

        const redMaterial = new THREE.MeshPhongMaterial({color: 0xFF0000})
        const greenMaterial = new THREE.MeshPhongMaterial({color: 0x00FF00})
        const whiteMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF})

        const leftPaddle = new THREE.Mesh(cubeGemometry, redMaterial);
        leftPaddle.position.x = 2
        leftPaddle.position.y = 0
        leftPaddle.position.z = -10

        const rightPaddle = new THREE.Mesh(cubeGemometry, greenMaterial);
        rightPaddle.position.x = -2
        rightPaddle.position.y = 0
        rightPaddle.position.z = -10

        const ball = new THREE.Mesh(sphereGeometry, whiteMaterial)
        ball.position.x = 0
        ball.position.y = 0
        ball.position.z = -10

        this.add(leftPaddle, rightPaddle, ball)

        const lightLeft = new THREE.DirectionalLight(0xFFFFFF, 1)
        lightLeft.position.set(1, 2, 2)

        const lightRight = new THREE.DirectionalLight(0xFFFFFF, 1)
        lightRight.position.set(-1, 2, 2)

        this.add(lightLeft, lightRight)
    }

    update()
    {
        
    }
}