var width = 1200;
var height = 120;
var cellCountH = 100;
var cellCountV = 10;
var cellWidth = width / cellCountH;
var cellHeight = height / cellCountV;
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
            return 'Current value: ' + value;
        }
    });
    $('#probBGivenA').slider({
        formatter: function(value) {
            probBGivenA = value;
            return 'Current value: ' + value;
        }
    });
    $('#probBGivenNotA').slider({
        formatter: function(value) {
            probBGivenNotA = value;
            return 'Current value: ' + value;
        }
    });
    var canvas = document.createElement("canvas");
    canvas.id = "mainCanvas";
    canvas.width = width;
    canvas.height = height;

    var devicePixelRatio = window.devicePixelRatio;

    document.getElementsByTagName("body")[0].appendChild(canvas);
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        backingStoreRatio = context.webkitBackingStorePixelRatio;

        var ratio = devicePixelRatio / backingStoreRatio;

        canvas.width = canvas.width * ratio;
        canvas.height = canvas.height * ratio;

        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        context.scale(ratio, ratio);
    }
    window.requestAnimFrame(draw);
}

function draw() {
    var probAWidth = probA * width;
    var probACompWidth = width - probAWidth;
    var probBGivenAWidth = probAWidth * probBGivenA;
    var probBGivenNotAWidth = probBGivenNotA * probACompWidth;

    window.requestAnimFrame(draw);
    var canvas = document.getElementById('mainCanvas');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = "rgba(0, 0, 0, 1.0)";
        context.lineWidth = 1;
        context.clearRect(0, 0, width, height);

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


var colors = ["rgba(0, 100, 0, 0.05)", "rgba(0, 0, 100, 0.05)"]

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
