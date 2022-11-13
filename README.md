Node.js based API for the HC-SR501 motion detector.

# Connect sensor

<img src="https://user-images.githubusercontent.com/51929566/201531314-db63b98d-69c2-4498-8851-f7a821b003ab.png" width="270">

# Import

```jsx
const { HCSR501 } = require("hc-sr501-sensor")
```

# Constructor `HCSR501(sensorPin, delay)`

## Parameters

- `sensorPin` You have to specify the GPIO pin where the sensor is connected to.
- `delay` This parameter is optional. You can specify a delay in milliseconds to stop motion detection. The smallest number is 3000.

# Example

```jsx
const sensor = new HCSR501(17, 3000)

sensor.watch((motion) => {
    // motion = boolean
    if(motion) {
        // do something
    } else {
        // do something else
    }
})
```