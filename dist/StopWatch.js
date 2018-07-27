/*! StopWatch v1.3.0 | (c) Tobias Hennig | License MIT */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.StopWatch = factory());
}(this, (function () { 'use strict';

var SUPPORTS_PERF_MARK = !!(performance && performance.mark);

var Timing = function Timing(name) {
  this.name = name;
  this.category = 'default';
  this.duration = -1;
  this.startTime = -1;
};
Timing.now = function now () {
  return performance && performance.now ? performance.now() : Date.now();
};
Timing.prototype.start = function start () {
  this.startTime = Timing.now();
  /* istanbul ignore else */
  if (SUPPORTS_PERF_MARK) {
    performance.mark(("stopwatch:mark_" + (this.name) + "_start"));
  }
  return this;
};
Timing.prototype.stop = function stop () {
  if (this.startTime === -1) { throw new Error('Start time is missing.'); }
  var mark = "stopwatch:mark_" + (this.name) + "_";
  this.duration = Timing.now() - this.startTime;
  /* istanbul ignore else */
  if (
    SUPPORTS_PERF_MARK &&
    performance.getEntriesByName((mark + "start")).length > 0
  ) {
    performance.mark((mark + "stop"));
    performance.measure(
      ("stopwatch:measure_" + (this.name)),
      (mark + "start"),
      (mark + "stop")
    );
  }
  return this;
};
Timing.prototype.clear = function clear () {
  performance.clearMarks(("stopwatch:mark_" + (this.name) + "_start"));
  performance.clearMarks(("stopwatch:mark_" + (this.name) + "_stop"));
  performance.clearMeasures(("stopwatch:measure_" + (this.name)));
  return this;
};
Timing.prototype.send = function send () {
  if (!this.category) { throw new Error('Category is missing.'); }
  /* istanbul ignore else */
  if (window.ga && this.duration >= 0) {
    window.ga(
      'send',
      'timing',
      this.category,
      this.name,
      Math.round(this.duration)
    );
  }
  return this;
};

var StopWatch = function StopWatch() {
  this._timings = [];
};
StopWatch.find = function find (timings, name) {
  return (
    timings.find(function (timing) {
      return timing.name === name;
    }) || null
  );
};
StopWatch.clear = function clear (timings, timing) {
  for (var i = 0; i < timings.length; i++) {
    /* istanbul ignore else */
    if (timings[i].name === timing.name) {
      timings.splice(i, 1);
      break;
    }
  }
};
StopWatch.send = function send (timings) {
  timings.forEach(function (timing) { return timing.send(); });
};
StopWatch.prototype.create = function create (name, options) {
  if (typeof name !== 'string') { throw new Error('Parameter is missing.'); }
  var timing = new Timing(name);
  if (options && options.category) { timing.category = options.category; }
  this._timings.push(timing);
  return timing;
};
StopWatch.prototype.get = function get (name) {
  var timings = this._timings;
  if (typeof name === 'string') {
    return StopWatch.find(timings, name);
  } else {
    return this._timings;
  }
};
StopWatch.prototype.clear = function clear (name) {
  var timings = this._timings;
  if (typeof name === 'string') {
    var timing = StopWatch.find(timings, name);
    timing.clear();
    StopWatch.clear(timings, timing);
  } else {
    timings.forEach(function (timing) { return timing.clear(); });
    timings.length = 0;
  }
  return this;
};
StopWatch.prototype.send = function send (name) {
  var timings = this._timings;
  if (typeof name === 'string') {
    var timing = StopWatch.find(timings, name);
    if (!timing) { throw new Error('Timing is missing.'); }
    timing.send();
  } else {
    StopWatch.send(timings);
  }
  return this;
};
var StopWatch$1 = new StopWatch();

return StopWatch$1;

})));
