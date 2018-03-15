import StopWatch from '../src/StopWatch';

describe('StopWatch', () => {
  window.ga = function() {};

  beforeEach(() => {
    StopWatch._timings = [];
  });

  it('should exits', () => {
    expect(StopWatch).toBeDefined();
  });

  describe('#create', () => {
    it('should exists', () => {
      expect(StopWatch.create).toBeDefined();
    });
    it('should throw an error if "name" is missing', () => {
      var fn = function() {
        StopWatch.create();
      };
      expect(fn).toThrowError('Parameter is missing.');
    });
    it('should return a timing', () => {
      let t = StopWatch.create('name');
      expect(t.constructor.name).toEqual('Timing');
      expect(t.name).toEqual('name');
    });
    it('should be able to set category via options', () => {
      let t = StopWatch.create('name', {
        category: 'category'
      });
      expect(t.category).toEqual('category');
    });
  });

  describe('#get', () => {
    it('should exists', () => {
      expect(StopWatch.get).toBeDefined();
    });
    it('should return all timings', () => {
      let timings = StopWatch.get();
      expect(timings).toEqual([]);
    });
    it('should return `null` if a specific timing is missing', () => {
      let missing = StopWatch.get('name');
      expect(missing).toBeNull();
    });
    it('should return a specific timing', () => {
      StopWatch.create('name');
      let timing = StopWatch.get('name');
      expect(timing.constructor.name).toEqual('Timing');
    });
  });

  describe('#clear', () => {
    it('should exists', () => {
      expect(StopWatch.clear).toBeDefined();
    });
    it('should clear all timings', () => {
      StopWatch.create('name');
      StopWatch.create('anotherName');
      StopWatch.clear();
      expect(StopWatch._timings).toEqual([]);
    });
    it('should clear all performance marks', () => {
      StopWatch.create('name')
        .start()
        .stop();
      StopWatch.create('anotherName')
        .start()
        .stop();
      StopWatch.clear();
      expect(performance.getEntriesByType('mark').length).toEqual(0);
      expect(performance.getEntriesByType('measure').length).toEqual(0);
    });
    it('should clear a specific timing', () => {
      StopWatch.create('name');
      StopWatch.create('anotherName');
      StopWatch.clear('name');
      expect(StopWatch._timings.length).toEqual(1);
    });
    it('should clear a specific performance marks', () => {
      StopWatch.create('name')
        .start()
        .stop();
      StopWatch.create('anotherName')
        .start()
        .stop();
      StopWatch.clear('name');
      expect(performance.getEntriesByType('mark').length).toEqual(2);
      expect(performance.getEntriesByType('measure').length).toEqual(1);
    });
  });

  describe('#send', () => {
    it('should exists', () => {
      expect(StopWatch.send).toBeDefined();
    });
    it('should send all timings', () => {
      spyOn(window, 'ga');
      let t1 = StopWatch.create('name', { category: 'category' });
      let t2 = StopWatch.create('anotherName', { category: 'category' });
      t1.duration = 1;
      t2.duration = 1;
      StopWatch.send();
      expect(window.ga).toHaveBeenCalledTimes(2);
    });
    it('should throw an error if a specific timing is missing', () => {
      var fn = function() {
        StopWatch.send('name');
      };
      expect(fn).toThrowError('Timing is missing.');
    });
    it('should send a specific timing', () => {
      spyOn(window, 'ga');
      let t1 = StopWatch.create('name', { category: 'category' });
      let t2 = StopWatch.create('anotherName', { category: 'category' });
      t1.duration = 1;
      t2.duration = 1;
      StopWatch.send('anotherName');
      expect(window.ga).toHaveBeenCalledTimes(1);
    });
  });
});
