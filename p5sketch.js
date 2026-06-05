import Particle from './particle.js';

let particle;
let img;

function preload() {
    img = loadImage('./images/whiteSakura.png');
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    particle = new Particle(img, width / 2, height / 2, 100, color(255, 255, 255));
}

function draw(){
    background(0);
    particle.display();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}