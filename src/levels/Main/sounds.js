import { Sound } from "mage-engine";

export const playEngineStartSound = (volume) => new Sound('engine_start').play(volume);

export const playEngineSound = (volume) => new Promise(resolve => {
    playEngineStartSound(volume);
    setTimeout(() => {
        const engine = new Sound('engine_running', { loop: true });

        engine.play(volume);
        resolve(engine);
    }, 500);
});