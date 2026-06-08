import p5 from "p5";
import type { IShape } from "./IShape";

export class SakuraShape implements IShape {
    private p:p5;

    constructor(p:p5) {
        this.p = p;
    }

    drawShape(x: number, y: number, size: number): void {
        for (let i = 0; i < 5; i++) {
            this.drawPart(x, y, size, i * 72, true);
            this.drawPart(x, y, size, i * 72, false);
        }
    }

    drawPart(x: number, y: number, size: number, rotate: number, isLeft: boolean) {
        const p = this.p;
        p.push();
        p.translate(x, y);
        p.scale(size / 256.0);
        if (isLeft) p.scale(-1, 1);
        p.rotate(rotate * p.PI / 180.0)
        p.beginShape();
        p.vertex(0, 0);
        p.bezierVertex(120, 60);
        p.bezierVertex(100, 180);
        p.bezierVertex(30, 256);
        p.vertex(30, 256);
        p.bezierVertex(18, 250);
        p.bezierVertex(8, 233);
        p.bezierVertex(0, 222);
        p.endShape();
        p.pop();
    }
}