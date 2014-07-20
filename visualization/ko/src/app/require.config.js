// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "knockout":             "bower_modules/knockout/dist/knockout",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "text":                 "bower_modules/requirejs-text/text",
        // example of using the js inside a polymer web component
        // kind of convoluted but showcases that what matters most is the
        // plain js that makes the components
        "fetcher":   "bower_modules/wikimetrics-chart/js/fetcher",
        "typeahead": "bower_modules/typeahead.js/dist/typeahead.bundle"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] }
    }
};
