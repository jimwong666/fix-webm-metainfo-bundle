//@ts-check
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
// import nodePolyfills from 'rollup-plugin-node-polyfills';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const packageJson = require('./package.json')

const umdName = 'fixWebmMetainfo' || packageJson.name

const globals = {
  ...packageJson.devDependencies,
}

const dir = 'dist'

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  {
    input: 'src/index.ts',
    // ignore lib
    external: [...Object.keys(globals)],

    output: [
      {
        file: dir + '/index.umd.js',
        format: 'umd',
        sourcemap: true,
        name: umdName,
      },
      {
        file: dir + '/index.umd.min.js',
        format: 'umd',
        sourcemap: true,
        name: umdName,
        plugins: [terser()],
      },
      // {
      //   file: dir + '/index.cjs.js',
      //   format: 'cjs',
      //   sourcemap: true,
      // },
      // {
      //   file: dir + '/index.cjs.min.js',
      //   format: 'cjs',
      //   sourcemap: true,
      //   plugins: [terser()],
      // },
      // {
      //   file: dir + '/index.esm.js',
      //   format: 'es',
      //   sourcemap: true,
      // },
      // {
      //   file: dir + '/index.esm.min.js',
      //   format: 'es',
      //   sourcemap: true,
      //   plugins: [terser()],
      // },
    ],
    plugins: [
		json(),
		peerDepsExternal(),
		typescript({ tsconfig: './tsconfig.json'}),
		commonjs({ include: 'node_modules/**' }),
	  nodePolyfills(),
      nodeResolve(),
      // @ts-ignore
    ],

    treeshake: true,
  },
]

export default config