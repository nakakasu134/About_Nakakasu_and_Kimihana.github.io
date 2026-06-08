import p5 from "p5";
import type { IShape } from "./IShape";

export class Particle {
    private p: p5;
    private shape: IShape;
    private duration: number;
    public x: number;
    public y: number;
    public size: number;
    public color: p5.Color;
    public vx: number;
    public vy: number;
    public ax: number;
    public ay: number;
    public angle: number;
    public angularVelocity: number;
    public expansion: number;
    public fadeOut: number;
    private isAlive: boolean;
    private startTime: number;

    constructor(p: p5, shape: IShape, duration: number, x: number, y: number, size: number) {
        this.p = p;
        this.shape = shape;
        this.duration = duration;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = p.color(255, 255, 255);
        this.vx = 0.0;
        this.vy = 0.0;
        this.ax = 0.0;
        this.ay = 0.0;
        this.angle = 0.0;
        this.angularVelocity = 0.0;
        this.expansion = 0.0;
        this.fadeOut = 0.0;

        this.isAlive = true;
        this.startTime = p.millis();
    }

    update() {
        if (this.isAlive) {
            this.move();
            this.display();
        }
    }

    move() {
        const p = this.p;
        const elapsed = (p.millis() - this.startTime) * 0.001;
        const dt = p.deltaTime * 0.001;
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
        const alpha = p.alpha(this.color) - this.fadeOut * dt;
        this.color.setAlpha(p.max(0, alpha));
    }

    display() {
        const p = this.p;
        p.fill(this.color);
        p.push();
        p.translate(this.x, this.y);
        p.rotate(this.angle);
        this.shape.drawShape(0, 0, this.size);
        p.pop();
    }
}
