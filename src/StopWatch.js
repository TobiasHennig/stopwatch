import Timing from './Timing';

class StopWatch {
  constructor() {
    this._timings = [];
  }
  static find(timings, name) {
    return (
      timings.find(timing => {
        return timing.name === name;
      }) || null
    );
  }
  static clear(timings, timing) {
    for (let i = 0; i < timings.length; i++) {
      /* istanbul ignore else */
      if (timings[i].name === timing.name) {
        timings.splice(i, 1);
        break;
      }
    }
  }
  static send(timings) {
    timings.forEach(timing => timing.send());
  }
  create(name, options) {
    if (typeof name !== 'string') throw new Error('Parameter is missing.');
    let timing = new Timing(name);
    if (options && options.category) timing.category = options.category;
    this._timings.push(timing);
    return timing;
  }
  get(name) {
    let timings = this._timings;
    if (typeof name === 'string') {
      return this.constructor.find(timings, name);
    } else {
      return this._timings;
    }
  }
  clear(name) {
    let timings = this._timings;
    if (typeof name === 'string') {
      let timing = this.constructor.find(timings, name);
      timing.clear();
      this.constructor.clear(timings, timing);
    } else {
      timings.forEach(timing => timing.clear());
      timings.length = 0;
    }
    return this;
  }
  send(name) {
    let timings = this._timings;
    if (typeof name === 'string') {
      let timing = this.constructor.find(timings, name);
      if (!timing) throw new Error('Timing is missing.');
      timing.send();
    } else {
      this.constructor.send(timings);
    }
    return this;
  }
}
export default new StopWatch();
