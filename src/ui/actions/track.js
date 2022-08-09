import { SPEEDOMETER_VISIBLE } from "./types";

export const speedometerVisible = (car) => ({
    type: SPEEDOMETER_VISIBLE,
    car
});