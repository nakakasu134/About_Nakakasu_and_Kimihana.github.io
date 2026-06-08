import p5 from "p5";
import type { IShape } from "./IShape";
import { SakuraShape } from "./SakuraShape";
import { HanabiParticles } from "./HanabiParticle";
import { ColorMapR } from "./ColorMapR";

export class Hanabi {
    private p: p5;
    private particles: HanabiParticles[];
    private x: number;
    private y: number;
    private isAlive: boolean;

    IsAlive(){
        return this.isAlive;
    }

    constructor(p: p5, x: number, y: number, baseColor: p5.Color) {
        this.p = p;
        let image0: IShape = new SakuraShape(p);
        let group0 = new HanabiParticles(p, 12, image0, 1, 0, 0);
        group0.setTranslation(30, 60, 80, 200, 250, -200, -250);
        group0.setRotation(360);
        group0.setSizeAndExpansion(80, 120, -80, -120);
        group0.setFadeOut(255);
        group0.setColor(baseColor, new ColorMapR(p));

        this.particles = [group0];
        this.x = x;
        this.y = y;
        this.isAlive = true;
    }

    update() {
        if (!this.isAlive) return;
        const p = this.p;
        p.push();
        p.translate(this.x, this.y);
        this.particles.forEach(particle => particle.update());
        p.pop();
        this.particles = this.particles.filter(particle => particle.IsAlive());
        this.isAlive = this.particles.length > 0;
    }
}