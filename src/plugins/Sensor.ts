import { Sensor } from "../types/sensor"
import { Gpio } from "onoff"

export default class HCSR501 implements Sensor {
    private sensor: Gpio
    public readonly sensorPin: Sensor["sensorPin"]
    public readonly delay?: Sensor["delay"]

    /**
     * @param sensorPin GPIO Pin
     * @param delay Delay in ms to stop motion detection
     */
    constructor(sensorPin: Sensor["sensorPin"], delay?: Sensor["delay"]) {
        this.sensorPin = sensorPin
        this.sensor = new Gpio(sensorPin, "in", "both")
        if (delay) {
            this.delay = delay
        }
    }

    watch(cb: (value: boolean) => void): void {
        try {
            let timeout: any
            let motionState = false // Prevent multiple true outputs in a row

            this.sensor.watch((err, value) => {
                if (err) {
                    throw Error(err as any)
                } else {
                    if (value === 0) {
                        timeout = setTimeout(async () => {
                            motionState = false
                            cb(false)
                        }, this.delay !== undefined && this.delay >= 3000 ? this.delay : 3000) // 3000 ms by default to prevent false output if motion exists
                    } else if (value === 1) {
                        timeout && clearTimeout(timeout)
                        if (motionState === false) {
                            motionState = true
                            cb(true)
                        }
                    }
                }
            })
        } catch (err: any) {
            throw Error(err)
        }
    }
}