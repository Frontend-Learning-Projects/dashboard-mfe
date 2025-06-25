const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "emumba",
    projectName: "dashboard-mfe",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    resolve: {
      ...defaultConfig.resolve,
      fullySpecified: false,
      extensions: [
        ...(defaultConfig.resolve && defaultConfig.resolve.extensions
          ? defaultConfig.resolve.extensions
          : []),
        ".js",
        ".mjs",
      ],
      alias: {
        ...(defaultConfig.resolve && defaultConfig.resolve.alias
          ? defaultConfig.resolve.alias
          : {}),
      },
    },
    module: {
      ...defaultConfig.module,
      rules: [
        ...(defaultConfig.module && defaultConfig.module.rules
          ? defaultConfig.module.rules
          : []),
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
  });
};
