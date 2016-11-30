cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "com.rensanning.cordova.helloworld.helloworld",
        "file": "plugins/com.rensanning.cordova.helloworld/www/hello_world.js",
        "pluginId": "com.rensanning.cordova.helloworld",
        "clobbers": [
            "HelloWorld"
        ]
    },
    {
        "id": "com.rensanning.cordova.carrier.carrier",
        "file": "plugins/com.rensanning.cordova.carrier/www/carrier.js",
        "pluginId": "com.rensanning.cordova.carrier",
        "clobbers": [
            "Carrier"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.0",
    "com.rensanning.cordova.helloworld": "0.0.1",
    "com.rensanning.cordova.carrier": "0.0.1"
};
// BOTTOM OF METADATA
});