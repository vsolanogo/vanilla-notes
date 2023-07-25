module.exports = function (api) {
    api.cache(true)
    const presets = [
      [
        "@babel/preset-env",
        {
          debug: true,
          corejs: { version: 3 },
          useBuiltIns: "usage",
          targets: ["> 1%"],
        },
      ],
    ]
    const plugins = [
      ["@babel/plugin-transform-arrow-functions"],
      ["@babel/plugin-transform-runtime"],
      ["add-module-exports"],
      ["polyfill-corejs3", { method: "usage-global" }],
    ]
    return {
      presets,
      plugins,
    }
  }
  