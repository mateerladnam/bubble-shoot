function BubbleShape_WhiteBomb (radius, scale) {

    var color = 'hsl(0, 0%, 90%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(0, 0%, 70%)', radius)
    BubbleShape_Bomb(canvas, radius)

    var particleCanvases = BombParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'white',
        isBomb: true,
        getParticleCanvases: function (number) {
            var canvases = []
            for (var i = 0; i < number; i++) canvases.push(particleCanvases)
            return canvases
        },
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
