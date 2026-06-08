import p5 from "p5";
import type { IShape } from "./IShape";
import { Particle } from "./Particle";
import type { IColorMap } from "./IColorMap";

export class HanabiParticles {
    private p: p5;
    private particles: Particle[];
    private duration: number;
    private x: number;
    private y: number;
    private isAlive: boolean;
    private startTime: number;

    IsAlive() {
        return this.isAlive;
    }

    constructor(p: p5, amount: number, shape: IShape, duration: number, x: number, y: number) {
        this.p = p;
        this.particles = [];
        this.duration = duration;
        this.x = x;
        this.y = y;
        for (let i = 0; i < amount; i++) {
            const particle = new Particle(p, shape, duration, 0, 0, 100);
            this.particles.push(particle);
        }
        this.isAlive = true;
        this.startTime = p.millis();
    }

    setTranslation(directionOffsetRange: number,
        distanceMin: number, distanceMax: number,
        speedMin: number, speedMax: number,
        accelerationMin: number, accelerationMax: number) {
        const randomArr = this.randomArray(this.particles.length, 0.0, 1.0);
        for (let i = 0; i < this.particles.length; i++) {
            const direction = i * 360 / this.particles.length + Math.random() * directionOffsetRange;
            const angle = direction * this.p.PI / 180;
            const distance = randomArr[i] * (distanceMax - distanceMin) + distanceMin;
            const speed = randomArr[i] * (speedMax - speedMin) + speedMin;
            const acceleration = randomArr[i] * (accelerationMax - accelerationMin) + accelerationMin;
            let particle = this.particles[i];
            particle.x = Math.cos(angle) * distance;
            particle.y = Math.sin(angle) * distance;
            particle.vx = Math.cos(angle) * speed;
            particle.vy = Math.sin(angle) * speed;
            particle.ax = Math.cos(angle) * acceleration;
            particle.ay = Math.sin(angle) * acceleration;
            particle.angle = angle;
        }
    }

    setRotation(angularVelocity: number) {
        const p = this.p;
        const degToRad = p.PI / 180;
        this.particles.forEach(particle => particle.angularVelocity = angularVelocity * degToRad);
    }

    setSizeAndExpansion(sizeMin: number, sizeMax: number, expansionMin: number, expansionMax: number) {
        const randomArr = this.randomArray(this.particles.length, 0.0, 1.0);
        this.particles.forEach((p, i) => {
            p.size = randomArr[i] * (sizeMax - sizeMin) + sizeMin;
            p.expansion = randomArr[i] * (expansionMax - expansionMin) + expansionMin;
        });
    }

    setFadeOut(fadeOut: number) {
        this.particles.forEach(p => p.fadeOut = fadeOut);
    }

    setColor(baseColor: p5.Color, colorMap: IColorMap) {
        const p = this.p;

        for (let i = 0; i < this.particles.length; i++) {
            const tint = colorMap.getColor();
            let r = p.red(tint) * p.red(baseColor) / 255;
            let g = p.green(tint) * p.green(baseColor) / 255;
            let b = p.blue(tint) * p.blue(baseColor) / 255;
            this.particles[i].color = p.color(r, g, b);
        }
    }

    update() {
        if (!this.isAlive) return;
        const p = this.p;
        const elapsed = (p.millis() - this.startTime) * 0.001;
        if (elapsed > this.duration) {
            this.isAlive = false;
            return;
        }
        p.push();
        p.translate(this.x, this.y);
        this.particles.forEach(p => p.update());
        p.pop();
    }

    randomArray(length: number, min: number, max: number) {
        const arr = [];
        let a_min = 1.0, a_max = 0.0;
        for (let i = 0; i < length; i++) {
            arr.push(Math.random());
            if (arr[i] < a_min) a_min = arr[i];
            if (arr[i] > a_max) a_max = arr[i];
        }
        const scale = (max - min) / (a_max - a_min);
        return arr.map(x => (x - a_min) * scale + min);
    }
}