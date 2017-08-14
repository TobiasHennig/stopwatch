(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.StopWatch = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var SUPPORTS_PERF_MARK = !!(performance && performance.mark);

var Timing = function () {
  function Timing(name) {
    classCallCheck(this, Timing);

    this.name = name;
    this.category;
    this.duration = -1;
    this.startTime = 0;
  }

  createClass(Timing, [{
    key: 'start',
    value: function start() {
      this.startTime = this.constructor.now();
      /* istanbul ignore else */
      if (SUPPORTS_PERF_MARK) {
        performance.mark('stopwatch:mark_' + this.name + '_start');
      }
      return this;
    }
  }, {
    key: 'stop',
    value: function stop() {
      var mark = 'stopwatch:mark_' + this.name + '_';
      this.duration = this.constructor.now() - this.startTime;
      /* istanbul ignore else */
      if (SUPPORTS_PERF_MARK && performance.getEntriesByName(mark + 'start').length > 0) {
        performance.mark(mark + 'stop');
        performance.measure('stopwatch:measure_' + this.name, mark + 'start', mark + 'stop');
      }
      return this;
    }
  }, {
    key: 'clear',
    value: function clear() {
      performance.clearMarks('stopwatch:mark_' + this.name + '_start');
      performance.clearMarks('stopwatch:mark_' + this.name + '_stop');
      performance.clearMeasures('stopwatch:measure_' + this.name);
      return this;
    }
  }, {
    key: 'send',
    value: function send() {
      if (!this.category) throw new Error('Category is missing.');
      /* istanbul ignore else */
      if (window.ga && this.duration >= 0) {
        window.ga('send', 'timing', this.category, this.name, Math.round(this.duration));
      }
      return this;
    }
  }], [{
    key: 'now',
    value: function now() {
      return performance.now();
    }
  }]);
  return Timing;
}();

var StopWatch = function () {
  function StopWatch() {
    classCallCheck(this, StopWatch);

    this._timings = [];
  }

  createClass(StopWatch, [{
    key: 'create',
    value: function create(name, options) {
      if (typeof name !== 'string') throw new Error('Parameter is missing.');
      var timing = new Timing(name);
      if (options && options.category) timing.category = options.category;
      this._timings.push(timing);
      return timing;
    }
  }, {
    key: 'get',
    value: function get$$1(name) {
      var timings = this._timings;
      if (typeof name === 'string') {
        var timing = this.constructor.find(timings, name);
        if (!timing) throw new Error('Timing is missing.');
        return timing;
      } else {
        return this._timings;
      }
    }
  }, {
    key: 'clear',
    value: function clear(name) {
      var timings = this._timings;
      if (typeof name === 'string') {
        var timing = this.constructor.find(timings, name);
        timing.clear();
        this.constructor.clear(timings, timing);
      } else {
        timings.forEach(function (timing) {
          return timing.clear();
        });
        timings.length = 0;
      }
      return this;
    }
  }, {
    key: 'send',
    value: function send(name) {
      var timings = this._timings;
      if (typeof name === 'string') {
        var timing = this.constructor.find(timings, name);
        if (!timing) throw new Error('Timing is missing.');
        timing.send();
      } else {
        this.constructor.send(timings);
      }
      return this;
    }
  }], [{
    key: 'find',
    value: function find(timings, name) {
      return timings.find(function (timing) {
        return timing.name === name;
      });
    }
  }, {
    key: 'clear',
    value: function clear(timings, timing) {
      for (var i = 0; i < timings.length; i++) {
        /* istanbul ignore else */
        if (timings[i].name === timing.name) {
          timings.splice(i, 1);
          break;
        }
      }
    }
  }, {
    key: 'send',
    value: function send(timings) {
      timings.forEach(function (timing) {
        return timing.send();
      });
    }
  }]);
  return StopWatch;
}();

var StopWatch$1 = new StopWatch();

return StopWatch$1;

})));
