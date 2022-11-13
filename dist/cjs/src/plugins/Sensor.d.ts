import { Sensor } from "../types/sensor";
export default class HCSR501 implements Sensor {
    private sensor;
    readonly sensorPin: Sensor["sensorPin"];
    readonly delay?: Sensor["delay"];
    /**
     * @param sensorPin GPIO Pin
     * @param delay Delay in ms to stop motion detection
     */
    constructor(sensorPin: Sensor["sensorPin"], delay?: Sensor["delay"]);
    watch(cb: (value: boolean) => void): void;
}
