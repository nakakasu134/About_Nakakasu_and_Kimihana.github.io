import p5 from "p5";
import { Hanabi } from "./Hanabi";

export class HanabiSpace {
    private p: p5;
    private hanabis: Hanabi[];

    constructor(p: p5) {
        this.p = p;
        this.hanabis = [];
    }

    update() {
        this.hanabis.forEach(hanabi => hanabi.update());
        this.hanabis = this.hanabis.filter(hanabi => hanabi.IsAlive());
    }

    addHanabi(x: number, y: number) {
        let hanabi = new Hanabi(this.p, x, y, this.p.color(255, 255, 255));

        this.hanabis.push(hanabi);
    }
}