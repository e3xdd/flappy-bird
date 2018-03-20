class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }

    setup() {
        this.life = 20
    }

    // vx vy 加速度
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    static new(game) {
        return new this(game)
    }

    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
    }
}

class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }

    setup() {
        this.duration = 50
        this.x = 150
        this.y = 200
        this.numberOfParticles = 20
        this.particles= []
    }

    static new(game) {
        return new this(game)
    }

    draw() {
        if (this.duration < 0) {
            // TODO, 这是一个临时的方案
            // 应该从 scene 中删除自己才对
            return
        }
        for(var p of this.particles) {
            p.draw()
        }
    }

    update() {
        this.duration--
        // 添加一个小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            var s = 2
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            // 设置初始化坐标
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有的小火花
        for(var p of this.particles) {
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
}
