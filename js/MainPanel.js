function MainPanel () {

    function getNextBubble () {
        var shape = nextRandomShape()
        return NextBubble(canvasWidth, canvasHeight, bubbleRadius, shape)
    }

    function init () {
        stillCanvas.removeAll()
        stillCanvas.shift()
        stillCanvas.shift()
        stillCanvas.shift()
        if (!nextBubble) {
            clearTimeout(nextBubbleTimeout)
            nextBubble = getNextBubble()
        }
    }

    function repaint () {
        requestAnimationFrame(function () {

            var time = Date.now()

            blurCanvas.clear()
            c.clearRect(0, 0, canvasWidth, canvasHeight)
            background.paint(blurC)
            stillCanvas.paint(blurC)
            if (touchStarted) laser.paint(blurC, touchX, touchY)
            if (nextBubble) nextBubble.paint(blurC)
            movingCanvas.paint(blurC)
            breakingCanvas.paint(blurC)
            fallingCanvas.paint(blurC)
            c.drawImage(blurCanvas.canvas, 0, 0)

            debugRepaintElement.innerHTML = 'repaint ' + (Date.now() - time)

        })
    }

    function tick () {

        var time = Date.now()

        stillCanvas.tick()
        movingCanvas.tick()
        breakingCanvas.tick()
        fallingCanvas.tick()
        if (nextBubble) nextBubble.tick()

        var collisions = Collide(movingCanvas.movingBubbles,
            stillCanvas.stillBubbles, bubbleRadius, verticalDistance,
            canvasWidth, canvasHeight, stillCanvas, bubbleDiameter, init)

        for (var i = 0; i < collisions.length; i++) {
            var collision = collisions[i]
            var movingBubble = collision.movingBubble
            movingBubble.shiftBack(bubbleDiameter - collision.distance)
            stillCanvas.add(movingBubble, breakingCanvas.add, fallingCanvas.add)
            movingCanvas.remove(movingBubble)

            shot++
            if (shot === maxShots) {
                shot = 0
                stillCanvas.shift()
            }

        }

        debugTickElement.innerHTML = 'tick ' + (Date.now() - time)

        repaint()

    }

    var width = innerWidth
    var height = innerHeight
    var bubbleDiameter = 40
    var bubbleRadius = bubbleDiameter / 2
    var verticalDistance = Math.sin(Math.PI / 3) * bubbleDiameter
    var bubbleVisualRadius = bubbleRadius - 1
    var bubbleVisualDiameter = bubbleVisualRadius * 2

    var nextRandomShape = BubbleShape_Random(bubbleVisualRadius).next

    var classPrefix = 'MainPanel'

    var debugTickElement = document.createElement('div')

    var debugRepaintElement = document.createElement('div')

    var debugElement = document.createElement('div')
    debugElement.className = classPrefix + '-debug'
    debugElement.appendChild(debugRepaintElement)
    debugElement.appendChild(debugTickElement)

    var canvasWidth = width - width % bubbleDiameter
    var canvasHeight = height - height % bubbleDiameter

    var blurCanvas = BlurCanvas(canvasWidth, canvasHeight)

    var blurC = blurCanvas.c

    var background = Background(canvasWidth, canvasHeight, bubbleDiameter)

    var numBubblesHorizontal = Math.floor(width / bubbleDiameter)

    var stillCanvas = StillCanvas(bubbleRadius, numBubblesHorizontal,
        bubbleDiameter, nextRandomShape, verticalDistance)

    var movingCanvas = MovingCanvas()

    var breakingCanvas = BreakingCanvas()

    var fallingCanvas = FallingCanvas()

    var touchStarted = false,
        touchX, touchY

    var canvas = document.createElement('canvas')
    canvas.className = classPrefix + '-canvas'
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    var c = canvas.getContext('2d')

    var laser = Laser(canvasWidth, canvasHeight, bubbleRadius, bubbleVisualDiameter, c)

    var nextBubble
    var nextBubbleTimeout

    init()

    var identifier

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(canvas)
    element.appendChild(debugElement)
    element.addEventListener('touchstart', function (e) {
        if (!nextBubble || !nextBubble.ready) return
        if (!identifier) {
            var touch = e.changedTouches[0]
            touchX = touch.clientX
            touchY = touch.clientY
            identifier = touch.identifier
            touchStarted = true
        }
    })
    element.addEventListener('touchmove', function (e) {
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            if (touch.identifier === identifier) {
                touchX = touch.clientX
                touchY = touch.clientY
            }
        }
    })
    element.addEventListener('touchend', function (e) {
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            if (touch.identifier === identifier) {

                touchStarted = false

                var touch = e.changedTouches[0],
                    x = touchX - width / 2,
                    y = height - bubbleRadius - touchY,
                    distance = Math.hypot(x, y),
                    dx = x / distance,
                    dy = -y / distance

                if (dy < -0.2) {
                    var shape = nextBubble.shape
                    movingCanvas.add(MovingBubble(canvasWidth, canvasHeight, bubbleRadius, bubbleVisualRadius, shape, dx, dy))
                    nextBubble = null
                    nextBubbleTimeout = setTimeout(function () {
                        nextBubble = getNextBubble()
                    }, 200)
                    repaint()
                    identifier = null
                }

            }
        }
    })

    var shot = 0
    var maxShots = 4

    addEventListener('keydown', function (e) {
        if (e.keyCode == 32) tick()
    })
    setInterval(tick, 20)

    repaint()

    return { element: element }

}
