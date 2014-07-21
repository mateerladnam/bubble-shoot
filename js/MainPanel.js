function MainPanel () {

    function createBubbles (x, n, y) {
        for (var i = 0; i < n; i++) {
            var color = randomShape()
            var bubbleX = x + i * bubbleDiameter
            var bubble = Bubble(canvasWidth, bubbleRadius, bubbleX, y, color)
            bubbles.push(bubble)
        }
    }

    function getNextBubble () {
        var x = canvasWidth / 2
        var y = canvasHeight - bubbleRadius
        var shape = randomShape()
        return Bubble(canvasWidth, bubbleRadius, x, y, shape)
    }

    function init () {
        createBubbles(bubbleRadius, numBubblesHorizontal, bubbleRadius)
        createBubbles(bubbleDiameter, numBubblesHorizontal - 1, verticalDistance + bubbleRadius)
        createBubbles(bubbleRadius, numBubblesHorizontal, verticalDistance * 2 + bubbleRadius)
    }

    function randomShape () {
        return shapes[Math.floor(Math.random() * shapes.length)]
    }

    function repaint () {
        c.fillStyle = '#000'
        c.fillRect(0, 0, canvasWidth, canvasHeight)
        for (var i = 0; i < bubbles.length; i++) {
            bubbles[i].paint(c)
        }
        nextBubble.paint(c)
        for (var i = 0; i < movingBubbles.length; i++) {
            movingBubbles[i].paint(c)
        }
    }

    var width = innerWidth
    var height = innerHeight
    var bubbleDiameter = 40
    var bubbleRadius = bubbleDiameter / 2
    var verticalDistance = Math.sin(Math.PI / 3) * bubbleDiameter

    var shapes = [RedBubbleShape(bubbleRadius), GreenBubbleShape(bubbleRadius),
        BlueBubbleShape(bubbleRadius), VioletBubbleShape(bubbleRadius),
        YellowBubbleShape(bubbleRadius)]

    var classPrefix = 'MainPanel'

    var canvasWidth = width - width % bubbleDiameter
    var canvasHeight = height - height % bubbleDiameter

    var canvas = document.createElement('canvas')
    canvas.className = classPrefix + '-canvas'
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    var numBubblesHorizontal = Math.floor(width / bubbleDiameter)

    var movingBubbles = []

    var odd = false
    var bubbles = []

    init()

    var nextBubble = getNextBubble()

    var c = canvas.getContext('2d')

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(canvas)
    element.addEventListener('touchstart', function (e) {
        var touch = e.changedTouches[0],
            x = touch.clientX - width / 2,
            y = height - bubbleRadius - touch.clientY,
            distance = Math.hypot(x, y),
            sin = y / distance,
            cos = x / distance
        nextBubble.setDirection(cos, -sin)
        movingBubbles.push(nextBubble)
        nextBubble = getNextBubble()
    })

    setInterval(function () {
        requestAnimationFrame(function () {

            movingBubbles.forEach(function (bubble) {
                bubble.tick()
            })

            for (var i = 0; i < movingBubbles.length; i++) {
                var movingBubble = movingBubbles[i]
                if (movingBubble.collides(bubbles)) {

                    var y = movingBubble.getY()
                    var row = Math.round((y - bubbleRadius) / verticalDistance)
                    y = row * verticalDistance + bubbleRadius

                    if (y > canvasHeight - 2 * verticalDistance) {
                        bubbles = []
                        movingBubbles = []
                        init()
                    } else {

                        var x = movingBubble.getX()
                        x -= bubbleRadius
                        if (row % 2) x += bubbleRadius
                        x = Math.round(x / bubbleDiameter) * bubbleDiameter + bubbleRadius
                        if (row % 2) x -= bubbleRadius

                        movingBubble.setXY(x, y)

                        movingBubbles.splice(i, 1)
                        bubbles.push(movingBubble)
                        i--

                    }

                }
            }

            repaint()

        })
    }, 10)

    repaint()

    return { element: element }

}
