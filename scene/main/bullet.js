class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }

    setup() {
        // this.speed = 2
        this.debug()
    }

    update() {
        this.y -= this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
    
    debug() {
        this.speed = config.bullet_speed
    }
}
