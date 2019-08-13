module.exports = function (api) {
  const presets = [
    ["@babel/preset-react"],
    [
      "@babel/preset-env", {
        "useBuiltIns": "usage",
        "corejs": 3,
        "targets": {
          "browsers": [
            "last 2 chrome versions",
            "last 2 firefox versions",
            "last 2 safari versions"
          ]
        }
      }
    ],
  ]
  const plugins = []


  api.cache(true)
  return {
    presets,
    plugins
  }
}
