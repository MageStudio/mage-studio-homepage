import { Router, store, constants } from 'mage-engine';
import Main from './levels/Main';
import Root from './ui/root';
import reducers from './ui/reducers';

const { SHADOW_TYPES } = constants;
// const ASSETS_MODELS_BASE_PATH = 'assets/models';
// const ASSETS_TEXTURES_BASE_PATH = 'assets/textures';

const assets = {
    models: {
        racetrack: '/assets/models/racetrack.glb',
        castletrack: '/assets/models/castletrack.obj',
        car: '/assets/models/buggy.gltf',
        jeep: '/assets/models/jeep.glb',
        wheel: '/assets/models/wheel.gltf',
        wheel_jeep: '/assets/models/wheel_jeep.glb'
    }
};

const config = {
    screen: {
        h: window ? window.innerHeight : 800,
        w: window ? window.innerWidth : 600,
        ratio: window ? window.innerWidth / window.innerHeight : 600 / 800,
        frameRate: 120,
        alpha: true,
    },

    postprocessing: {
        enabled: true
    },

    lights: {
        shadows: true,
        shadowType: SHADOW_TYPES.SOFT,
        textureAnisotropy: 1
    },

    physics: {
        enabled: true,
        path: 'ammo.js',
        gravity: { x: 0, y: -9.8, z: 0 },
        fixedUpdate: 60
    },

    tween: {
        enabled: false,
    },

    camera: {
        fov: 75,
        near: 0.1,
        far: 300,
    },

    ui: {
        root: Root
    },

    selector: '#democontainer'
};

window.addEventListener('load', () => {
    store.createStore(reducers, {}, true);

    Router.on('/', Main);
    Router.start(config, assets);
});
