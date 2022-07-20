const { appPath, modBackgroundEntryPath, modContentEntryPath, modPageEntryPath, modSrcPath, appSrcPath, appBackgroundEntryPaths, appContentEntryPaths, appPageEntryPaths } = require('../utils/paths');
const { getManifestContent } = require('../utils/manifest');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports.getCommonConfig = function () {
  const initialManifest = getManifestContent();
  return {
    // Run webpack on the app context
    context: appPath,

    // Generate javascript files for each script type
    entry: {
      './background': modBackgroundEntryPath,
      './content': modContentEntryPath,
      './page': modPageEntryPath,
    },

    module: {
      rules: [
        // Process framework typescript files with the local tsconfig
        {
          test: /\.tsx?$/,
          include: [modSrcPath],
          loader: 'ts-loader',
        },

        // Process app typescript files with the app tsconfig
        {
          test: /\.tsx?$/,
          include: [appSrcPath],
          loader: 'ts-loader',
          options: {
            context: appPath,
          },
        },

        // Loader for injecting css styles on the page
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
      // Copy all public dir to build every compilation
      // Manifest.json is transformed
      new CopyPlugin({
        patterns: [
          {
            from: "public",
            to: ".",
            noErrorOnMissing: true,
            transform(content, absoluteFrom) {
              if (absoluteFrom.endsWith('manifest.json')) return JSON.stringify(getManifestContent(), null, '\t');
              return content;
            },
          },
        ],
      }),
      new DefinePlugin({
        URL_MATCHES: JSON.stringify(initialManifest?.content_scripts?.flatMap(x => x.matches) || []),
      }),
    ]
  };
}
