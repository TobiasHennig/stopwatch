import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import uglify from 'rollup-plugin-uglify';

export default [{
  dest: 'dist/StopWatch.js',
  entry: 'src/StopWatch.js',
  format: 'umd',
  moduleName: 'StopWatch',
  plugins: [babel()]
}, {
  dest: 'dist/StopWatch.min.js',
  entry: 'src/StopWatch.js',
  format: 'umd',
  moduleName: 'StopWatch',
  plugins: [babel(), uglify(), filesize()]
}];
