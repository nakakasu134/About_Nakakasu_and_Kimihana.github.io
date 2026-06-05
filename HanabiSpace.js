class HanabiSpace {
    constructor() {
        this.hanabis = [];
    }

    update() {
        this.hanabis.forEach(hanabi => hanabi.update());
        this.hanabis = this.hanabis.filter(hanabi => hanabi.isAlive);
    }

    addHanabi(x,y) {
        let hanabi = new Hanabi(x, y, "#ffffff", colorMap, img);

        this.hanabis.push(hanabi);
    }
}