import buble from 'rollup-plugin-buble';
import filesize from 'rollup-plugin-filesize';
import license from 'rollup-plugin-license';
import { uglify } from 'rollup-plugin-uglify';

export default [
  {
    input: 'src/StopWatch.js',
    output: {
      file: 'dist/StopWatch.js',
      format: 'umd',
      name: 'StopWatch'
    },
    plugins: [
      buble(),
      license({
        banner: `/*! StopWatch v<%= pkg.version %> | (c) Tobias Hennig | License MIT */`
      })
    ]
  },
  {
    input: 'src/StopWatch.js',
    output: {
      file: 'dist/StopWatch.min.js',
      format: 'umd',
      name: 'StopWatch'
    },
    plugins: [
      buble(),
      uglify(),
      license({
        banner: `/*! StopWatch v<%= pkg.version %> | (c) Tobias Hennig | License MIT */`
      }),
      filesize()
    ]
  }
];
