class Particle {
    constructor(img, duration, x, y, size) {
        this.img = img;
        this.duration = duration;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color(255, 255, 255);
        this.vx = 0.0;
        this.vy = 0.0;
        this.ax = 0.0;
        this.ay = 0.0;
        this.angle = 0.0;
        this.angularVelocity = 0.0;
        this.expansion = 0.0;
        this.fadeOut = 0.0;

        this.isAlive = true;
        this.startTime = millis();
    }

    update() {
        if (this.isAlive) {
            this.move();
            this.display();
        }
    }

    move() {
        const elapsed = (millis() - this.startTime) * 0.001;
        const dt = deltaTime * 0.001;
        if (elapsed > this.duration) {
            this.isAlive = false;
            return;
        }
        this.vx += this.ax * dt;
        this.vy += this.ay * dt;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.angle += this.angularVelocity * dt;
        this.size += this.expansion * dt;
        const alpha = this.color._getAlpha() - this.fadeOut * dt;
        this.color.setAlpha(max(0, alpha));
    }

    display() {
        tint(this.color);
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        image(this.img, 0, 0, this.size, this.size);
        pop();
    }
}
