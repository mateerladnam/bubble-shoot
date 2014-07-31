(function () {
function Background (width, canvasHeight, bubbleDiameter, dpp) {

    var bubbleRadius = bubbleDiameter / 2,
        padding = 8 * dpp,
        lineWidth = 4 * dpp,
        lineY = bubbleRadius - lineWidth / 2,
        paddedRadius = bubbleRadius + padding,
        angle = Math.asin(lineY / paddedRadius),
        cos = Math.sqrt(1 - Math.pow(lineY / paddedRadius, 2)) * paddedRadius,
        height = bubbleDiameter + padding + lineWidth,
        halfWidth = width / 2,
        y = canvasHeight - height

    var canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    var c = canvas.getContext('2d')
    c.lineJoin = c.lineCap = 'round'
    c.translate(halfWidth, height - bubbleRadius)
    c.moveTo(-halfWidth + lineWidth, -lineY)
    c.lineTo(-cos, -lineY)
    c.arc(0, 0, paddedRadius, -Math.PI + angle, -angle)
    c.lineTo(halfWidth - lineWidth, -lineY)
    c.strokeStyle = '#555'
    c.lineWidth = lineWidth
    c.stroke()

    return {
        paint: function (c) {
            c.drawImage(canvas, 0, y)
        },
    }

}
;
function BlurCanvas (canvasWidth, canvasHeight) {

    var canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    var c = canvas.getContext('2d')

    return {
        c: c,
        canvas: canvas,
        clear: function () {
            c.fillStyle = 'rgba(0, 0, 0, 0.3)'
            c.fillRect(0, 0, canvasWidth, canvasHeight)
        },
    }

}
;
function BombNeighbors (columns, neighbors) {

    function checkAndInclude (colNumber, rowNumber) {

        var bubbles = columnsAndRows[colNumber]
        if (!bubbles) return

        var bubble = bubbles[rowNumber]
        if (!bubble || bombNeighbors[bubble.id]) return

        bombNeighbors[bubble.id] = bubble
        if (bubble.shape.isBomb)include(bubble)

    }

    function include (bubble) {
        var colNumber = bubble.colNumber
        var rowNumber = bubble.rowNumber
        checkAndInclude(colNumber - 2, rowNumber)
        checkAndInclude(colNumber + 2, rowNumber)
        checkAndInclude(colNumber - 1, rowNumber - 1)
        checkAndInclude(colNumber + 1, rowNumber - 1)
        checkAndInclude(colNumber - 1, rowNumber + 1)
        checkAndInclude(colNumber + 1, rowNumber + 1)
    }

    var columnsAndRows = {}
    for (var i in columns) {
        var bubbles = columns[i]
        columnsAndRows[i] = {}
        for (var j in bubbles) {
            var itemBubble = bubbles[j]
            columnsAndRows[i][itemBubble.rowNumber] = itemBubble
        }
    }

    var bombNeighbors = {}
    for (var i = 0; i < neighbors.length; i++) {
        var bubble = neighbors[i]
        bombNeighbors[bubble.id] = bubble
        if (bubble.shape.isBomb) include(bubble)
    }
    return bombNeighbors

}
;
function BombParticleCanvases (scale, color) {
    var steps = 24
    var canvases = []
    for (var i = 0; i < steps; i++) {
        canvases.push(ParticleCanvas(scale, color, steps, i))
    }
    return canvases
}
;
function BreakingBubble (x, y, shape, scale) {

    var particelScale
    var numParticles
    if (shape.isBomb) {
        particelScale = 3 * scale
        numParticles = 10
    } else {
        particelScale = 2 * scale
        numParticles = 5
    }

    var index = 0
    var particleCanvases = shape.getParticleCanvases(numParticles)

    var particles = []
    for (var i = 0; i < numParticles; i++) {
        var locationXY = RandomXY(particelScale, particelScale)
        var directionXY = RandomXY(particelScale, particelScale)
        particles.push({
            canvases: particleCanvases[i],
            x: x + locationXY[0],
            y: y + locationXY[1],
            dx: directionXY[0],
            dy: directionXY[1],
        })
    }

    return {
        id: Math.random(),
        paint: function (c) {

            if (!index) shape.paint(c, x, y)

            for (var i in particles) {
                var particle = particles[i],
                    canvas = particle.canvases[index],
                    px = particle.x - canvas.width / 2,
                    py = particle.y - canvas.height / 2
                c.drawImage(canvas, px, py)
            }

        },
        tick: function () {

            for (var i in particles) {
                var particle = particles[i]
                particle.x += particle.dx
                particle.y += particle.dy
            }

            index++
            if (index == particleCanvases[0].length) return true

        },
    }

}
;
function BreakingCanvas (scale) {

    var breakingBubbles = {}

    return {
        add: function (x, y, shape) {
            var bubble = BreakingBubble(x, y, shape, scale)
            breakingBubbles[bubble.id] = bubble
        },
        paint: function (c) {
            for (var i in breakingBubbles) breakingBubbles[i].paint(c)
        },
        tick: function () {
            for (var i in breakingBubbles) {
                if (breakingBubbles[i].tick()) delete breakingBubbles[i]
            }
        },
    }

}
;
function Collide (movingBubbles, stillBubbles, bubbleVisualDiameter) {
    var collisions = []
    for (var i in movingBubbles) {
        var movingBubble = movingBubbles[i]
        for (var j in stillBubbles) {

            var stillBubble = stillBubbles[j],
                dx = stillBubble.x - movingBubble.x,
                dy = stillBubble.y - movingBubble.y,
                distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < bubbleVisualDiameter) {
                collisions.push({
                    movingBubble: movingBubble,
                    stillBubble: stillBubble,
                    distance: distance,
                })
                break
            }

        }
    }
    return collisions
}
;
function FallingCanvas (scale) {

    var fallingBubbles = {}

    return {
        add: function (x, y, shape) {
            var bubble = FallingBubble(x, y, shape, scale)
            fallingBubbles[bubble.id] = bubble
        },
        paint: function (c) {
            for (var i in fallingBubbles) fallingBubbles[i].paint(c)
        },
        tick: function () {
            for (var i in fallingBubbles) {
                if (fallingBubbles[i].tick()) delete fallingBubbles[i]
            }
        },
    }

}
;
function FallingBubble (x, y, shape, scale) {

    var maxSteps = 32,
        stepsLeft = maxSteps,
        opacity = 1,
        dx = (Math.random() * 2 - 1) * 6 * scale,
        dy = 0

    return {
        id: Math.random(),
        paint: function (c) {
            c.globalAlpha = opacity
            shape.paint(c, x, y)
            c.globalAlpha = 1
        },
        tick: function () {
            x += dx
            y += dy
            dy += scale
            dx *= 0.95
            stepsLeft--
            if (!stepsLeft) return true
            opacity = stepsLeft / maxSteps
        },
    }

}
;
function Laser (canvasWidth, canvasHeight, bubbleRadius, thinkness, c, minShootDY) {

    var radius = Math.max(canvasWidth, canvasHeight) * 2

    var bubbleX = canvasWidth / 2,
        bubbleY = canvasHeight - bubbleRadius

    return {
        paint: function (c, x, y, gradient) {

            var touchX = x - bubbleX,
                touchY = y - bubbleY,
                touchHypot = Math.sqrt(touchX * touchX + touchY * touchY),
                endX = touchX * radius / touchHypot,
                endY = touchY * radius / touchHypot

            if (touchY / touchHypot < -minShootDY) {
                c.beginPath()
                c.moveTo(bubbleX, bubbleY)
                c.lineTo(bubbleX + endX, bubbleY + endY)
                c.lineWidth = thinkness
                c.lineCap = 'round'
                c.strokeStyle = gradient
                c.stroke()
            }

        },
    }

}
;
function LaserGradient (canvasHeight, c, h, s, l) {
    var hsl = h + ', ' + s + '%, ' + l + '%'
    var gradient = c.createLinearGradient(0, 0, 0, canvasHeight)
    gradient.addColorStop(0, 'hsla(' + hsl + ', 0)')
    gradient.addColorStop(1, 'hsla(' + hsl + ', 0.2)')
    return gradient
}
;
function MainCanvas (width, height, dpp) {

    var x = (width - width * dpp) / 2,
        y = (height - height * dpp) / 2

    var canvas = document.createElement('canvas')
    canvas.className = 'MainCanvas'
    canvas.width = width
    canvas.height = height
    canvas.style.transform =
        'scale(' + (1 / dpp) + ')' +
        ' translate(' + x + 'px, ' + y + 'px)'
    return canvas

}
;
function MainPanel () {

    function getNextBubble () {
        var shape = nextBubbleRandomShape.get()
        return NextBubble(canvasWidth, canvasHeight, bubbleRadius, shape)
    }

    function pointerEnd () {

        if (!pointerStarted) return

        var x = pointerX - canvasWidth / 2,
            y = canvasHeight - bubbleRadius - pointerY,
            distance = Math.sqrt(x * x + y * y),
            dx = x / distance,
            dy = -y / distance

        if (dy < -minShootDY && nextBubble && nextBubble.ready) {
            var shape = nextBubble.shape
            movingCanvas.add(shape, dx, dy)
            nextBubble = null
            nextBubbleTimeout = 10
            identifier = null
            pointerStarted = false
        }

    }

    function pointerHit () {

        if (!nextBubble || !nextBubble.ready ||
            resultCanvas.showing || resultCanvas.hiding) return true

        if (resultCanvas.visible) {
            resultCanvas.hide()
            stillCanvas.reset()
            score.reset()
            return true
        }

    }

    function pointerMove (e) {
        pointerX = e.clientX * dpp - canvasOffsetX
        pointerY = e.clientY * dpp - canvasOffsetY
    }

    function pointerStart (e) {
        pointerX = e.clientX * dpp - canvasOffsetX
        pointerY = e.clientY * dpp - canvasOffsetY
        pointerStarted = true
    }

    function repaint () {
        requestAnimationFrame(function () {

            var time = Date.now()

            blurCanvas.clear()
            c.clearRect(0, 0, canvasWidth, canvasHeight)
            background.paint(blurC)
            score.paint(blurC)
            stillCanvas.paint(blurC)
            if (pointerStarted) {
                laser.paint(blurC, pointerX, pointerY, nextBubble.shape.laserGradient)
            }
            if (nextBubble) nextBubble.paint(blurC)
            movingCanvas.paint(blurC)
            breakingCanvas.paint(blurC)
            fallingCanvas.paint(blurC)
            if (resultCanvas.visible) resultCanvas.paint(blurC)
            c.drawImage(blurCanvas.canvas, 0, 0)

            debugRepaintElement.innerHTML = 'repaint ' + (Date.now() - time)

            repaint()

        })
    }

    function restoreBubble (bubbleData) {
        var property
        if (bubbleData.isBomb) property = 'bomb'
        else property = 'normal'
        return shapeMap[bubbleData.colorName][property]
    }

    function saveState () {
        localStorage.state = JSON.stringify({
            width: width,
            height: height,
            dpp: dpp,
            score: score.get(),
            stillCanvas: stillCanvas.getData(),
            nextBubbleColorName: nextBubble ? nextBubble.shape.colorName : null,
        })
    }

    function tick () {
        for (var i = 0; i < 2; i++) {

            var time = Date.now()

            stillCanvas.tick()
            movingCanvas.tick()
            breakingCanvas.tick()
            fallingCanvas.tick()
            if (resultCanvas.visible) resultCanvas.tick()

            var collisions = Collide(movingCanvas.movingBubbles,
                stillCanvas.stillBubbles, bubbleVisualDiameter)

            for (var j = 0; j < collisions.length; j++) {
                var collision = collisions[j]
                var movingBubble = collision.movingBubble
                movingBubble.shiftBack(bubbleDiameter - collision.distance)
                placeMovingBubble(movingBubble)
                movingCanvas.remove(movingBubble)
            }

            if (nextBubbleTimeout) {
                nextBubbleTimeout--
                if (!nextBubbleTimeout) nextBubble = getNextBubble()
            } else {
                if (nextBubble) nextBubble.tick()
            }

            debugTickElement.innerHTML = 'tick ' + (Date.now() - time)

        }
    }

    function placeMovingBubble (movingBubble) {
        stillCanvas.add(movingBubble)
        shot++
        if (shot === maxShots) {
            shot = 0
            stillCanvas.shift()
        }
    }

    var dpp = devicePixelRatio
    var width = innerWidth * dpp
    var height = innerHeight * dpp

    var numBubblesHorizontal = 9 + Math.floor((width - 300) / 150)
    var bubbleDiameter = Math.floor(width / numBubblesHorizontal)
    var scale = bubbleDiameter / 40
    var bubbleRadius = bubbleDiameter / 2
    var verticalDistance = Math.sin(Math.PI / 3) * bubbleDiameter
    var bubbleVisualRadius = bubbleRadius - 1 * scale
    var bubbleVisualDiameter = bubbleVisualRadius * 2

    var canvasWidth = width - width % bubbleDiameter
    var canvasHeight = height - height % bubbleDiameter

    var classPrefix = 'MainPanel'

    var debugTickElement = document.createElement('div')

    var debugRepaintElement = document.createElement('div')

    var debugElement = document.createElement('div')
    debugElement.className = classPrefix + '-debug'
    debugElement.appendChild(debugRepaintElement)
    debugElement.appendChild(debugTickElement)

    var blackBubbleShape = BubbleShape_Black(bubbleVisualRadius, scale),
        blueBubbleShape = BubbleShape_Blue(canvasHeight, bubbleVisualRadius, scale),
        blueBombBubbleShape = BubbleShape_BlueBomb(bubbleVisualRadius, scale),
        greenBubbleShape = BubbleShape_Green(canvasHeight, bubbleVisualRadius, scale),
        greenBombBubbleShape = BubbleShape_GreenBomb(bubbleVisualRadius, scale),
        redBubbleShape = BubbleShape_Red(canvasHeight, bubbleVisualRadius, scale),
        redBombBubbleShape = BubbleShape_RedBomb(bubbleVisualRadius, scale),
        violetBubbleShape = BubbleShape_Violet(canvasHeight, bubbleVisualRadius, scale),
        violetBombBubbleShape = BubbleShape_VioletBomb(bubbleVisualRadius, scale),
        whiteBubbleShape = BubbleShape_White(canvasHeight, bubbleVisualRadius, scale),
        whiteBombBubbleShape = BubbleShape_WhiteBomb(bubbleVisualRadius, scale),
        yellowBubbleShape = BubbleShape_Yellow(canvasHeight, bubbleVisualRadius, scale),
        yellowBombBubbleShape = BubbleShape_YellowBomb(bubbleVisualRadius, scale)

    var allParticleCanvases = blackBubbleShape.getParticleCanvases(1)
        .concat(blueBubbleShape.getParticleCanvases(1))
        .concat(greenBubbleShape.getParticleCanvases(1))
        .concat(redBubbleShape.getParticleCanvases(1))
        .concat(violetBubbleShape.getParticleCanvases(1))
        .concat(whiteBubbleShape.getParticleCanvases(1))
        .concat(yellowBubbleShape.getParticleCanvases(1))

    var anyColorBubbleShape = BubbleShape_AnyColor(bubbleVisualRadius, allParticleCanvases)

    var shapeMap = {
        anyColor: { normal: anyColorBubbleShape },
        black: { normal: blackBubbleShape },
        blue: {
            normal: blueBubbleShape,
            bomb: blueBombBubbleShape,
        },
        green: {
            normal: greenBubbleShape,
            bomb: greenBombBubbleShape,
        },
        red: {
            normal: redBubbleShape,
            bomb: redBombBubbleShape,
        },
        violet: {
            normal: violetBubbleShape,
            bomb: violetBombBubbleShape,
        },
        white: {
            normal: whiteBubbleShape,
            bomb: whiteBombBubbleShape,
        },
        yellow: {
            normal: yellowBubbleShape,
            bomb: yellowBombBubbleShape,
        },
    }

    var nextBubbleRandomShape = RandomShape()
    nextBubbleRandomShape.add(1, anyColorBubbleShape)
    nextBubbleRandomShape.add(3, blueBubbleShape)
    nextBubbleRandomShape.add(3, greenBubbleShape)
    nextBubbleRandomShape.add(3, redBubbleShape)
    nextBubbleRandomShape.add(3, violetBubbleShape)
    nextBubbleRandomShape.add(3, whiteBubbleShape)
    nextBubbleRandomShape.add(3, yellowBubbleShape)

    var shiftRandomShape = RandomShape()
    shiftRandomShape.add(6, blackBubbleShape)
    shiftRandomShape.add(9, blueBubbleShape)
    shiftRandomShape.add(1, blueBombBubbleShape)
    shiftRandomShape.add(9, greenBubbleShape)
    shiftRandomShape.add(1, greenBombBubbleShape)
    shiftRandomShape.add(9, redBubbleShape)
    shiftRandomShape.add(1, redBombBubbleShape)
    shiftRandomShape.add(9, violetBubbleShape)
    shiftRandomShape.add(1, violetBombBubbleShape)
    shiftRandomShape.add(9, whiteBubbleShape)
    shiftRandomShape.add(1, whiteBombBubbleShape)
    shiftRandomShape.add(9, yellowBubbleShape)
    shiftRandomShape.add(1, yellowBombBubbleShape)

    var blurCanvas = BlurCanvas(canvasWidth, canvasHeight)

    var blurC = blurCanvas.c

    var background = Background(canvasWidth, canvasHeight, bubbleDiameter, scale)

    var breakingCanvas = BreakingCanvas(scale)

    var fallingCanvas = FallingCanvas(scale)

    var score = Score(canvasHeight, bubbleDiameter, scale)

    var resultCanvas = ResultCanvas(canvasWidth, canvasHeight, scale)

    var stillCanvas = StillCanvas(canvasHeight, bubbleRadius,
        numBubblesHorizontal, bubbleDiameter, shiftRandomShape.get,
        verticalDistance, breakingCanvas.add, fallingCanvas.add,
        score.add, function () {

        var scoreValue = score.get()
        resultCanvas.show(scoreValue, highScore)
        if (scoreValue > highScore) {
            highScore = scoreValue
            localStorage.highScore = highScore
        }

    })
    stillCanvas.reset()

    var movingCanvas = MovingCanvas(canvasWidth, canvasHeight,
        bubbleRadius, bubbleVisualDiameter, placeMovingBubble, scale)

    var pointerStarted = false,
        pointerX, pointerY

    var canvas = MainCanvas(width, height, dpp)

    var canvasOffsetX = (width - canvasWidth) / 2
    var canvasOffsetY = (height - canvasHeight) / 2

    var c = canvas.getContext('2d')
    c.translate(canvasOffsetX, canvasOffsetY)

    var minShootDY = 0.2

    var laser = Laser(canvasWidth, canvasHeight, bubbleRadius,
        bubbleVisualDiameter, c, minShootDY)

    var nextBubble = getNextBubble()
    var nextBubbleTimeout = 0

    var highScore = parseInt(localStorage.highScore, 10)
    if (!isFinite(highScore)) highScore = 0

    var identifier = null

    var touched = false

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(canvas)
    element.appendChild(debugElement)
    element.addEventListener('mousedown', function (e) {
        if (touched) touched = false
        else {
            if (pointerHit()) return
            if (!pointerStarted) pointerStart(e)
        }
    })
    element.addEventListener('touchstart', function (e) {
        if (pointerHit()) return
        if (!pointerStarted) {
            var touch = e.changedTouches[0]
            identifier = touch.identifier
            pointerStart(touch)
        }
    })
    addEventListener('mousemove', function (e) {
        if (touched) touched = false
        else pointerMove(e)
    })
    element.addEventListener('touchmove', function (e) {
        touched = true
        e.preventDefault()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            if (touch.identifier === identifier) pointerMove(touch)
        }
    })
    addEventListener('mouseup', function (e) {
        if (touched) touched = false
        else pointerEnd(e)
    })
    element.addEventListener('touchend', function (e) {
        touched = true
        e.preventDefault()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            if (touch.identifier === identifier) pointerEnd(touch)
        }
    })

    var shot = 0
    var maxShots = 7

    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState == 'hidden') saveState()
    })

    addEventListener('beforeunload', saveState)
    addEventListener('keydown', function (e) {
        if (e.keyCode == 32) tick()
    })
    setInterval(tick, 30)

    repaint()

    ;(function () {

        var state = localStorage.state
        if (!state) return

        var data = JSON.parse(state)
        if (data.width != width || data.height != height || data.dpp != dpp) return

        score.add(data.score)
        stillCanvas.setData(data.stillCanvas, restoreBubble)

        var nextBubbleColorName = data.nextBubbleColorName
        if (nextBubbleColorName) {
            var shape = shapeMap[nextBubbleColorName].normal
            nextBubble = NextBubble(canvasWidth, canvasHeight, bubbleRadius, shape)
        }

    })()

    return { element: element }

}
;
function MovingBubble (canvasWidth, canvasHeight,
    radius, visualDiameter, shape, dx, dy, scale) {

    var stepMultiplier = 20 * scale,
        stepX = dx * stepMultiplier,
        stepY = dy * stepMultiplier

    var that = {
        id: Math.random(),
        shape: shape,
        x: canvasWidth / 2,
        y: canvasHeight - radius,
        paint: function (c) {
            shape.paint(c, that.x, that.y)
        },
        shiftBack: function (distance) {

            var hypot = Math.sqrt(dx * dx + dy * dy)
            that.x -= dx * distance / hypot
            that.y -= dy * distance / hypot

            var underflow = radius - that.x
            if (underflow > 0) that.x += 2 * underflow

            var overflow = that.x + radius - canvasWidth
            if (overflow > 0) that.x -= 2 * overflow


        },
        tick: function () {

            that.x += stepX
            that.y += stepY

            var underflow = radius - that.x
            if (underflow > 0) {
                that.x += 2 * underflow
                dx = -dx
                stepX = dx * stepMultiplier
            }

            var overflow = that.x + radius - canvasWidth
            if (overflow > 0) {
                that.x -= 2 * overflow
                dx = -dx
                stepX = dx * stepMultiplier
            }

            if (that.y <= radius) {
                that.y = radius
                return true
            }

        },
    }

    return that

}
;
function MovingCanvas (canvasWidth, canvasHeight,
    bubbleRadius, bubbleVisualDiameter, placeListener, scale) {

    function remove (bubble) {
        delete movingBubbles[bubble.id]
    }

    var movingBubbles = {}

    return {
        movingBubbles: movingBubbles,
        remove: remove,
        add: function (shape, dx, dy) {
            var bubble = MovingBubble(canvasWidth, canvasHeight,
                bubbleRadius, bubbleVisualDiameter, shape, dx, dy, scale)
            movingBubbles[bubble.id] = bubble
        },
        paint: function (c) {
            for (var i in movingBubbles) movingBubbles[i].paint(c)
        },
        tick: function () {
            for (var i in movingBubbles) {
                var bubble = movingBubbles[i]
                if (bubble.tick()) {
                    placeListener(bubble)
                    remove(bubble)
                }
            }
        },
    }

}
;
function Neighbors (bubble, columns) {

    function checkAndScan (colNumber, rowNumber, matchShape) {

        var bubbles = columnsAndRows[colNumber]
        if (!bubbles) return

        var bubble = bubbles[rowNumber]
        if (!bubble || scannedBubbles[bubble.id] || bubble.shape.isBlack) return

        if (!matchShape.isAnyColor && !bubble.shape.isAnyColor &&
            bubble.shape.colorName != matchShape.colorName) return

        scan(bubble)

    }

    function scan (bubble) {

        var colNumber = bubble.colNumber
        var rowNumber = bubble.rowNumber
        scannedBubbles[bubble.id] = bubble
        neighbors.push(bubble)

        var shape = bubble.shape
        checkAndScan(colNumber - 2, rowNumber, shape)
        checkAndScan(colNumber + 2, rowNumber, shape)
        checkAndScan(colNumber - 1, rowNumber - 1, shape)
        checkAndScan(colNumber + 1, rowNumber - 1, shape)
        checkAndScan(colNumber - 1, rowNumber + 1, shape)
        checkAndScan(colNumber + 1, rowNumber + 1, shape)

    }

    var columnsAndRows = {}
    for (var i in columns) {
        var bubbles = columns[i]
        columnsAndRows[i] = {}
        for (var j in bubbles) {
            var itemBubble = bubbles[j]
            columnsAndRows[i][itemBubble.rowNumber] = itemBubble
        }
    }

    var scannedBubbles = {}
    var neighbors = []
    scan(bubble)

    return neighbors

}
;
function NextBubble (canvasWidth, canvasHeight, bubbleRadius, shape) {

    var x = canvasWidth / 2,
        y = canvasHeight + bubbleRadius,
        maxSteps = 8,
        stepIndex = 0,
        stepSize = bubbleRadius * 2 / maxSteps

    var that = {
        ready: false,
        shape: shape,
        paint: function (c) {
            c.globalAlpha = stepIndex / maxSteps
            shape.paint(c, x, y)
            c.globalAlpha = 1
        },
        tick: function () {
            if (stepIndex < maxSteps) {
                stepIndex++
                y -= stepSize
            } else {
                that.ready = true
            }
        },
    }

    return that

}
;
function Orphans (columns) {

    function checkAndExclude (colNumber, rowNumber) {

        var bubbles = columnsAndRows[colNumber]
        if (!bubbles) return

        var bubble = bubbles[rowNumber]
        if (!bubble) return

        var id = bubble.id
        if (scannedBubbles[id]) return

        scannedBubbles[id] = true
        delete orphans[id]
        checkChildren(bubble)

    }

    function checkChildren (bubble) {
        var colNumber = bubble.colNumber
        var rowNumber = bubble.rowNumber
        checkAndExclude(colNumber - 1, rowNumber - 1)
        checkAndExclude(colNumber + 1, rowNumber - 1)
        checkAndExclude(colNumber - 2, rowNumber)
        checkAndExclude(colNumber + 2, rowNumber)
        checkAndExclude(colNumber - 1, rowNumber + 1)
        checkAndExclude(colNumber + 1, rowNumber + 1)
    }

    var topBubbles = [],
        orphans = {},
        columnsAndRows = {}
    for (var i in columns) {
        var bubbles = columns[i]
        columnsAndRows[i] = {}
        for (var j in bubbles) {
            var bubble = bubbles[j]
            var rowNumber = bubble.rowNumber
            if (rowNumber) {
                columnsAndRows[i][rowNumber] = bubble
                orphans[bubble.id] = bubble
            } else {
                topBubbles.push(bubble)
            }
        }
    }

    var scannedBubbles = {}
    for (var i = 0; i < topBubbles.length; i++) {
        checkChildren(topBubbles[i])
    }

    return orphans

}
;
function ParticleCanvas (scale, color, steps, i) {

    var maxRadius = scale * 6

    var radius = maxRadius * (steps - i) / steps
    var canvasRadius = radius + 1

    var canvas = document.createElement('canvas')
    canvas.width = canvas.height = canvasRadius * 2

    var c = canvas.getContext('2d')
    c.fillStyle = color
    c.translate(canvasRadius, canvasRadius)
    c.arc(0, 0, radius, 0, Math.PI * 2)
    c.fill()

    return canvas

}
;
function ParticleCanvases (scale, color) {
    var steps = 16
    var canvases = []
    for (var i = 0; i < steps; i++) {
        canvases.push(ParticleCanvas(scale, color, steps, i))
    }
    return canvases
}
;
function RandomShape () {

    var outcomes = []
    var maxChance = 0

    return {
        add: function (chance, shape) {
            outcomes.push({
                chance: chance,
                shape: shape,
            })
            maxChance += chance
        },
        get: function () {
            var random = Math.random() * maxChance
            for (var i in outcomes) {
                var outcome = outcomes[i]
                random -= outcome.chance
                if (random < 0) return outcome.shape
            }
        },
    }

}
;
function RandomXY (minDistance, scale) {
    var angle = Math.random() * Math.PI * 2,
        distance = minDistance + Math.random() * scale,
        x = Math.cos(angle) * distance,
        y = Math.sin(angle) * distance
    return [x, y]
}
;
function ResultCanvas (canvasWidth, canvasHeight, dpp) {

    function hideTick () {
        if (index) index--
        if (!index) {
            that.visible = false
            that.hiding = false
        }
        ratio = index / maxIndex
        ratioSqr = Math.pow(ratio, 1 / 4)
    }

    function showTick () {
        if (index < maxIndex) index++
        else that.showing = false
        ratio = index / maxIndex
        ratioSqr = Math.pow(ratio, 1 / 4)
    }

    var index = 0,
        maxIndex = 24,
        ratio = 0,
        ratioSqr = 0,
        largeFontHeight = (48 * dpp),
        largeFont = 'bold ' + largeFontHeight + 'px Arial, sans-serif',
        middleFontHeight = (36 * dpp),
        middleFont = 'bold ' + middleFontHeight + 'px Arial, sans-serif',
        smallFontHeight = (22 * dpp),
        smallFont = smallFontHeight + 'px Arial, sans-serif'

    var score, highScore, record

    var that = {
        tick: showTick,
        hiding: false,
        showing: false,
        visible: false,
        hide: function () {
            that.showing = false
            that.tick = hideTick
            that.hiding = true
        },
        paint: function (c) {

            c.fillStyle = 'rgba(0, 0, 0, ' + (ratioSqr * 0.7) + ')'
            c.fillRect(0, 0, canvasWidth, canvasHeight)

            c.fillStyle = 'rgba(255, 255, 255, ' + ratioSqr + ')'
            c.textAlign = 'center'
            c.textBaseline = 'top'

            var x = canvasWidth / 2
            var y = canvasHeight / 4 + canvasHeight * ratioSqr / 4 - largeFontHeight * 1.5
            c.save()
            c.translate(x, y)

            c.font = smallFont
            c.fillText('YOUR SCORE', 0, 0)
            c.translate(0, smallFontHeight)

            c.font = largeFont
            c.fillText(score, 0, 0)
            c.translate(0, largeFontHeight + smallFontHeight)

            if (record) {
                c.font = middleFont
                c.fillStyle = 'hsl(60, 90%, 70%)'
                c.fillText('NEW RECORD!', 0, 0)
            } else {

                c.font = smallFont
                c.fillText('HIGH SCORE', 0, 0)
                c.translate(0, smallFontHeight)

                c.font = largeFont
                c.fillText(highScore, 0, 0)

            }

            c.restore()

        },
        show: function (_score, _highScore) {
            score = _score
            highScore = _highScore
            record = score > highScore
            that.visible = true
            that.hiding = false
            that.tick = showTick
            that.showing = true
        },
    }

    return that

}
;
function StillBubble (x, y, shape, rowNumber, colNumber) {

    var that = {
        colNumber: colNumber,
        id: Math.random(),
        rowNumber: rowNumber,
        shape: shape,
        x: x,
        y: y,
        paint: function (c) {
            shape.paint(c, x, that.y)
        },
    }

    return that

}
;
function StillCanvas (canvasHeight, bubbleRadius, numBubblesHorizontal,
    bubbleDiameter, randomShape, verticalDistance, breakCallback, fallCallback,
    scoreListener, gameOverListener) {

    function add (bubble) {
        var id = bubble.id
        stillBubbles[id] = bubble
        columns[bubble.colNumber][id] = bubble
        checkOverflow(bubble)
    }

    function checkOverflow (bubble) {
        if (!that.gameOver && bubble.rowNumber >= maxRowNumber) {
            that.gameOver = true
            gameOverListener()
        }
    }

    function createBubbles (colNumber, n) {
        var x = bubbleRadius + colNumber * bubbleRadius
        var y = bubbleRadius - verticalDistance - shiftY
        for (var i = 0; i < n; i++) {
            var shape = randomShape()
            var bubble = StillBubble(x, y, shape, 0, colNumber)
            add(bubble)
            moveDown(bubble, maxSteps + shiftIndex)
            x += bubbleDiameter
            colNumber += 2
        }
    }

    function moveDown (bubble, steps) {
        var id = bubble.id
        if (moves[id]) {
            moves[id].steps += steps
        } else {
            moves[id] = {
                steps: steps,
                bubble: bubble,
            }
        }
    }

    function remove (bubble) {
        var id = bubble.id
        delete stillBubbles[id]
        delete columns[bubble.colNumber][id]
    }

    function shift () {

        for (var i in stillBubbles) {
            var stillBubble = stillBubbles[i]
            moveDown(stillBubble, maxSteps)
            stillBubble.rowNumber++
            checkOverflow(stillBubble)
        }

        if (odd) createBubbles(1, numBubblesHorizontal - 1)
        else createBubbles(0, numBubblesHorizontal)

        odd = !odd
        shiftY += verticalDistance
        shiftIndex += maxSteps

    }

    var maxSteps = 4
    var stepSize = verticalDistance / maxSteps
    var shiftY = 0
    var shiftIndex = 0

    var stillBubbles = {}
    var moves = {}

    var columns = {}
    for (var i = 0; i < 2 * numBubblesHorizontal - 1; i++) columns[i] = {}

    var maxRowNumber = Math.floor((canvasHeight - bubbleDiameter) / verticalDistance)

    var odd = false

    var breakNumber = 3

    var that = {
        gameOver: false,
        shift: shift,
        stillBubbles: stillBubbles,
        add: function (movingBubble) {

            var y = movingBubble.y
            var shiftOffset = shiftIndex * stepSize - bubbleRadius
            var rowNumber = Math.round((y + shiftOffset) / verticalDistance)
            y = rowNumber * verticalDistance - shiftOffset

            var oddOffset = (rowNumber + (odd ? 1 : 0)) % 2 ? bubbleRadius : 0
            
            var x = movingBubble.x
            x = Math.round((x - oddOffset) / bubbleDiameter) * bubbleDiameter + oddOffset

            var colNumber = Math.floor(x / bubbleRadius) - 1
            var bubble = StillBubble(x, y, movingBubble.shape, rowNumber, colNumber)
            add(bubble)
            if (shiftIndex) moveDown(bubble, shiftIndex)

            var neighbors = Neighbors(bubble, columns)
            if (neighbors.length >= breakNumber) {

                var bombNeighbors = BombNeighbors(columns, neighbors)

                var score = -(breakNumber - 1) * 2

                for (var i in bombNeighbors) {
                    var neighbor = bombNeighbors[i]
                    remove(neighbor)
                    breakCallback(neighbor.x, neighbor.y, neighbor.shape)
                    score += 2
                }

                var orphans = Orphans(columns)
                for (var i in orphans) {
                    var orphan = orphans[i]
                    remove(orphan)
                    fallCallback(orphan.x, orphan.y, orphan.shape)
                    score += 1
                }

                scoreListener(score)

            }

        },
        getData: function () {
            var data = {
                odd: odd,
                bubbles: [],
                shiftIndex: shiftIndex,
            }
            for (var i in stillBubbles) {
                var bubble = stillBubbles[i]
                var shape = bubble.shape
                data.bubbles.push({
                    colNumber: bubble.colNumber,
                    rowNumber: bubble.rowNumber,
                    shape: {
                        colorName: shape.colorName,
                        isBomb: shape.isBomb,
                    },
                })
            }
            return data
        },
        isOdd: function () {
            return odd
        },
        paint: function (c) {
            for (var i in stillBubbles) stillBubbles[i].paint(c)
        },
        reset: function () {
            that.gameOver = false
            moves = {}
            for (var i in stillBubbles) delete stillBubbles[i]
            for (var i in columns) {
                var columnBubbles = columns[i]
                for (var i in columnBubbles) delete columnBubbles[i]
            }
            shift()
            shift()
            shift()
        },
        setData: function (data, restoreShape) {

            odd = data.odd
            shiftIndex = Math.max(0, Math.floor(data.shiftIndex))
            if (!isFinite(shiftIndex)) shiftIndex = 0
            shiftY = shiftIndex * verticalDistance

            for (var i in stillBubbles) delete stillBubbles[i]
            for (var i in columns) {
                var columnBubbles = columns[i]
                for (var i in columnBubbles) delete columnBubbles[i]
            }
            for (var i in moves) delete moves[i]

            var dataBubbles = data.bubbles
            for (var i in dataBubbles) {

                var dataBubble = dataBubbles[i]

                var shape = restoreShape(dataBubble.shape)
                if (!shape) continue

                var colNumber = dataBubble.colNumber,
                    rowNumber = dataBubble.rowNumber,
                    x = bubbleRadius + colNumber * bubbleRadius,
                    y = bubbleRadius + rowNumber * verticalDistance,
                    bubble = StillBubble(x, y, shape, rowNumber, colNumber)
                add(bubble)

            }

        },
        tick: function () {

            for (var i in moves) {
                var move = moves[i]
                move.steps--
                move.bubble.y += stepSize
                if (!move.steps) {
                    delete moves[i]
                    i--
                }
            }

            if (shiftIndex) {
                shiftIndex--
                shiftY -= stepSize
            }

        },
    }

    return that

}
;
function Score (canvasHeight, bubbleDiameter, dpp) {

    var score = 0,
        x = 10 * dpp,
        y = canvasHeight - bubbleDiameter + 10 * dpp,
        font = 'bold ' + (26 * dpp) + 'px Arial, sans-serif'

    return {
        add: function (_score) {
            score += _score
        },
        get: function () {
            return score
        },
        paint: function (c) {
            c.textBaseline = 'top'
            c.font = font
            c.textAlign = 'left'
            c.fillStyle = '#777'
            c.fillText(score, x, y)
        },
        reset: function () {
            score = 0
        },
    }

}
;
function BubbleShape_AnyColor (radius, particleCanvases) {

    function backgroundCanvas () {

        var canvas = document.createElement('canvas')
        canvas.width = canvas.height = size

        var c = canvas.getContext('2d')

        var imageData = c.createImageData(size, size)
        for (var y = 0; y < size; y++) {
            for (var x = 0; x < size; x++) {

                var centerX = x - halfSize,
                    centerY = y - halfSize,
                    distance = Math.sqrt(centerX * centerX + centerY * centerY) / radius

                var angle = Math.atan(centerY / centerX)
                if (centerX < 0) angle += Math.PI
                angle -= 0.3

                var r = 0, g = 0, b = 0

                r = Math.abs(angle - Math.PI / 2) - 1
                g = -Math.abs(angle - Math.PI / 3) + 2
                b = -Math.abs(angle - Math.PI * 2 / 3) + 2

                r = Math.max(0, Math.min(1, 1 - r * distance)) * 255
                g = Math.max(0, Math.min(1, 1 - g * distance)) * 255
                b = Math.max(0, Math.min(1, 1 - b * distance)) * 255

                r = 16 + r * (255 - 32) / 256
                g = 16 + g * (255 - 32) / 256
                b = 16 + b * (255 - 32) / 256

                var offset = (y * size + x) * 4
                imageData.data[offset] = r
                imageData.data[offset + 1] = g
                imageData.data[offset + 2] = b
                imageData.data[offset + 3] = 255

            }
        }

        c.putImageData(imageData, 0, 0)

        return canvas

    }

    var halfSize = radius + 2
    var size = Math.floor(halfSize * 2)

    var canvas = document.createElement('canvas')
    canvas.width = canvas.height = size

    var c = canvas.getContext('2d')

    c.arc(halfSize, halfSize, radius, 0, Math.PI * 2)
    c.clip()
    c.drawImage(backgroundCanvas(), 0, 0)

    return {
        isAnyColor: true,
        colorName: 'anyColor',
        laserGradient: 'rgba(255, 255, 255, 0.2)',
        particleCanvases: particleCanvases,
        getParticleCanvases: function (number) {
            var canvases = []
            for (var i = 0; i < number; i++) {
                var index = Math.floor(Math.random() * particleCanvases.length)
                canvases.push(particleCanvases[index])
            }
            return canvases
        },
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfSize, y - halfSize)
        },
    }

}
;
function BubbleShape_Black (radius, scale) {

    var color = 'hsl(0, 0%, 40%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(0, 0%, 15%)', radius)

    var particleCanvases = ParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'black',
        isBlack: true,
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
;
function BubbleShape_Blue (canvasHeight, radius, scale) {

    var color = 'hsl(220, 100%, 70%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(220, 100%, 55%)', radius)
    var c = canvas.getContext('2d')

    var particleCanvases = ParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'blue',
        laserGradient: LaserGradient(canvasHeight, c, 220, 100, 70),
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
;
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
;
function BubbleShape_Bomb (canvas, radius) {

    var c = canvas.getContext('2d')

    var color = 'rgba(255 ,255, 255, 0.45)'

    c.beginPath()
    c.arc(0, 0, radius * 0.20, 0, Math.PI * 2)
    c.fillStyle = color
    c.fill()

    var numSteps = 3
    var stepAngle = Math.PI * 2 / numSteps
    var shapeRadius = radius * 0.6
    var arcAngle = Math.PI / 3
    c.lineWidth = radius * 0.6
    c.beginPath()
    c.rotate(-Math.PI / 2 - arcAngle / 2)
    for (var i = 0; i < numSteps; i++) {
        c.moveTo(shapeRadius, 0)
        c.arc(0, 0, shapeRadius, 0, arcAngle)
        c.rotate(stepAngle)
    }
    c.strokeStyle = color
    c.stroke()

}
;
function BubbleShape_Canvas (lightColor, darkColor, radius) {

    var halfWidth = radius + 2

    var canvas = document.createElement('canvas')
    canvas.width = canvas.height = halfWidth * 2

    var c = canvas.getContext('2d')

    var minusHalfRadius = -radius / 2

    var gradient = c.createRadialGradient(0, minusHalfRadius, 0, 0, minusHalfRadius, radius * 2)
    gradient.addColorStop(0, lightColor)
    gradient.addColorStop(0.5, darkColor)
    gradient.addColorStop(1, lightColor)

    c.fillStyle = gradient
    c.translate(halfWidth, halfWidth)
    c.arc(0, 0, radius, 0, Math.PI * 2)
    c.fillStyle = gradient
    c.fill()

    return canvas

}
;
function BubbleShape_Green (canvasHeight, radius, scale) {

    var color = 'hsl(100, 100%, 40%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(100, 100%, 30%)', radius)
    var c = canvas.getContext('2d')

    var particleCanvases = ParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'green',
        laserGradient: LaserGradient(canvasHeight, c, 100, 100, 40),
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
;
function BubbleShape_GreenBomb (radius, scale) {

    var color = 'hsl(100, 100%, 40%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(100, 100%, 30%)', radius)
    BubbleShape_Bomb(canvas, radius)

    var particleCanvases = BombParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'green',
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
;
function BubbleShape_Red (canvasHeight, radius, scale) {

    var color = 'hsl(5, 100%, 65%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(5, 100%, 40%)', radius)
    var c = canvas.getContext('2d')

    var particleCanvases = ParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'red',
        laserGradient: LaserGradient(canvasHeight, c, 5, 100, 65),
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
;
function BubbleShape_RedBomb (radius, scale) {

    var color = 'hsl(5, 100%, 65%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(5, 100%, 40%)', radius)
    BubbleShape_Bomb(canvas, radius)

    var particleCanvases = BombParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'red',
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
;
function BubbleShape_Violet (canvasHeight, radius, scale) {

    var color = 'hsl(300, 100%, 60%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(300, 100%, 40%)', radius)
    var c = canvas.getContext('2d')

    var particleCanvases = ParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'violet',
        laserGradient: LaserGradient(canvasHeight, c, 300, 100, 60),
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
;
function BubbleShape_VioletBomb (radius, scale) {

    var color = 'hsl(300, 100%, 60%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(300, 100%, 40%)', radius)
    BubbleShape_Bomb(canvas, radius)

    var particleCanvases = BombParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'violet',
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
;
function BubbleShape_White (canvasHeight, radius, scale) {

    var color = 'hsl(0, 0%, 90%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(0, 0%, 70%)', radius)
    var c = canvas.getContext('2d')

    var particleCanvases = ParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'white',
        laserGradient: LaserGradient(canvasHeight, c, 0, 0, 90),
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
;
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
;
function BubbleShape_Yellow (canvasHeight, radius, scale) {

    var color = 'hsl(60, 90%, 70%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(60, 90%, 40%)', radius)
    var c = canvas.getContext('2d')

    var particleCanvases = ParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'yellow',
        laserGradient: LaserGradient(canvasHeight, c, 60, 90, 70),
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
;
function BubbleShape_YellowBomb (radius, scale) {

    var color = 'hsl(60, 90%, 70%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(60, 90%, 40%)', radius)
    BubbleShape_Bomb(canvas, radius)

    var particleCanvases = BombParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'yellow',
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
;
(function () {
    var mainPanel = MainPanel()
    document.body.appendChild(mainPanel.element)
})()
;

})()