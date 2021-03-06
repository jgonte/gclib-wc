import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [{
  input: 'lib/src/index.js',
  output: {
    file: 'bundle.js',
    format: 'esm'
  },
  context: 'window',
  plugins: [
    commonjs(),
    resolve()
  ]
}];