class Particle{
    constructor(img,x, y, size, color) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    display() {
        tint(this.color);
        image(this.img, this.x, this.y, this.size, this.size);
    }
}

export default Particle;