import {
    Group,
    Vector3
} from 'three'

export default class Bullet
{
    public readonly group: Group
    private readonly velocity = new Vector3()

    private isActive = true

    constructor(group: Group)
    {
        this.group = group
        
        setTimeout(() => {
            this.isActive = false
        }, 1000)
    }

    get getStatus()
    {
        return this.isActive
    }

    setVelocity(x: number, y: number, z: number)
    {
        this.velocity.set(x, y, z)
    }

    update()
    {
        this.group.position.x += this.velocity.x
        this.group.position.y += this.velocity.y
        this.group.position.z += this.velocity.z
    }
}