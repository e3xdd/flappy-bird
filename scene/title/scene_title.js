class GuaPipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        // 上下管子的距离
        this.pipeSpace = 100
        // 管子的横向间距
        this.alignPipeSpace = 200
        // 3 列管子
        this.columsOfPipe = 3
        for (var i = 0; i < this.columsOfPipe; i++) {
            // 每一列 上下两根管子 p1 p2
            var p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.alignPipeSpace
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }

    static new(game) {
        return new this(game)
    }

    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-150, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }

    debug() {
        this.alignPipeSpace = config.pipe_alignPipeSpace.value
        this.pipeSpace = config.pipe_space.value
    }

    update() {
        for (var i = 0; i < this.pipes.length / 2; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100) {
                p1.x += this.alignPipeSpace * this.columsOfPipe
            }
            if (p2.x < -100) {
                p2.x += this.alignPipeSpace * this.columsOfPipe
                this.resetPipesPosition(p1, p2)
            }
        }
    }

    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            // 翻转画布
            context.save()
            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)
            context.restore()
        }
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // var ps = GuaParticleSystem.new(this.game)
        // this.addElement(ps)
        // var label = GuaLable.new(game, 'hello')
        // this.addElement(label)
        this.setupInputs()

        // bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        // this.pipe = GuaPipes.new(game)
        // this.addElement(this.pipe)
        var pipes = GuaPipes.new(game)
        this.addElement(pipes)
        // 循环移动的地面
        var grounds = GuaGrounds.new(game)
        this.addElement(grounds)
        // bird
        var b = GuaAnimation.new(this.game)
        this.birdSpeed = 2
        b.x = 180
        b.y = 200
        this.bird = b
        this.addElement(b)

        this.setupInputs()
    }

    debug() {
        this.birdSpeed = config.bird_speed.value
    }

    setupInputs() {
        var self = this
        var b = this.bird
        this.game.registerAction('a', function(keyStatue){
            b.move(-self.birdSpeed, keyStatue)
        })
        this.game.registerAction('d', function(keyStatue){
            b.move(self.birdSpeed, keyStatue)
        })
        this.game.registerAction('j', function(keyStatue){
            b.jump()
        })
    }

    draw() {
        // draw labels
        // this.game.context.fillText('按 k 游戏开始', 100, 100)
        super.draw()
    }

    update() {
        super.update()
    }
}

/**
var SceneTitle = function(game) {
    var s = {
        game: game,
    }

    game.registerAction('k', function(){
        var s = Scene(game)
        game.replaceScene(s)
    })

    s.draw = function() {
        // draw labels
        game.context.fillText('按 k 游戏开始', 100, 100)
    }

    s.update = function() {
    }

    return s
}
**/
