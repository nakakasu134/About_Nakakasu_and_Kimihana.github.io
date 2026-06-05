const minWorldSize = 800;
let worldWidth;
let worldHeight;

let space;
let img;
let colorMap;

function preload() {
    img = loadImage('./images/whiteSakura.png');
    colorMap = loadImage('./images/GraduationMapR.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    setWorldSize();
    imageMode(CENTER);

    space = new HanabiSpace();
}

function draw() {
    if(window.crapNaruko){
        space.addHanabi(random(0, worldWidth), random(0, worldHeight));
        window.crapNaruko = false;
    }
    push();
    let scaleFactor = width / worldWidth;
    scale(scaleFactor);
    background(0);
    space.update();
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    setWorldSize();
}

function setWorldSize() {
    if (width < height) {
        worldWidth = minWorldSize;
        worldHeight = worldWidth * height / width;
    } else {
        worldHeight = minWorldSize;
        worldWidth = worldHeight * width / height;
    }
}