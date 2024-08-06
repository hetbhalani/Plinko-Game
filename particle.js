function Particle(x, y, r) { 
    var options = {
        restitution: 0.2,   
        friction: 1,
        density: -2,
    }
    
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);
}

Particle.prototype.show = function() { 
    fill(255,0,0);
    stroke(255,0,0);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop(); 
}