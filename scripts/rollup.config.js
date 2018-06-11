import json from "rollup-plugin-json";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import clear from "rollup-plugin-clear";
import license from "rollup-plugin-license";
import eslint from "rollup-plugin-eslint";

export default {
  input: "src/index.js",
  output: {
    file: "build/zq-react-ui-pack.js",
    format: "cjs"
  },
  external: [
    "react",
    "react-dom",
    "styled-components",
    "mobx",
    "react-spring",
    "prop-types",
    "styled-tools",
    "polished",
    "react-popper"
  ],
  plugins: [
    clear({
      targets: ["./build"]
    }),
    json(),
    eslint({
      throwOnError: true
      //      throwOnWarning: true
    }),
    resolve({
      jsnext: true,
      main: true
    }),
    babel({
      exclude: "node_modules/**"
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
    }),
    license({
      banner: `/** zq-react-ui-pack - Copyright (c) 2017 Qing  Zhang - MIT Licensed */`
    }),
    filesize({
      showGzippedSize: true
    })
  ]
};
