function BubbleShape_White (radius) {

    var canvas = (function () {

        var canvas = document.createElement('canvas')
        canvas.width = canvas.height = radius * 2

        var c = canvas.getContext('2d')

        var minusHalfRadius = -radius / 2

        var gradient = c.createRadialGradient(0, minusHalfRadius, 0, 0, minusHalfRadius, radius)
        gradient.addColorStop(0, 'hsl(0, 0%, 90%)')
        gradient.addColorStop(1, 'hsl(0, 0%, 70%)')

        c.fillStyle = gradient
        c.translate(radius, radius)
        c.arc(0, 0, radius - 1, 0, Math.PI * 2)
        c.fillStyle = gradient
        c.fill()

        return canvas

    })()

    return {
        paint: function (c, x, y) {
            c.drawImage(canvas, x - radius, y - radius)
        },
    }

}
