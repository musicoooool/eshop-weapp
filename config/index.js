const path = require("path");

// NOTE 在 sass 中通过别名（@ 或 ~）引用需要指定路径
const sassImporter = function(url) {
  if (url[0] === "~" && url[1] !== "/") {
    return {
      file: path.resolve(__dirname, "..", "node_modules", url.substr(1))
    };
  }

  const reg = /^@\/styles\/(.*)/;
  return {
    file: reg.test(url)
      ? path.resolve(__dirname, "..", "src/styles", url.match(reg)[1])
      : url
  };
};

const config = {
  projectName: "eshop-weapp",
  date: "2019-10-17",
  alias: {
    "@/components": path.resolve(__dirname, "..", "src/components"),
    "@/utils": path.resolve(__dirname, "..", "src/utils"),
    "@/models": path.resolve(__dirname, "..", "src/models"),
    "@/services": path.resolve(__dirname, "..", "src/services"),
    "@/pages": path.resolve(__dirname, "..", "src/pages"),
    "@/styles": path.resolve(__dirname, "..", "src/styles")
  },
  designWidth: 750,
  deviceRatio: {
    "640": 2.34 / 2,
    "750": 1,
    "828": 1.81 / 2
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        [
          "env",
          {
            modules: false
          }
        ]
      ],
      plugins: [
        "transform-decorators-legacy",
        "transform-class-properties",
        "transform-object-rest-spread"
      ]
    },
    sass: {
      importer: sassImporter
    }
  },
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ["last 3 versions", "Android >= 4.1", "ios >= 8"]
          }
        },
        pxtransform: {
          enable: true,
          config: {}
        },
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]"
          }
        }
      }
    }
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    output: {
      filename: "js/[name].[hash].js",
      chunkFilename: "js/[name].[chunkhash].js"
    },
    imageUrlLoaderOption: {
      limit: 5000,
      name: "static/images/[name].[hash].[ext]"
    },
    miniCssExtractPluginOption: {
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[name].[chunkhash].css"
    },

    esnextModules: ["taro-ui"],
    devServer: {
      host: "localhost", // 如需局域网（如手机）访问，请更换为0.0.0.0
      // host: '0.0.0.0', // 如需局域网（如手机）访问，请更换为0.0.0.0
      port: 8000,
      https: false
    },
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ["last 3 versions", "Android >= 4.1", "ios >= 8"]
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]"
          }
        }
      }
    },
    sassLoaderOption: {
      importer: sassImporter
    }
  }
};

module.exports = function(merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
