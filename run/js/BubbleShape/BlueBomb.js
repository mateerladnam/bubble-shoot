function BubbleShape_BlueBomb (radius, scale) {

    var color = 'hsl(220, 100%, 70%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(220, 100%, 55%)', radius)
    BubbleShape_Bomb(canvas, radius)

    var particleCanvases = BombParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'blue',
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
