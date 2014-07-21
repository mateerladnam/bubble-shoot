function VioletBubbleShape (radius) {
    return {
        paint: function (c, x, y) {
            c.fillStyle = '#ee0'
            c.beginPath()
            c.arc(x, y, radius, 0, Math.PI * 2)
            c.fill()
        },
    }
}
