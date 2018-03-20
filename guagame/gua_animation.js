class GuaAnimation {
    constructor(game) {
        this.game = game
        this.animations = {
            idle: [],
        }
        // this.initAnimations('run')
        // this.initAnimations('idle')
        // this.initAnimations('b')
        // this.animationName =  'idle'
        this.setup()
    }

    setup() {
        for (var i = 1; i < 5; i++) {
            var name = `b${i}`
            var t = this.game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.animationName =  'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3
        this.alpha = 1
        // 是否水平翻转
        this.flipX = false
        this.rotation = 0
        // 重力和加速度
        this.gy = 10
        this.vy = 0
    }

    static new(game) {
        return new this(game)
    }

    frames() {
        return this.animations[this.animationName]
    }

    update() {
        // 更新 alpha (图片的透明度)
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 510
        if (this.y > h) {
            this.y = h
        }
        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 2
            // 切换当前活动的图片的下标
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            // 切换当前的图片
            this.texture = this.frames()[this.frameIndex]
        }
    }

    draw() {
        var context = this.game.context
        // 翻转画布
        context.save()
        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(this.texture, 0, 0)
        context.restore()
    }

    changeAnimation(name) {
        this.animationName = name
    }

    jump() {
        this.vy = -10
        this.rotation = -45
    }

    move(x, keyStatus) {
        // if (x < 0) {
        //     this.flipX = true
        // } else {
        //     this.flipX = flase
        // }
        this.flipX = (x < 0)
        // var animationName = {
        //     down: 'run',
        //     up: 'idle',
        // }
        // var name = animationName[keyStatus]
        // this.changeAnimation(name)

        // if (keyStatus == 'down') {
        //     this.changeAnimation('run')
        // }
        // if (keyStatus == 'up') {
        //     this.changeAnimation('idle')
        // }
        this.x += x
    }
}
