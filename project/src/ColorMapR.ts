import p5 from "p5";
import type { IColorMap } from "./IColorMap";

export class ColorMapR implements IColorMap {
    private p: p5;

    constructor(p: p5) {
        this.p = p;
    }

    getColor():p5.Color {
        const hue = Math.random();
        const chroma = Math.random();
        const r = 255.0;
        const g = 255.0 * chroma;
        const b = g + (255.0 - g) * hue;
        return this.p.color(r, g, b);
    }
}
