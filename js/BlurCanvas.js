function BlurCanvas (canvasWidth, canvasHeight) {

    var canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    var c = canvas.getContext('2d')

    return {
        c: c,
        canvas: canvas,
        clear: function () {
            c.globalCompositeOperation = 'destination-out'
            c.fillStyle = 'rgba(0, 0, 0, 0.1)'
            c.fillRect(0, 0, canvasWidth, canvasHeight)
            c.globalCompositeOperation = 'source-over'
        },
    }

}
