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
var rows = 16;
var startDots = 3;
var gravityStrength = 0.4;

function setup() {
    let canvas = createCanvas(650, 560);
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
            var p = new Plinko(x, y, 3.4);
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
    var x = random(width * 0.45, width * 0.55, width * 0.50); 
    var p = new Particle(x, 50, 6);
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

// Add this method to the Particle class
Particle.prototype.isOffScreen = function() {
    var pos = this.body.position;
    return pos.y > height + 50;
};

// New Boundary class for walls
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