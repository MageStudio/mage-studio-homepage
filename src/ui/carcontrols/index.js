import { Scripts } from "mage-engine";
import { playEngineSound } from "../../levels/Main/sounds";
import EngineStartButton from "./EngineStartButton";
import Speedometer from "./Speedometer";

const CarControls = ({ car, speedometerVisible, engineStarted, onEngineStartClick }) => {
    return (
        <div className="carcontrols">
            { speedometerVisible && <Speedometer car={car} /> }
            <EngineStartButton engineStarted={engineStarted} onClick={onEngineStartClick} />
        </div>
    );
};

export default CarControls;