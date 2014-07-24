function BreakingBubble (x, y, shape) {

    var maxSteps = 16
    var stepIndex = maxSteps
    var fullCircle = Math.PI * 2

    var particles = []
    for (var i = 0; i < 4; i++) {
        var randomXY = RandomXY(4)
        particles.push({
            x: x,
            y: y,
            dx: randomXY[0],
            dy: randomXY[1],
        })
    }

    return {
        paint: function (c) {

            if (stepIndex == maxSteps) shape.paint(c, x, y)

            for (var i = 0; i < particles.length; i++) {
                var particle = particles[i],
                    px = particle.x,
                    py = particle.y
                c.beginPath()
                c.moveTo(px, py)
                c.globalAlpha = stepIndex / maxSteps
                c.fillStyle = shape.color
                c.arc(px, py, 4, 0, fullCircle)
                c.fill()
                c.globalAlpha = 1
            }

        },
        tick: function () {

            for (var i = 0; i < particles.length; i++) {
                var particle = particles[i]
                particle.x += particle.dx
                particle.y += particle.dy
            }

            stepIndex--
            if (!stepIndex) return true

        },
    }

}