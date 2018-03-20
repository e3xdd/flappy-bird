class GuaGrounds {
    constructor(game) {
        this.game = game
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 550
            this.grounds.push(g)
        }
        this.skipCount = 5
    }
    static new(game) {
        return new this(game)
    }
    draw() {
        for (var g of this.grounds) {
            g.draw()
        }
    }
    update() {
        // 地面移动
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
    }
}
