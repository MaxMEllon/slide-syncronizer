# init
> Initialize for development.
> Actually, resolve dependencies as node modules.

    type yarn && true || npm i -g yarn
    yarn

# dev
> Start to develop by webpack-server.

    $(npm bin)/saku _ready
    NODE_ENV=development $(npm bin)/webpack-dev-server --watch --progress

# prod
    $(npm bin)/saku build
    $(npm bin)/pm2 start app.json --env production -i 4

# dev-remote
> Start to develop by webpack-server (for vagrant).

    $(npm bin)/saku _ready
    NODE_ENV=development $(npm bin)/webpack-dev-server --watch --progress --host 0.0.0.0

# build
> Build the distribution files by webpack.

    $(npm bin)/saku _ready
    NODE_ENV=production $(npm bin)/webpack --progress -p

# fmt
> Auto format sources by prettier.

    $(npm bin)/prettier --write src/**/*.js

# lint
> linting sources by eslint.

    $(npm bin)/eslint --fix --format compact src/**/*.js

# check
> checking .eslintrc

    $(npm bin)/eslint --print-config .eslintrc | $(npm bin)/eslint-config-prettier-check

# analyse
> analysis bundled file.

    NODE_ENV=production $(npm bin)/webpack -p --profile --json > stats.json
    $(npm bin)/webpack-bundle-analyzer stats.json

# _ready
> Deploy popular modules to dist directory for webpack.externals.
> Popular libraries has not import as ESmodule.
> Because, I want to improve building speed of webpack.

    rm -rf dist
    mkdir -p dist/fonts
    cp ./manifest.json dist
    cp ./node_modules/reset.css/reset.css                       dist
    cp ./node_modules/animate.css/animate.min.css               dist
    cp ./node_modules/react/umd/react.development.js            dist
    cp ./node_modules/react/umd/react.production.min.js         dist
    cp ./node_modules/react-dom/umd/react-dom.development.js    dist
    cp ./node_modules/react-dom/umd/react-dom.production.min.js dist
    cp ./node_modules/bluebird/js/browser/bluebird.js           dist
    cp ./node_modules/bluebird/js/browser/bluebird.min.js       dist
    cp ./node_modules/lodash/lodash.min.js                      dist
