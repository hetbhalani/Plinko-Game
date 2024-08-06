// var Engine = Matter.Engine,
//     World = Matter.World,
//     Bodies = Matter.Bodies,
//     Composite = Matter.Composite;

// var engine;
// var world;
// var particles = [];
// var dots = [];
// var rows = 15;
// var cols = 15;

// function setup(){
//     createCanvas(600,800);
//     engine = Engine.create();
//     world = engine.world;

//     newParticle();
//     var spacing = width / (cols + 1);
//     for(let j = 0; j < rows; j++){
//         for(let i = 0; i < cols; i++){
//             var x = (i + 1) * spacing;
//             var y = (j + 1) * spacing;
//             var p = new Plinko(x, y, 5);
//             dots.push(p);
//         }
//     }
// }

// function newParticle(){
//     var p = new Particle(300, 50, 10);      
//     particles.push(p);
// }

// function draw(){
//     if(frameCount % 30 == 0){
//         newParticle();
//     }
//     background(51);
//     Engine.update(engine);
//     for(let i = 0; i < particles.length; i++){
//         particles[i].show();
//     }
//     for(let i = 0; i < dots.length; i++){
//         dots[i].show();
//     }
// }



var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

var engine;
var world;
var particles = [];
var dots = [];
var rows = 17;
var startDots = 3;
var gravityStrength = 0.4;

let dropdown = document.querySelector('.rowdrop');
rows = parseInt(dropdown.value);

dropdown.addEventListener('change', function() {
    rows = parseInt(this.value);
    resetBoard();
});

function resetBoard() {

    for (let dot of dots) {
        World.remove(world, dot.body);

    }
    dots = [];

    createTriangleBoard();
}

function setup() {
    let canvas = createCanvas(600, 560);
    canvas.parent('canvas');
    engine = Engine.create();
    world = engine.world;

    newParticle();
    createTriangleBoard();
    engine.world.gravity.y = gravityStrength;
}

function createTriangleBoard() {
    var spacing = width / (rows + startDots);
    var verticalSpacing = 4;
    for (let j = 0; j < rows; j++) {
        var numDotsInRow = startDots + j;
        for (let i = 0; i < numDotsInRow; i++) {
            var x = width / 2 + (i - (numDotsInRow - 1) / 2) * spacing;
            var y = 35 + j * (spacing + verticalSpacing);
            var p = new Plinko(x, y, 3.2);
            dots.push(p);
        }
    }
    
    // Add walls
    // var wallThickness = 10;
    // var leftWall = new Boundary(0, height / 2, wallThickness, height, 0);
    // var rightWall = new Boundary(width, height / 2, wallThickness, height, 0);
    // var bottom = new Boundary(width / 2, height, width, wallThickness, 0);
    // dots.push(leftWall, rightWall, bottom);
} 

function newParticle() {
    var mean = width / 2;
    var sd = width / 50; 
    var x = randomGaussian(mean, sd);
    let sizeOfDot
    if(rows == 16||rows == 15 || rows == 14){
        sizeOfDot = 7;
    } 
    else if(rows == 13||rows == 12 || rows == 11){
        sizeOfDot = 8;
    }
    else if(rows == 10||rows == 9 || rows == 8){
        sizeOfDot = 9;
    }
    var p = new Particle(x, 0, sizeOfDot);
    particles.push(p);
}

function draw() {
    // if (frameCount % 30 == 0) {
    //     newParticle();
    // }

    document.querySelector('.btnofbet').addEventListener('click', newParticle);

    clear();
    Engine.update(engine);
    for (let i = 0; i < particles.length; i++) {
        particles[i].show();
        if (particles[i].isOffScreen()) {
            World.remove(world, particles[i].body);
            
            particles.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].show();
    }
}


Particle.prototype.isOffScreen = function() {
    var pos = this.body.position;
    return pos.y > height + 50;
};


function Boundary(x, y, w, h, a) {
    var options = {
        friction: 0,
        restitution: 1,
        angle: a,
        isStatic: true
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
}

Boundary.prototype.show = function() {
    fill(128);
    stroke(255);
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
};