import {
    Level,
    Scene,
    Models,
    AmbientLight,
    HemisphereLight,
    Controls,
    constants,
    THREE,
    Scripts,
    SunLight,
    PALETTES,
    Sky,
    Stats,
    PostProcessing,
    Cube
} from 'mage-engine';

export const WHITE = 0xffffff;
export const SUNLIGHT = 0xffeaa7;
export const DARKER_GROUND = 0X78e08f;
export const GROUND = 0xb8e994;
export const BACKGROUND = 0xdff9fb;//0xddf3f5;

const DOF_OPTIONS = {
    focus: 1.0,
    aperture: .0003,//0.0002,//0.0001,
    maxblur: 0.006//0.01
};

const SATURATION_OPTIONS = {
    saturation: 0.2
};

const { EFFECTS, MATERIALS, TEXTURES } = constants;

export default class Main extends Level {

    onCreate() {
        Scene.getCamera().setPosition({ x:0, y: 0, z: 0 });
        Scene.setClearColor(0x091a28, 0.0);
        Scene.setBackground(0x091a28);

        Scene.getCamera().setPosition({ x: 2, y: 4, z: 0 });
        const orbit = Controls.setOrbitControl();

        orbit.setTarget({ x: 0, y: 0, z: 0 });
        orbit.setMinPolarAngle(0);
        orbit.setMaxPolarAngle(Math.PI/2.5);
        orbit.setMaxDistance(15);

        Cube
            .create(5, 0xff0000)
            .setWireframe(true);
    }
}