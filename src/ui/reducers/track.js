import { SPEEDOMETER_VISIBLE } from "../actions/types";

const DEFAULT_STATE = {
    speedometerVisible: false,
    car: null
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SPEEDOMETER_VISIBLE: {
            return {
                ...state,
                speedometerVisible: true,
                car: action.car
            }
        }
        default:
            return state;
    }
};