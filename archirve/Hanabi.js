class Hanabi {
    constructor(x, y, baseColor, colorMap, image0) {
        let group0 = new HanabiParticles(12, image0, 1, 0, 0);
        group0.setTranslation(30, 60, 80, 200, 250, -200, -250);
        group0.setRotation(360);
        group0.setSizeAndExpansion(80, 120, -80, -120);
        group0.setFadeOut(255);
        group0.setColor(baseColor,colorMap);

        this.particles = [group0];
        this.x = x;
        this.y = y;
        this.isAlive = true;
    }

    update() {
        if (!this.isAlive) return;
        push();
        translate(this.x, this.y);
        this.particles.forEach(particle => particle.update());
        pop();
        this.particles = this.particles.filter(particle => particle.isAlive);
        this.isAlive = this.particles.length > 0;
    }
}