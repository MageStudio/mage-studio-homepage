import { BaseScript, easing } from "mage-engine";

export default class Shake extends BaseScript {

    start(element, { axis, speed, angle, repeat }) {
        this.element = element;
        this.axis = axis;
        this.speed = speed;
        this.angle = angle;
        this.repeat = repeat;
    }

    shake() {
        this.element.setRotation({ [this.axis]: -this.angle });
        this.element.rotateTo({ [this.axis]: this.angle }, this.speed, { loop: easing.LOOPING.BOUNCE, easing: easing.FUNCTIONS.Quadratic.In, repeat: this.repeat })
            .then(() => this.element.rotateTo({ [this.axis]: 0 }, this.speed * 1.6));
    }
}