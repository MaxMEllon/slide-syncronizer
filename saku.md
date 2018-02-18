# ready

    rm -rf dist
    mkdir -p dist
    cp ./node_modules/react/umd/react.development.js dist
    cp ./node_modules/react/umd/react.production.min.js dist
    cp ./node_modules/react-dom/umd/react-dom.development.js dist
    cp ./node_modules/react-dom/umd/react-dom.production.min.js dist
    cp ./node_modules/bluebird/js/browser/bluebird.js dist
    cp ./node_modules/bluebird/js/browser/bluebird.min.js dist
    cp ./node_modules/lodash/lodash.min.js dist

# dev
> Start to develop by webpack-server.

    $(npm bin)/saku ready
    NODE_ENV=development $(npm bin)/webpack-dev-server --watch --progress

# build
> Build the distribution files by webpack.

    $(npm bin)/saku ready
    NODE_ENV=production $(npm bin)/webpack --progress -p

# fmt
> Auto format sources by prettier

    $(npm bin)/prettier --write src/**/*.js
