const {rewireWorkboxInject, defaultInjectConfig} = require('react-app-rewire-workbox');
const path = require('path');
module.exports = function override(config, env) {
        const workboxConfig = {
            ...defaultInjectConfig,
            swSrc: path.join(__dirname,'src','customServiceWorker.js')
        };

        config = rewireWorkboxInject(workboxConfig)(config, env);

        return config;
    }
