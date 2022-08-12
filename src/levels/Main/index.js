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
    PALETTES,
    Sky,
    PostProcessing,
    Box,
    store,
    Lights,
    Audio
} from 'mage-engine';
import { speedometerVisible } from '../../ui/actions/track';
import CarEngineAudio from '../scripts/CarEngineAudio';
import Shake from '../scripts/Shake';

export const WHITE = 0xffffff;
export const SUNLIGHT = 0xffeaa7;
export const DARKER_GROUND = 0X78e08f;
export const GROUND = 0xb8e994;
export const BACKGROUND = 0xdff9fb;//0xddf3f5;

const DOF_OPTIONS = {
    focus: 1.0,
    aperture: .0003,//0.0002,//0.0001,
    maxblur: 0.003//0.006
};

const SATURATION_OPTIONS = {
    saturation: 0.2
};

const { EFFECTS, MATERIALS, TEXTURES } = constants;

const AMBIENTLIGHT_OPTIONS = {
    color: PALETTES.FRENCH_PALETTE.SPRAY,
    intensity: .5
};

const HEMISPHERELIGHT_OPTIONS = {
    color: {
        sky: PALETTES.FRENCH_PALETTE.SQUASH_BLOSSOM,
        ground: PALETTES.FRENCH_PALETTE.REEF_ENCOUNTER
    },
    intensity: .5
};

const SUNLIGHT_OPTIONS = {
    color: PALETTES.BASE.WHITE,
    intensity: 1,
    far: 500,
    mapSize: 2048
};

const MATERIAL_PROPERTIES = {
    roughness: .8,
    metalness: 0
};

const CAR_OPTIONS = {
    mass: 800,
    friction: 1000,
    maxEngineForce: 2500,
    maxBreakingForce: 500,
    steeringClamp: .7,
    steeringIncrement: 0.04,
    debug: true,
    wheelsOptions: {
        back: {
            axisPosition: -.6,
            radius: .35,
            halfTrack: .7,
            axisHeight: 0
        },
        front: {
            axisPosition: .6,
            radius: .35,
            halfTrack: .7,
            axisHeight: 0
        }
    },
    suspensions: {
        stiffness: 15.0,
        damping: 2.3,
        compression: 4.4,
        restLength: .7
    }
}

export default class Main extends Level {

    addLights() {
        AmbientLight.create(AMBIENTLIGHT_OPTIONS);
        HemisphereLight.create(HEMISPHERELIGHT_OPTIONS);
        Lights.createCascadeShadowMaps({ cascades: 4 });
    }

    addSky() {
        this.sky = new Sky({});
        this.sky.setSun(.1, .1, 100);
    }

    createWheel(index) {
        return Models.get('wheel', { name: `wheel_${index}` });
    }

    addCar() {
        const car = Models.get('jeep');
        car.setMaterialFromName(MATERIALS.STANDARD, MATERIAL_PROPERTIES);
        car.setPosition({ y: 10 });
        
        const wheels = [
            this.createWheel(1),
            this.createWheel(2),
            this.createWheel(3),
            this.createWheel(4),
        ];
        
        car.addScript(Scripts.BUILTIN.BASECAR, { wheels, autostart: false, ...CAR_OPTIONS });
        car.addScript('CarShake', { axis: 'z', speed: 50, angle: .01, repeat: 7 });

        Scene
            .getCamera()
            .addScript(Scripts.BUILTIN.SMOOTH_CAR_FOLLOW, { target: car, distance: 3, height: 3, lerpFactor: 0.08, lookAtHeight: 1 });

        const frontAxis = new Box(1, .1, .1, PALETTES.BASE.BLACK);
        const backAxis = new Box(1, .1, .1, PALETTES.BASE.BLACK);
        
        car.add([frontAxis, backAxis]);

        backAxis.setPosition({ z: -.65, y: -.47 });
        frontAxis.setPosition({ z: .6, y: -.52 });

        store.dispatch(speedometerVisible(car));
    }

    createTrack() {
        const track = Models.get('castletrack');
        track.setMaterialFromName(MATERIALS.STANDARD, MATERIAL_PROPERTIES);
        track.setScale({ x: 8, y: 8, z: 8 });
        track.enablePhysics({ mass: 0 });
    }

    setupScene() {
        Scene.getCamera().setPosition({ x: 0, y: 0, z: 0 });
        Scene.setClearColor(PALETTES.FRENCH_PALETTE.SQUASH_BLOSSOM);
        Scene.setBackground(PALETTES.FRENCH_PALETTE.SQUASH_BLOSSOM);
        Scene.setRendererOutputEncoding(THREE.sRGBEncoding);
        PostProcessing.add(EFFECTS.HUE_SATURATION, SATURATION_OPTIONS);
        PostProcessing.add(EFFECTS.DEPTH_OF_FIELD, DOF_OPTIONS);
    }

    setupOrbitControls() {
        Scene.getCamera().setPosition({ x: 2, y: 4, z: 0 });
        const orbit = Controls.setOrbitControl();

        orbit.setTarget({ x: 0, y: 0, z: 0 });
        orbit.setMinPolarAngle(0);
        orbit.setMaxPolarAngle(Math.PI/2.5);
        orbit.setMaxDistance(15);
    }

    onCreate() {
        Audio.setVolume(.5);

        Scripts.register('CarEngineAudio', CarEngineAudio);
        Scripts.register('CarShake', Shake);

        this.addLights();
        this.addSky();

        this.setupScene();
        // this.setupOrbitControls();

        this.createTrack();
        this.addCar();
    }
}