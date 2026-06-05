class HanabiParticles {
    constructor(amount, img, duration, x, y) {
        this.particles = [];
        this.x = x;
        this.y = y;
        for (let i = 0; i < amount; i++) {
            const p = new Particle(img, duration, 0, 0, 100);
            this.particles.push(p);
        }
        this.isAlive = true;
        this.startTime = millis();
    }

    setTranslation(directionOffsetRange, distanceMin, distanceMax, speedMin, speedMax, accelerationMin, accelerationMax) {
        const randomArr = this.randomArray(this.particles.length, 0.0, 1.0);
        for (let i = 0; i < this.particles.length; i++) {
            const direction = i * 360 / this.particles.length + random(directionOffsetRange);
            const angle = direction * PI / 180;
            const distance = randomArr[i] * (distanceMax - distanceMin) + distanceMin;
            const speed = randomArr[i] * (speedMax - speedMin) + speedMin;
            const acceleration = randomArr[i] * (accelerationMax - accelerationMin) + accelerationMin;
            let p = this.particles[i];
            p.x = cos(angle) * distance;
            p.y = sin(angle) * distance;
            p.vx = cos(angle) * speed;
            p.vy = sin(angle) * speed;
            p.ax = cos(angle) * acceleration;
            p.ay = sin(angle) * acceleration;
            p.angle = angle;
        }
    }

    setRotation(angularVelocity) {
        const degToRad = PI / 180;
        this.particles.forEach(p => p.angularVelocity = angularVelocity * degToRad);
    }

    setSizeAndExpansion(sizeMin, sizeMax, expansionMin, expansionMax) {
        const randomArr = this.randomArray(this.particles.length, 0.0, 1.0);
        this.particles.forEach((p, i) => {
            p.size = randomArr[i] * (sizeMax - sizeMin) + sizeMin;
            p.expansion = randomArr[i] * (expansionMax - expansionMin) + expansionMin;
        });
    }

    setFadeOut(fadeOut) {
        this.particles.forEach(p => p.fadeOut = fadeOut);
    }

    setColor(baseColor, colorMap) {
        let pix = [255.0, 255.0, 255.0, 255.0];
        if (colorMap != null) {
            colorMap.loadPixels();
            pix = colorMap.pixels;
        }
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            const rand = floor(random(0, pix.length / 4));
            let r = pix[rand * 4] * red(baseColor) / 255;
            let g = pix[rand * 4 + 1] * green(baseColor) / 255;
            let b = pix[rand * 4 + 2] * blue(baseColor) / 255;
            p.color = color(r, g, b);
        }
    }

    update() {
        if (!this.isAlive) return;
        const elapsed = (millis() - this.startTime) * 0.001;
        if (elapsed > this.duration) {
            this.isAlive = false;
            return;
        }
        push();
        translate(this.x, this.y);
        this.particles.forEach(p => p.update());
        pop();
    }

    randomArray(length, min, max) {
        const arr = [];
        let a_min = 1.0, a_max = 0.0;
        for (let i = 0; i < length; i++) {
            arr.push(random(0.0, 1.0));
            if (arr[i] < a_min) a_min = arr[i];
            if (arr[i] > a_max) a_max = arr[i];
        }
        const scale = (max - min) / (a_max - a_min);
        return arr.map(x => (x - a_min) * scale + min);
    }
}