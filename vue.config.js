var webpack = require("webpack");

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  devServer: {
    disableHostCheck: true,
  },
  configureWebpack: {
    devtool: "source-map",
    module: {
      rules: [
        {
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        Vue: ["vue/dist/vue.esm.js", "default"],
      }),
    ],
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].chunksSortMode = "none";
      return args;
    });
  },
  pwa: {
    manifestOptions: {
      name: "Simple Login App",
      short_name: "SLA",
      start_url: "./",
      display: "standalone",
      theme_color: "#007bff",
    },
    iconPaths: {
      maskicon: "favicon.ico",
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      msTileImage: "favicon.ico",
    },
    name: "Simple Login App",
    themeColor: "#007bff",
    msTileColor: "#e4e5e6",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "GenerateSW",
  }
};
