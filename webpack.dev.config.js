const path = require("path");

module.exports = {
    entry: "./src/index",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "zq-react-ui-pack.js"
    },
    module: {
        rules: [{ test: /\.js$/, use: "babel-core" }]
    }
};
