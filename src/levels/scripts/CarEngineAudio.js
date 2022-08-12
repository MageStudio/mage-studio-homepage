import { BaseScript } from "mage-engine";

export default class CarEngineAudio extends BaseScript {

    start(car, { audio }) {
        this.car = car;
        this.audio = audio;
        this.maxSpeed = 100;
    }

    getDetuneFromSpeed = (speed) => {
        const max = 800;
        const min = -800;

        return (Math.abs(speed) * (max * 2) / this.maxSpeed) + min;
    }

    updateSound() {
        const { speed } = this.car.getPhysicsState();
        if (this.audio && speed) {
            this.audio.detune(this.getDetuneFromSpeed(speed));
        }
    }

    update(dt) {
        this.updateSound();
    }
}