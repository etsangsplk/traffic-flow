class Vehicle {

    constructor(attrs) {
        Object.assign(this, attrs);
    }

    enter(road) {
        this.road = road;
        this.position = 0;
        this.stretchIndex = 0;
        this.scheduleNextMove();
    }

    scheduleNextMove() {
        this.velocity = this.computeVelocity();
        this.timestamp = new Date().getTime();
        setTimeout(() => this.move(), this.road.sleep);
    }

    move() {
        var number = new Date().getTime() - this.timestamp;
        const elapsed = (number) * this.road.fastForward;
        // console.log('elapsed', number, elapsed);
        this.position += this.velocity * (elapsed / 1000 / 60 / 60);
        this.emitter(this, {position: this.position});
        if (this.position >= 100) {
            this.road.removeVehicle(this);
        } else {
            this.scheduleNextMove();
        }
    };

    computeVelocity() {
        const stretch = this.road.getStretch(this.stretchIndex);
        return stretch.computeVelocity(this.targetVelocity);
    }

}

module.exports = Vehicle;