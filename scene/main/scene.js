class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    setup() {
        this.numberOfEnemies = 5
        this.bg = GuaImage.new(this.game, 'sky')
        this.player = Player.new(this.game, 'player')
        this.cloud = Cloud.new(this.game)
        this.player.x = 100
        this.player.y = 450
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)
        // 增加敌机
        this.addEnemies()
        // add particles
        var ps = GuaParticleSystem.new(this.game)
        this.addElement(ps)
    }

    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function() {
            s.player.moveLeft()
        })
        g.registerAction('d', function() {
            s.player.moveRight()
        })
        g.registerAction('w', function() {
            s.player.moveUp()
        })
        g.registerAction('s', function() {
            s.player.moveDown()
        })
        g.registerAction('j', function() {
            s.player.fire()
        })
    }
    
    update() {
        this.cloud.y += 1
        super.update()
    }
}

/**
var Scene = function(game) {
    var s = {
        game: game,
    }

    // 初始化
    var paddle = Paddle(game)
    var ball = Ball(game)
    var score = 0
    var blocks = loadLevel(game, 1)

    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })

    s.draw = function() {
        // draw 背景
        game.context.fillStyle = "#5A9BDC"
        game.context.fillRect(0, 0, 400, 300)
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
        // draw blocks
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // draw labels
        game.context.fillText('分数:' + score, 10, 290)
    }

    s.update = function() {
        if (paused) {
            return
        }
        ball.move()
        // 判断游戏结束
        if (ball.y > paddle.y) {
            // 跳转到游戏结束的场景
            var end = SceneEnd.new(game)
            game.replaceScene(end)
            return
        }
        // 判断 ball 和 paddle 相撞
        if (paddle.collide(ball)) {
            ball.rebouce()
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                log('block 和 ball 相撞')
                block.kill()
                ball.rebouce()
                // 更新分数
                score += 100
            }
        }
    }

    // mouse event
    var enableDrag = false
    game.canvas.addEventListener('mousedown', function(event){
        // log(event)
        // 得到鼠标点击位置的坐标
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y, 'down')
        // 检查是否点中了 ball
        if (ball.hasPoint(x, y)) {
            // 设置拖拽状态
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', function(event){
        // log(event)
        // 得到鼠标点击位置的坐标
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y, 'move')
        if (enableDrag) {
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function(event){
        // log(event)
        // 得到鼠标点击位置的坐标
        var x = event.offsetX
        var y = event.offsetY
        log(x, y, 'up')
        enableDrag = false
    })

    return s
}
**/
