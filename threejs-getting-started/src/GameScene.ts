import * as THREE from 'three'

export default class GameScene extends THREE.Scene
{
    initializeScene()
    {
        const cubeGemometry = new THREE.BoxGeometry()
        const phongMaterial = new THREE.MeshPhongMaterial({color: 0xFFAD00})

        const cube = new THREE.Mesh(cubeGemometry, phongMaterial);
        cube.position.z = -5
        cube.position.y = -1
        this.add(cube);

        const light = new THREE.DirectionalLight(0xFFFFFF, 1)
        light.position.set(0, 4, 2)
        this.add(light)
    }

    update()
    {
        
    }
}