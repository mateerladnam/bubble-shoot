function Collide (movingBubbles, stillBubbles, bubbleVisualDiameter) {
    var collisions = []
    for (var i = 0; i < movingBubbles.length; i++) {
        var movingBubble = movingBubbles[i]
        for (var j = 0; j < stillBubbles.length; j++) {

            var stillBubble = stillBubbles[j],
                dx = stillBubble.x - movingBubble.x,
                dy = stillBubble.y - movingBubble.y,
                distance = Math.hypot(dx, dy)

            if (distance < bubbleVisualDiameter) {
                collisions.push({
                    movingBubble: movingBubble,
                    stillBubble: stillBubble,
                    distance: distance,
                })
            }

        }
    }
    return collisions
}
