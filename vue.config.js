"use strict";
const path = require("path");
const port = process.env.port || process.env.npm_config_port || 80; // 端口
function resolve(dir) {
  return path.join(__dirname, dir);
}
const name = process.env.VUE_APP_TITLE; // 网页标题
process.env.VUE_APP_BUILD_TIME = Date.now(); 
// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://qutke.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://qutke.com/admin/，则设置 baseUrl 为 /admin/。
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: "dist",
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: "static",
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === "development",
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    disableHostCheck: true,
    host: "0.0.0.0",
    port: port,
    open: true,
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_HOST,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
      [process.env.VUE_APP_AURH_API]: {
        target: process.env.VUE_APP_AURH_HOST,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_AURH_API]: "",
        },
      },
      [process.env.VUE_APP_UPLOAD_API]: {
        target: process.env.VUE_APP_UPLOAD_HOST,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_UPLOAD_API]: "",
        },
      },
    },
  },
  configureWebpack: {
    name,
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
      },
    },
  },
  chainWebpack(config) {
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test
    config.resolve.symlinks(true); // 修复热更新失效
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
  pwa: {
    name,
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    manifestOptions: {
      background_color: "#335eea",
      icons: [
        {
          src: "https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/128x128.png",

          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/1024x1024.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    themeColor: "#000",
    iconPaths: {
      faviconSVG:
        "https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/16x16.png",
      favicon32:
        "https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/32x32.png",
      favicon16:
        "https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/16x16.png",
      appleTouchIcon:
        "https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/128x128.png",
      maskIcon:
        "https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/128x128.png",
      msTileImage:
        "https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/128x128.png",
    },

    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "src/service-work.js",
      // ...other Workbox options...
    },
  },
  // 添加插件的配置
  pluginOptions: {
    // electron-builder的配置文件
    electronBuilder: {
      // List native deps here if they don't work
      // If you are using Yarn Workspaces, you may have multiple node_modules folders
      // List them all here so that VCP Electron Builder can find them
      nodeModulesPath: ["../../node_modules", "./node_modules"],
      // seting background nodeIntegration
      nodeIntegration: true,
      preload: "src/preload.js",
      externals: ["@revincx/unblockneteasemusic"],
      builderOptions: {
        productName: "ZORGMusic",
        copyright: "Copyright © Z ORG",
        // compression: "maximum", // 机器好的可以打开，配置压缩，开启后会让 .AppImage 格式的客户端启动缓慢
        asar: true,
        publish: [
          {
            provider: "github",
            owner: "tigerzh",
            repo: "NotesMusic",
            vPrefixedTagName: true,
            releaseType: "draft",
          },
        ],
        directories: {
          output: "dist_electron",
        },
        mac: {
          target: [
            {
              target: "dmg",
              arch: ["x64", "arm64", "universal"],
            },
          ],
          artifactName: "${productName}-${os}-${version}-${arch}.${ext}",
          category: "app.zorg.music",
          darkModeSupport: true,
        },
        win: {
          target: [
            {
              target: "portable",
              arch: ["x64"],
            },
            {
              target: "nsis",
              arch: ["x64"],
            },
          ],
          publisherName: "MUSIC",
          icon: "build/icons/icon.ico",
          publish: ["github"],
        },
        linux: {
          target: [
            {
              target: "AppImage",
              arch: ["x64"],
            },
            {
              target: "tar.gz",
              arch: ["x64"],
            },
            {
              target: "deb",
              arch: ["x64", "armv7l"],
            },
            {
              target: "rpm",
              arch: ["x64"],
            },
            {
              target: "snap",
              arch: ["x64"],
            },
            {
              target: "pacman",
              arch: ["x64"],
            },
          ],
          category: "Music",
          icon: "./build/icon.icns",
        },
        dmg: {
          icon: "build/icons/icon.icns",
        },
        nsis: {
          oneClick: true,
          perMachine: true,
          deleteAppDataOnUninstall: true,
        },
      },
      // 主线程的配置文件
      chainWebpackMainProcess: (config) => {
        // 修复HMR
        config.resolve.symlinks(true);
        config.resolve.alias.set("@", path.join(__dirname, "./src"));
        // Chain webpack config for electron main process only
        config.plugin("define").tap((args) => {
          args[0]["IS_ELECTRON"] = true;
          return args;
        });
      },
      // 渲染线程的配置文件
      chainWebpackRendererProcess: (config) => {
        // 修复HMR
        config.resolve.symlinks(true);
        // 渲染线程的一些其他配置
        // Chain webpack config for electron renderer process only
        // The following example will set IS_ELECTRON to true in your app
        config.plugin("define").tap((args) => {
          args[0]["IS_ELECTRON"] = true;
          return args;
        });
      },
      // 主入口文件
      // mainProcessFile: 'src/main.js',
      mainProcessWatch: ["../netease_api/routes.js"],
      // mainProcessArgs: []
    },
  },
};
