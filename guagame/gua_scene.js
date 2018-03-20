class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModeEnable = true
        this.elements = []
    }

    // 改造 new GuaScene() 的语法
    static new(game) {
        var i = new this(game)
        return i
    }

    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }

    draw() {
        for (var e of this.elements) {
            // this.game.drawImage(e)
            e.draw()
        }
    }

    update() {
        this.debug && this.debug()
        if (this.debugModeEnable) {
            for (var i = 0; i < this.elements.length; i++) {
                var e = this.elements[i]
                // 如果该元素设置了 debug,就调用该元素自己的 debug 方法
                e.debug && e.debug()
            }
        }
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }
}
