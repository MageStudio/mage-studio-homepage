import { Box } from 'mage-engine';
import { Lights } from 'mage-engine';
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

const AMBIENTLIGHT_OPTIONS = {
    color: PALETTES.BASE.WHITE,
    intensity: 2
};

const HEMISPHERELIGHT_OPTIONS = {
    color: {
        sky: PALETTES.FRENCH_PALETTE.SQUASH_BLOSSOM,
        ground: PALETTES.BASE.WHITE
    },
    intensity: 2
};

const SUNLIGHT_OPTIONS = {
    color: PALETTES.BASE.WHITE,//PALETTES.FRENCH_PALETTE.MELON_MELODY,
    intensity: .5,
    far: 500,
    mapSize: 1024,
};

const CAR_MATERIAL_PROPERTIES = {
    roughness: .5,
    metalness: .8
    // emissive: new THREE.Color(PALETTES.BASE.WHITE)
};

const MATERIAL_PROPERTIES = {
    roughness: .5,
    metalness: 0.1
    // emissive: new THREE.Color(PALETTES.BASE.WHITE)
};

export default class Main extends Level {

    addLights() {
        this.ambient = AmbientLight.create(AMBIENTLIGHT_OPTIONS);
        this.hemi = HemisphereLight.create(HEMISPHERELIGHT_OPTIONS);
        
        const light = SunLight.create(SUNLIGHT_OPTIONS);
        light.setPosition({ y: 100, x: 250, z: -100 });
        light.addHelper();
        window.light = light;

        // this.cascadeShadowMaps = Lights.createCascadeShadowMaps({ cascades: 4 });
    }

    addSky() {
        this.sky = new Sky({});
        this.sky.setSun(.1, .1, 100);
    }

    createWheel(index) {
        return Models.get('wheel', { name: `wheel_${index}` });
    }

    createCar(name) {
        return Models.get('car', { name });
    }

    addCar() {
        const car = this.createCar('first');
        car.setPosition({ y: 2 });
        car.setMaterialFromName(MATERIALS.STANDARD, MATERIAL_PROPERTIES);
        
        const wheels = [
            this.createWheel(1),
            this.createWheel(2),
            this.createWheel(3),
            this.createWheel(4),
        ];

        // car.addEventListener(PHYSICS_EVENTS.VEHICLE.SPEED, this.handleSpeedChange);
        
        car.addScript(Scripts.BUILTIN.BASECAR, {
            wheels,
            mass: 800,
            friction: 800,
            maxEngineForce: 2500,
            maxBreakingForce: 500,
            steeringClamp: 1,
            steeringIncrement: 0.07,
            debug: true,
            wheelsOptions: {
                back: {
                    axisPosition: -1.25,
                    radius: .35,
                    halfTrack: 1,
                    axisHeight: 0
                },
                front: {
                    axisPosition: 1.2,
                    radius: .35,
                    halfTrack: 1,
                    axisHeight: 0
                }
            },
            suspensions: {
                stiffness: 20.0,
                damping: 2.3,
                compression: 4.4,
                restLength: 1
            }
        });

        Scene.getCamera().addScript(Scripts.BUILTIN.SMOOTH_CAR_FOLLOW, { target: car, distance: 3, height: 2, lerpFactor: 0.1 });
        // const tracker = new Cube(1, 0xff0000);
        // car.add(tracker);

        // tracker.setPosition({ z: -5, y: 2 });
        // tracker.add(Scene.getCamera());
        // // tracker.lookAt(car.getPosition().negate());
        // setTimeout(() => Scene.getCamera().lookAt(car.getPosition()), 1000);

        // window.camera = Scene.getCamera();
        // window.car = car;

        // window.tracker = tracker;
    }

    onCreate() {
        this.addLights();
        this.addSky();

        Scene.getCamera().setPosition({ x:0, y: 0, z: 0 });
        // Scene.setClearColor(0x091a28);
        // Scene.setBackground(0x091a28);
        Scene.setRendererOutputEncoding(THREE.sRGBEncoding);
        // PostProcessing.add(EFFECTS.HUE_SATURATION, SATURATION_OPTIONS);

        Scene.getCamera().setPosition({ x: 2, y: 4, z: 0 });
        const orbit = Controls.setOrbitControl();

        orbit.setTarget({ x: 0, y: 0, z: 0 });
        orbit.setMinPolarAngle(0);
        orbit.setMaxPolarAngle(Math.PI/2.5);
        orbit.setMaxDistance(15);


        // const track = Models.get('racetrack');
        // const materials = track.setMaterialFromName(MATERIALS.STANDARD, MATERIAL_PROPERTIES);
        // track.setScale({ x: 2, y: 2, z: 2 });
        // track.enablePhysics({ mass: 0 });

        const ground = new Box(500, 1, 500, PALETTES.FRENCH_PALETTE.AURORA_GREEN);
        ground.setPosition({ y: -4 });
        ground.setMaterialFromName(MATERIALS.STANDARD, MATERIAL_PROPERTIES);
        ground.enablePhysics({ mass: 0 });

        // window.ground = ground;
        // window.track = track;
        // if (materials.length) {
        //     materials.forEach(material => this.csm.setupMaterial(material));
        // } else {
        //     this.csm.setupMaterial(materials);
        // }

        window.jeep = Models.get('jeep');
        jeep.setMaterialFromName(MATERIALS.STANDARD, CAR_MATERIAL_PROPERTIES);


        // this.addCar();
    }
}