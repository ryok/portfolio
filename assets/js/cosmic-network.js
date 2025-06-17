// Cosmic Network Animation for Portfolio
// Inspired by cosmic-network visualization

let particles = [];
const maxParticles = 100;
const connectionDistance = 120;
let mouseForce = 0.05;
let canvas;
let attractors = [];
let sectionColors = {
  header: { r: 100, g: 200, b: 255 },
  main: { r: 255, g: 100, b: 150 },
  footer: { r: 150, g: 255, b: 100 }
};

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('position', 'fixed');
  canvas.style('z-index', '-1');
  canvas.style('top', '0');
  canvas.style('left', '0');
  
  // Initialize with some particles
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
  
  // Setup section attractors
  updateAttractors();
}

function draw() {
  // Create motion blur effect
  push();
  drawingContext.globalAlpha = 0.05;
  fill(0, 0, 0);
  noStroke();
  rect(0, 0, width, height);
  pop();
  
  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    
    // Apply mouse attraction
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      let force = createVector(mouseX - p.pos.x, mouseY - p.pos.y);
      force.mult(mouseForce * 0.001);
      p.applyForce(force);
    }
    
    // Apply section attractors
    for (let attractor of attractors) {
      const d = dist(p.pos.x, p.pos.y, attractor.x, attractor.y + window.pageYOffset);
      if (d < attractor.radius) {
        let force = createVector(
          attractor.x - p.pos.x,
          attractor.y + window.pageYOffset - p.pos.y
        );
        force.mult(attractor.force * 0.001);
        p.applyForce(force);
        
        // Influence particle color based on nearby attractor
        p.targetColor = attractor.color;
      }
    }
    
    // Remove dead particles
    if (p.isDead()) {
      particles.splice(i, 1);
    }
  }
  
  // Draw connections
  strokeWeight(1);
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const d = p5.Vector.dist(particles[i].pos, particles[j].pos);
      if (d < connectionDistance) {
        const alpha = map(d, 0, connectionDistance, 255, 0);
        stroke(particles[i].color.levels[0], particles[i].color.levels[1], particles[i].color.levels[2], alpha);
        line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
      }
    }
  }
  
  // Draw particles
  noStroke();
  for (let p of particles) {
    p.display();
  }
  
  // Continuously add new particles
  if (particles.length < maxParticles && frameCount % 3 === 0) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function mousePressed() {
  // Add particles at mouse position
  for (let i = 0; i < 5; i++) {
    if (particles.length < maxParticles) {
      particles.push(new Particle(mouseX + random(-20, 20), mouseY + random(-20, 20)));
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateAttractors();
}

function updateAttractors() {
  attractors = [];
  
  // Get positions of major sections
  const header = document.getElementById('header');
  const main = document.getElementById('main');
  const footer = document.getElementById('footer');
  
  if (header) {
    const rect = header.getBoundingClientRect();
    attractors.push({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      force: 0.02,
      color: sectionColors.header,
      radius: Math.min(rect.width, rect.height) / 2
    });
  }
  
  if (main) {
    const rect = main.getBoundingClientRect();
    attractors.push({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      force: 0.015,
      color: sectionColors.main,
      radius: Math.min(rect.width, rect.height) / 3
    });
  }
  
  if (footer) {
    const rect = footer.getBoundingClientRect();
    attractors.push({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      force: 0.01,
      color: sectionColors.footer,
      radius: Math.min(rect.width, rect.height) / 4
    });
  }
}

// Update attractor positions on scroll
window.addEventListener('scroll', updateAttractors);
window.addEventListener('resize', updateAttractors);

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0);
    this.size = random(3, 8);
    this.lifespan = 255;
    this.maxLife = 255;
    this.pulsePhase = random(TWO_PI);
    this.colorPhase = random(TWO_PI);
    this.targetColor = null;
    this.updateColor();
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  update() {
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    // Bounce off edges
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -0.9;
      this.pos.x = constrain(this.pos.x, 0, width);
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -0.9;
      this.pos.y = constrain(this.pos.y, 0, height);
    }
    
    // Update lifespan
    this.lifespan -= 0.5;
    
    // Update color
    this.colorPhase += 0.02;
    this.updateColor();
  }
  
  updateColor() {
    // Create vibrant colors using sine waves
    let r = sin(this.colorPhase) * 127 + 128;
    let g = sin(this.colorPhase + TWO_PI / 3) * 127 + 128;
    let b = sin(this.colorPhase + TWO_PI * 2 / 3) * 127 + 128;
    
    // Blend with target color if set
    if (this.targetColor) {
      r = lerp(r, this.targetColor.r, 0.05);
      g = lerp(g, this.targetColor.g, 0.05);
      b = lerp(b, this.targetColor.b, 0.05);
    }
    
    this.color = color(r, g, b);
  }
  
  display() {
    // Calculate pulsing size
    const pulse = sin(frameCount * 0.05 + this.pulsePhase) * 0.5 + 1;
    const currentSize = this.size * pulse;
    
    // Draw glow effect
    push();
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = this.color.toString();
    
    // Fade based on lifespan
    const alpha = map(this.lifespan, 0, this.maxLife, 0, 255);
    fill(red(this.color), green(this.color), blue(this.color), alpha);
    
    ellipse(this.pos.x, this.pos.y, currentSize);
    pop();
  }
  
  isDead() {
    return this.lifespan <= 0;
  }
}