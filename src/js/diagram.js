(function() {
    var overallHeight = 240;
    var leftPadding = 15;
    var rightPadding = 15;
    var universeHeight = overallHeight / 2;
    var universeTop = universeHeight / 2;
    var universeLeft = leftPadding;

    var eventA = {
        probability: 0.2,
        color: "rgba(0, 0, 255, 0.1)" 
    };

    var eventNotA = {
        probability: 1 - eventA.probability,
        color: "rgba(0, 0, 255, 0.5)"
    };

    var eventBGivenA = {
        probability: 0.9,
        color: "rgba(0, 255, 0, 0.3)"
    };

    var eventBGivenNotA = {
        probability: 0.5,
        color: "rgba(0, 255, 0, 0.3)"
    };

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


    function draw() {
        var probAWidth = probA * universeWidth;
        var probACompWidth = universeWidth - probAWidth;
        var probBGivenAWidth = probAWidth * probBGivenA;
        var probBGivenNotAWidth = probBGivenNotA * probACompWidth;

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.save();
        context.fillStyle = probAColor;
        context.fillRect(universeLeft, universeTop, probAWidth, universeHeight);
        context.strokeStyle = 'black';
        context.beginPath();
        context.moveTo(universeLeft, universeTop - 10);
        context.lineTo(universeLeft + 5, universeTop - 20);
        context.lineTo(universeLeft + probAWidth - 5, universeTop - 20);
        context.lineTo(universeLeft + probAWidth, universeTop - 10);
        context.stroke();
        context.closePath();
        context.restore();
        context.save();
        context.translate(probAWidth / 2, 0);
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, 200);
        context.stroke();
        context.closePath();
        context.restore();

        context.save();
        context.fillStyle = probACompColor;
        context.translate(probAWidth, 0);
        context.fillRect(universeLeft, universeTop, probACompWidth, universeHeight);
        context.restore();

        context.fillStyle = probBColor;

        context.save();
        context.translate(probAWidth - probBGivenAWidth, 0);
        context.fillRect(universeLeft, universeTop, probBGivenAWidth, universeHeight);
        context.restore();

        context.save();
        context.translate(probAWidth, 0);
        context.fillRect(universeLeft, universeTop, probBGivenNotAWidth, universeHeight);
        context.restore();

    }

    $('#probA').slider({
        formatter: function(value) {
            probA = value;
            window.requestAnimFrame(draw);
            return 'Current value: ' + value;
        }
    });

    $('#probBGivenA').slider({
        formatter: function(value) {
            probBGivenA = value;
            window.requestAnimFrame(draw);
            return 'Current value: ' + value;
        }
    });
    
    $('#probBGivenNotA').slider({
        formatter: function(value) {
            probBGivenNotA = value;
            window.requestAnimFrame(draw);
            return 'Current value: ' + value;
        }
    });

})();
