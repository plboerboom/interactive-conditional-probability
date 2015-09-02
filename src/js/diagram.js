(function() {
    var overallHeight = 240;
    var leftPadding = 15;
    var rightPadding = 15;
    var universeHeight = overallHeight / 2;
    var universeTop = universeHeight / 2;
    var universeLeft = leftPadding;

    var labelPositions = {
        TOP: 0,
        BOTTOM: 1
    }

    var probA = 0.05;
    var probBGivenA = 0.9;
    var probBGivenNotA;

    var probAColor = "rgba(0, 0, 255, 0.1)";
    var probACompColor = "rgba(0, 0, 255, 0.5)";
    var probBColor = "rgba(0, 255, 0, 0.3)";

    var canvas = document.createElement("canvas");
    canvas.id = "mainCanvas";
    canvas.width = window.innerWidth;
    canvas.height = overallHeight;
    document.getElementsByTagName("body")[0].appendChild(canvas);

    var universeWidth = canvas.width - leftPadding - rightPadding;

    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var devicePixelRatio = window.devicePixelRatio;

    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        var backingStoreRatio = context.webkitBackingStorePixelRatio;
        var ratio = devicePixelRatio / backingStoreRatio;

        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';

        canvas.width = canvas.width * ratio;
        canvas.height = canvas.height * ratio;

        context.scale(ratio, ratio);

        window.requestAnimFrame(draw);
    }

    var eventA = {
        label: "P(A)",
        labelPosition: labelPositions.TOP,
        probability: 0.2,
        left: 0,
        top: 0,
        get width() {
            return this.probability * universeWidth;
        },
        height: universeHeight,
        color: "rgba(0, 0, 255, 0.1)"
    };

    var eventNotA = {
        label: "P(~A)",
        labelPosition: labelPositions.TOP,
        get probability() {
            return 1 - eventA.probability;
        },
        get left() {
            return eventA.width;
        },
        top: 0,
        get width() {
            return this.probability * universeWidth;
        },
        height: universeHeight,
        color: "rgba(0, 0, 255, 0.5)"
    };

    var eventBGivenA = {
        label: "P(B | A)",
        labelPosition: labelPositions.BOTTOM,
        probability: 0.8,
        get left() {
            return eventA.width - this.width;
        },
        top: 0,
        get width() {
            return this.probability * eventA.width;
        },
        height: universeHeight,
        color: "rgba(0, 255, 0, 0.3)"
    };

    var eventBGivenNotA = {
        label: "P(B | ~A)",
        labelPosition: labelPositions.BOTTOM,
        probability: 0.5,
        get left() {
            return eventA.width;
        },
        top: 0,
        get width() {
            return this.probability * eventNotA.width;
        },
        height: universeHeight,
        color: "rgba(0, 255, 0, 0.3)"
    };

    function drawEvent(e) {
        context.save();
        context.fillStyle = e.color;
        context.translate(leftPadding, universeTop);
        context.fillRect(e.left, e.top, e.width, e.height);
        context.restore();

        context.save();
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.translate(leftPadding, overallHeight/2);
        if (e.labelPosition == labelPositions.BOTTOM) {
            context.scale(1, -1);
        }
        context.translate(0, - (universeHeight/2 + 5));
        context.beginPath();
        context.moveTo(e.left + e.width / 2, -10);
        context.lineTo(e.left + e.width / 2, -20);
        context.moveTo(e.left + 2, 0);
        context.lineTo(e.left + 5, -10);
        context.lineTo(e.left + e.width - 5, -10);
        context.lineTo(e.left + e.width - 2, 0);
        context.stroke();
        context.closePath();
        var textOffset = -30;
        if (e.labelPosition == labelPositions.BOTTOM) {
            context.scale(1, -1);
            textOffset = 30;
        }
        var text = e.label + " = "+ e.probability;
        var tm = context.measureText(text);
        context.fillText(text, e.left + e.width / 2 - tm.width / 2, textOffset);
        context.restore();
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

//        var probAWidth = probA * universeWidth;
//        var probACompWidth = universeWidth - probAWidth;
//        var probBGivenAWidth = probAWidth * probBGivenA;
//        var probBGivenNotAWidth = probBGivenNotA * probACompWidth;

        drawEvent(eventA);
        drawEvent(eventNotA);
        drawEvent(eventBGivenA);
        drawEvent(eventBGivenNotA);

        context.save();
        context.font = "12pt Helvetica";
        var probAGivenB = eventBGivenA.width / (eventBGivenA.width + eventBGivenNotA.width);
        var text = "P(A | B) = " + probAGivenB;
        var tm = context.measureText(text);
        context.translate(eventBGivenA.left + eventBGivenA.width / 2 - tm.width / 2,
                universeTop + 60);
        context.fillText(text, 0, 0);
        context.restore();

//        context.save();
//        context.fillStyle = probAColor;
//        context.fillRect(universeLeft, universeTop, probAWidth, universeHeight);
//        context.strokeStyle = 'black';
//        context.beginPath();
//        context.moveTo(universeLeft, universeTop - 10);
//        context.lineTo(universeLeft + 5, universeTop - 20);
//        context.lineTo(universeLeft + probAWidth - 5, universeTop - 20);
//        context.lineTo(universeLeft + probAWidth, universeTop - 10);
//        context.stroke();
//        context.closePath();
//        context.restore();
//        context.save();
//        context.translate(probAWidth / 2, 0);
//        context.beginPath();
//        context.moveTo(0, 0);
//        context.lineTo(0, 200);
//        context.stroke();
//        context.closePath();
//        context.restore();
//
//        context.save();
//        context.fillStyle = probACompColor;
//        context.translate(probAWidth, 0);
//        context.fillRect(universeLeft, universeTop, probACompWidth, universeHeight);
//        context.restore();
//
//        context.fillStyle = probBColor;
//
//        context.save();
//        context.translate(probAWidth - probBGivenAWidth, 0);
//        context.fillRect(universeLeft, universeTop, probBGivenAWidth, universeHeight);
//        context.restore();
//
//        context.save();
//        context.translate(probAWidth, 0);
//        context.fillRect(universeLeft, universeTop, probBGivenNotAWidth, universeHeight);
//        context.restore();

    }

    $('#probA').slider({
        formatter: function(value) {
            eventA.probability = value;
            window.requestAnimFrame(draw);
            return 'Current value: ' + value;
        }
    });

    $('#probBGivenA').slider({
        formatter: function(value) {
            eventBGivenA.probability = value;
            window.requestAnimFrame(draw);
            return 'Current value: ' + value;
        }
    });
    
    $('#probBGivenNotA').slider({
        formatter: function(value) {
            eventBGivenNotA.probability = value;
            window.requestAnimFrame(draw);
            return 'Current value: ' + value;
        }
    });

})();
