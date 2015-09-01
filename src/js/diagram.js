var leftPadding = 15;
var rightPadding = 15;

var height = 120;
var probA = 0.05;
var probBGivenA = 0.9;
var probBGivenNotA;

var probAColor = "rgba(0, 0, 255, 0.1)";
var probACompColor = "rgba(0, 0, 255, 0.5)";
var probBColor = "rgba(0, 255, 0, 0.3)";


function setup() {
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
    var canvas = document.createElement("canvas");
    canvas.id = "mainCanvas";
    canvas.width = window.innerWidth;
    canvas.height = height;

    var devicePixelRatio = window.devicePixelRatio;

    document.getElementsByTagName("body")[0].appendChild(canvas);
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        backingStoreRatio = context.webkitBackingStorePixelRatio;

        var ratio = devicePixelRatio / backingStoreRatio;

        canvas.style.width = canvas.width + 'px';
        canvas.style.height = height + 'px';

        canvas.width = canvas.width * ratio;
        canvas.height = canvas.height * ratio;

        context.scale(ratio, ratio);
    }

    console.log(canvas.width);
    console.log(canvas.height);

    window.requestAnimFrame(draw);
}

function draw() {
    var devicePixelRatio = window.devicePixelRatio;
    var canvas = document.getElementById('mainCanvas');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        backingStoreRatio = context.webkitBackingStorePixelRatio;
        var ratio = devicePixelRatio / backingStoreRatio;
    }

    var width = canvas.width / ratio - leftPadding - rightPadding;
    var height = canvas.height /ratio;

    var probARect = {
        left: leftPadding,
        top: 0,
        width: probA * width,
        height: height
    };

    var probAWidth = probA * width;
    var probACompWidth = width - probAWidth;
    var probBGivenAWidth = probAWidth * probBGivenA;
    var probBGivenNotAWidth = probBGivenNotA * probACompWidth;

    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = probAColor;
        context.fillRect(0, 0, probAWidth, height);

        context.save();
        context.fillStyle = probACompColor;
        context.translate(probAWidth, 0);
        context.fillRect(0, 0, probACompWidth, height);
        context.restore();

        context.fillStyle = probBColor;

        context.save();
        context.translate(probAWidth - probBGivenAWidth, 0);
        context.fillRect(0, 0, probBGivenAWidth, height);
        context.restore();

        context.save();
        context.translate(probAWidth, 0);
        context.fillRect(0, 0, probBGivenNotAWidth, height);
        context.restore();

        context.save();
        context.rotate((Math.PI * 2.0)/4);
        context.fillStyle = "black";
        context.font = "20pt Helvetica";
        context.fillText("{", 0, 0);
        context.restore();
    }
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var colors = ["rgba(0, 100, 0, 0.05)", "rgba(0, 0, 100, 0.05)"];

window.requestAnimFrame = (function(){ 
  return  window.requestAnimationFrame       ||  
          window.webkitRequestAnimationFrame ||  
          window.mozRequestAnimationFrame    ||  
          window.oRequestAnimationFrame      ||  
          window.msRequestAnimationFrame     ||  
          function( callback ){ 
            window.setTimeout(callback, 1000 / 60); 
          }; 
})(); 


window.onload = setup;
//window.setInterval(draw, 1000);
