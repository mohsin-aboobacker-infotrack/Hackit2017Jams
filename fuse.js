const { FuseBox, WebIndexPlugin, PostCSSPlugin, SassPlugin, CSSPlugin } = require('fuse-box');
const autoprefixer = require('autoprefixer');
var homeDir = 'InfoTrack.iSupport.FrontEnd';
var outputDir = './InfoTrack.iSupportMvc/wwwroot/dist';

var fuse = FuseBox.init({
  output: `${outputDir}/$name.js`,
  plugins: [[
    /\.s?css$/,
    SassPlugin({ importer: true, $styles: `${homeDir}/styles` }),
    PostCSSPlugin([autoprefixer()]),
    CSSPlugin({
      outFile: file => `${outputFolder}/dist/${file.split('/').pop()}`,
      minify: true
    })
  ]],
  sourceMaps: true,
  target: 'browser'
});

var vendorBundle = fuse.bundle('vendor').instructions(`~ ${homeDir}/vendor.ts +~ ${homeDir}/**/*.{ts,tsx}`);
var bundle = fuse.bundle('index').instructions(`!> [${homeDir}/index.tsx]`);

bundle.watch().hmr();

fuse.dev({
  port: 4444
});
fuse.run();
