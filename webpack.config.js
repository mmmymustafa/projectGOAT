var path = require('path');

module.exports = {
    entry: path.join(__dirname, "./src/entry.js"),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    }
};