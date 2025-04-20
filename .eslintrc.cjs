module.exports = {
  settings: {
    "import/resolver": {
      "custom-alias": {
        alias: {
          "#miao": "./components/index.js",
          "#miao.models": "./models/index.js",
          "#miao.path": "./tools/path.js"
        },
        extensions: [ ".js" ]
      }
    }
  }
}
