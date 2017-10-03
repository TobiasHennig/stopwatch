requirejs(['../dist/StopWatch.js'], function (StopWatch) {
  // Create a new measurement
  StopWatch.create('load', {
    category: 'JS Dependencies'
  });
  // Get the timing by name
  let timing = StopWatch.get('load');
  // Start the timing
  timing.start();
  // ... later ...
  setTimeout(function () {
    // Stop the timing
    timing.stop();
    // Send the timing duration to Google Analytics
    timing.send();
  }, 500);

  // Create a timestamp
  let ttfi = StopWatch.create('time_to_first_interaction', {
    category: 'Timestamps'
  });
  ttfi.start();
  let btn = document.getElementById('btn-ttfi');
  btn.addEventListener('click', e => {
    ttfi.stop();
    ttfi.send();
  });
});