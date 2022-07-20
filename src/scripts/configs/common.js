const { appPath, modBackgroundEntryPath, modContentEntryPath, modPageEntryPath, modSrcPath, appSrcPath, appBackgroundEntryPaths, appContentEntryPaths, appPageEntryPaths } = require('../paths');
const { getManifestContent } = require('../manifest');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports.getCommonConfig = function () {
  const manifest = getManifestContent();
  return {
    context: appPath,
    entry: {
      './background': modBackgroundEntryPath,
      './content': modContentEntryPath,
      './page': modPageEntryPath,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: [modSrcPath],
          loader: 'ts-loader',
        },
        {
          test: /\.tsx?$/,
          include: [appSrcPath],
          loader: 'ts-loader',
          options: {
            context: appPath,
          },
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: "style-loader",
              options: {
                injectType: "singletonStyleTag",
                insert: function insertAtTop(element) {
                  document.getElementById('vfe-style')?.remove();
                  element.id = 'vfe-style';
                  const parent = document.querySelector("head");
                  parent.insertBefore(element, parent.firstChild);
                },
              }
            },
            {
              loader: "css-loader",
              options: {
                exportType: 'array',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        'app-background': appBackgroundEntryPaths,
        'app-content': appContentEntryPaths,
        'app-page': appPageEntryPaths,
      },
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: "public",
            to: ".",
            noErrorOnMissing: true,
            transform(content, absoluteFrom) {
              if (absoluteFrom.endsWith('manifest.json')) return JSON.stringify(manifest, null, '\t');
              return content;
            },
          },
        ],
      }),
      new DefinePlugin({
        URL_MATCHES: JSON.stringify(manifest?.content_scripts?.flatMap(x => x.matches) || []),
      }),
    ]
  };
}
