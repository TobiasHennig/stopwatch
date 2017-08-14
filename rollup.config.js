import babel from 'rollup-plugin-babel';

export default {
  dest: 'dist/StopWatch.js',
  entry: 'src/StopWatch.js',
  format: 'umd',
  moduleName: 'StopWatch',
  plugins: [babel()]
};
