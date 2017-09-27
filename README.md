<div align="center">
  <img src="https://github.com/TobiasHennig/stopwatch/blob/master/stopwatchjs.png?raw=true" alt="StopWatch.js Logo" width="170" height="190"/>
</div>

# StopWatch
> Accurately measure elapsed time in JavaScript.

* 814 B minified and gzipped
* No external dependencies
* Send timings to [Google Analytics User Timing](https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings)

## Quick start

1. Include StopWatch script into your html document.
```
<script src="./StopWatch.min.js"></script>
```

2. Start, stop and send the timing to Google Analytics
```
let timing = StopWatch.create('load', {
  category: 'JS Dependencies'
});
timing.start();
...
timing.stop();
timing.send();
```

## Examples

To see the script in action, open the example in the `examples` folder.

* **simple.html** - Simple example which use most of the functions

## Support

The core technology behind this library is `performance.now()` which has a [good support](http://caniuse.com/#search=performance.now) on all current browsers.

* Internet Explorer 9+
* Edge
* Firefox 15+
* Chrome 24+
* Safari 8+
* Opera 15+
* iOS Safari 8+
* Android 4.1+

## Getting started

1. Clone the GitHub Repository into a local folder.
```
$ git clone https://github.com/TobiasHennig/stopwatch.git
```

2. Change into `stopwatch` directory and install depedencies. [Install Node](https://nodejs.org/en/download/) if necessary.
```
$ cd stopwatch && npm install
```

3. Run and watch tests
```
$ npm run test
```

## API

### StopWatch.create(name: string, options?: object): Timing
Creates a named timing with an optional category.

### StopWatch.get(name?: string): Timing | Timing[]
Returns a timing by name or returns all timings.

### StopWatch.clear(name?: string): StopWatch
Clear a timing by name or clear all stopwatch timings.

### StopWatch.send(name?: string): StopWatch
Send a timing by name or send all timings to [Google Analytics User Timing](https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings).

### Timing.start(): Timing
Start the timing. Creates a start performance mark if supported.

### Timing.stop(): Timing
Stop the timing. Creates a stop performance mark if supported and creates a
performance measure which is visible in the [Google Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference).

### Timing.clear(): Timing
Clear the timing. Removes the the performance marks and measure if supported.

### Timing.send(): Timing
Send the timing to [Google Analytics User Timing](https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings).

## Not what you looking for?
Try one of these:
* [appmetrics](https://www.npmjs.com/package/appmetrics.js) from Eric Bidelman
* [marky](https://www.npmjs.com/package/marky) from Nolan Lawson
