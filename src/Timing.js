const SUPPORTS_PERF_MARK = !!(performance && performance.mark);

export default class Timing {
  constructor(name) {
    this.name = name;
    this.category;
    this.duration = -1;
    this.startTime = 0;
  }
  static now() {
    return performance.now();
  }
  start() {
    this.startTime = this.constructor.now();
    /* istanbul ignore else */
    if (SUPPORTS_PERF_MARK) {
      performance.mark(`stopwatch:mark_${this.name}_start`);
    }
    return this;
  }
  stop() {
    let mark = `stopwatch:mark_${this.name}_`;
    this.duration = this.constructor.now() - this.startTime;
    /* istanbul ignore else */
    if (
      SUPPORTS_PERF_MARK &&
      performance.getEntriesByName(`${mark}start`).length > 0
    ) {
      performance.mark(`${mark}stop`);
      performance.measure(
        `stopwatch:measure_${this.name}`,
        `${mark}start`,
        `${mark}stop`
      );
    }
    return this;
  }
  clear() {
    performance.clearMarks(`stopwatch:mark_${this.name}_start`);
    performance.clearMarks(`stopwatch:mark_${this.name}_stop`);
    performance.clearMeasures(`stopwatch:measure_${this.name}`);
    return this;
  }
  send() {
    if (!this.category) throw new Error('Category is missing.');
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
  }
}
