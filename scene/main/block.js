var Block = function(game, position) {
    // position 是 [0, 0] 格式
    var p = position
    // var image = imageFromPath('block.png')
    var img = game.imageByName('block')
    var o = {
        x: p[0],
        y: p[1],
        lives: p[2] || 1,
        alive: true,
    }
    o.image = img.image
    o.w = img.w
    o.h = img.h
    o.kill = function() {
        o.lives --
        if (o.lives < 1) {
            o.alive = false
        }
    }
    // 砖块与球是否碰撞
    o.collide = function(b) {
        // 只有在 block 存活的状态下,才去检测是否碰撞
        if (o.alive) {
            return rectIntersects(o, b) || rectIntersects(b, o)
        }
        return false
    }
    return o
}

class Block {
    constructor(game, position) {
        this.game = game
        // position 是 [0, 0] 格式
        this.position = position
        this.setup()
    }

    static new(game, position) {
        return new this(game, position)
    }

    setup() {
        this.x = (this.position)[0]
        this.y = (this.position)[1]
        this.img = game.imageByName('block')
        this.texture = this.img.image
        this.w = this.texture.w
        this.h = this.texture.h
        this.lives = (this.position)[2] || 1
        this.alive = true
    }

    kill() {
        var o = this
        o.lives --
        if (o.lives < 1) {
            o.alive = false
        }
    }

    // 砖块与球是否碰撞
    collide(b) {
        // 只有在 block 存活的状态下,才去检测是否碰撞
        var o = this
        if (o.alive) {
            return rectIntersects(o, b) || rectIntersects(b, o)
        }
        return false
    }
}
