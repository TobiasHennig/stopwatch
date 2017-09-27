import Timing from '../src/Timing';

describe('Timing', () => {
  window.ga = function() {};
  let timing;

  beforeEach(() => {
    timing = new Timing('name');
    performance.clearMarks();
    performance.clearMeasures();
  });

  describe('#start', () => {
    it('should exists', () => {
      expect(timing.start).toBeDefined();
    });
    it('should start the timing', () => {
      timing.start();
      expect(timing.startTime).toBeGreaterThan(0);
    });
    it('should create a performance mark if supported', () => {
      timing.start();
      expect(
        performance.getEntriesByName('stopwatch:mark_name_start')[0]
      ).toBeDefined();
    });
  });

  describe('#stop', () => {
    it('should exists', () => {
      expect(timing.stop).toBeDefined();
    });
    it('should throw an error if start time is missing', () => {
      var fn = function() {
        timing.stop();
      };
      expect(fn).toThrowError('Start time is missing.');
    });
    it('should stop the timing', () => {
      timing.start().stop();
      expect(timing.duration).toBeGreaterThan(0);
    });
    it('should create a performance mark if supported', () => {
      timing.start().stop();
      expect(
        performance.getEntriesByName('stopwatch:mark_name_stop')[0]
      ).toBeDefined();
    });
    it('should create a performance measure if supported', () => {
      timing.start().stop();
      expect(
        performance.getEntriesByName('stopwatch:measure_name')[0]
      ).toBeDefined();
    });
  });

  describe('#clear', () => {
    it('should exists', () => {
      expect(timing.clear).toBeDefined();
    });
    it('should clear the performance mark if supported', () => {
      timing
        .start()
        .stop()
        .clear();
      expect(
        performance.getEntriesByName('stopwatch:mark_name_start')[0]
      ).not.toBeDefined();
      expect(
        performance.getEntriesByName('stopwatch:mark_name_stop')[0]
      ).not.toBeDefined();
      expect(
        performance.getEntriesByName('stopwatch:measure_name')[0]
      ).not.toBeDefined();
    });
  });

  describe('#send', () => {
    it('should exists', () => {
      expect(timing.send).toBeDefined();
    });
    it('should throw an error if "category" is missing', () => {
      var fn = function() {
        timing.send();
      };
      expect(fn).toThrowError('Category is missing.');
    });
    it('should send the duration to Google Analytics', done => {
      spyOn(window, 'ga');
      timing.name = 'name';
      timing.category = 'category';
      timing.duration = 1;
      timing.send();
      expect(window.ga).toHaveBeenCalledWith(
        'send',
        'timing',
        'category',
        'name',
        1
      );
      done();
    });
  });
});
