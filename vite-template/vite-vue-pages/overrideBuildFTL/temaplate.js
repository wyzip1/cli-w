"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = buildFtlFilePlugin;
exports.publicPath = void 0;

var _path = _interopRequireDefault(require("path"));

var _utils = require("./utils.js");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function toPublicPath(filename) {
  return `https://file.yzcdn.cn/mall-cloud/${(0,
  _utils.getAppName)()}/${filename}`;
}

function buildFtlFilePlugin(config) {
  return {
    name: "vite:buildFtl",

    async writeBundle(options, bundle) {
      const toScriptTag = (chunk, isAsync) => ({
        tag: "script",
        attrs: {
          ...(isAsync
            ? {
                async: true,
              }
            : {}),
          type: "module",
          crossorigin: true,
          src: toPublicPath(chunk.fileName),
        },
      });

      const toPreloadTag = chunk => ({
        tag: "link",
        attrs: {
          rel: "modulepreload",
          href: toPublicPath(chunk),
        },
      });

      const toCsslinkTag = chunk => ({
        tag: "link",
        attrs: {
          rel: "stylesheet",
          href: toPublicPath(chunk),
        },
      });

      const filePath = config.templatePath;

      if (!filePath) {
        throw new Error("请配置templatePath");
      }

      const manifest = bundle["manifest.json"];

      if (!manifest) {
        throw new Error("请配置manifest");
      }

      const manifestJson = JSON.parse(manifest.source);
      let hasEntry = false;
      Object.values(manifestJson).forEach(value => {
        if (value.isEntry) {
          hasEntry = true; //入口文件

          const jsFilePath = value.file;
          const jsChunk = bundle[jsFilePath];

          if (typeof filePath === "object") {
            const file = filePath[jsChunk.name];

            if (!file) {
              throw new Error("templatePath配置信息没和Rollup中input对应");
            }

            let result = _fs.default.readFileSync(file, {
              encoding: "utf-8",
            });

            let assetTags = [
              toScriptTag(jsChunk),
              ...(0, _utils.addJsImportFile)(bundle, jsFilePath).map(item =>
                toPreloadTag(item)
              ),
              ...(value.css ?? []).map(css => toCsslinkTag(css)),
            ];
            result = (0, _utils.injectToHead)(result, assetTags);

            _fs.default.writeFileSync(
              _path.default.join(config.ftlDir ?? "./", `${jsChunk.name}.ftl`),
              result
            );
          } else {
            //配置的是一个string
            let result = _fs.default.readFileSync(filePath, {
              encoding: "utf-8",
            });

            let assetTags = [
              toScriptTag(jsChunk),
              ...(0, _utils.addJsImportFile)(bundle, jsFilePath).map(item =>
                toPreloadTag(item)
              ),
              ...(value.css ?? []).map(css => toCsslinkTag(css)),
              ...(value.imports ?? [])
                .map(file => manifestJson[file].css ?? [])
                .flat(Infinity)
                .map(css => toCsslinkTag(css)),
            ];
            result = (0, _utils.injectToHead)(result, assetTags);

            _fs.default.writeFileSync(
              _path.default.join(config.ftlDir ?? "./", `${jsChunk.name}.ftl`),
              result
            );
          }
        }
      });

      if (!hasEntry) {
        throw new Error("请检查多页是不是配置错误！！");
      }

      const fileList = Object.keys(bundle);
      (0, _utils.uploadCdn)(fileList, options.dir);
    },

    apply: "build",
  };
}

const publicPath = `https://file.yzcdn.cn/mall-cloud/${(0,
_utils.getAppName)()}/`;
exports.publicPath = publicPath;
