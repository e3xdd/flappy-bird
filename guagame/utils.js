const e = (selector) => {
    return document.querySelector(selector)
}

const log = console.log.bind(console)

// 新的 log 函数,为了把调试信息打印到页面上
// const log = (s) => {
//     e('#id-text-log').value += '\n' + s
// }

// 抽离出碰撞检测的函数
const rectIntersects = (a, b) => {
    var o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}

// 分离出 载入图片的 函数
const imageFromPath = (path) => {
    var img = new Image()
    img.src = path
    return img
}


const randomBetween = (start, end) => {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}
