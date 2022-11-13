export interface Sensor {
    sensorPin: number;
    delay?: number;
    watch(cb: (value: boolean) => void): void;
}
