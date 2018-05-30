//import json from 'rollup-plugin-json';
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/index.js",
  output: {
    file: "build/bundle.js",
    format: "cjs"
  },
  external: ["react", "styled-components"],
  plugins: [
    resolve({
      jsnext: true,
      main: true
    }),
    babel({
      exclude: "node_modules/**" // only transpile our source code
    }),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: "src/**", // Default: undefined
      exclude: ["node_modules/**"], // Default: undefined
      // these values can also be regular expressions
      // include: /node_modules/

      // search for files other than .js files (must already
      // be transpiled by a previous plugin!)
      extensions: [".js"], // Default: [ '.js' ]

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false // Default: false

      // explicitly specify unresolvable named exports
      // (see below for more details)
      //            namedExports: { './src/index.js': ['foo', 'bar' ] },  // Default: undefined

      // sometimes you have to leave require statements
      // unconverted. Pass an array containing the IDs
      // or a `id => boolean` function. Only use this
      // option if you know what you're doing!
      //            ignore: [ 'conditional-runtime-dependency' ]
    })
  ]
};
