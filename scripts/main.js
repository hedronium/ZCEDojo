require.config({
    urlArgs: 'x=xx',
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'yaml': {
            exports: 'yaml'
        },
        'marked': {
            exports: 'marked'
        }
    },
    paths: {
        jquery: '../components/jquery/dist/jquery.min',
        backbone: '../components/backbone/backbone-min',
        underscore: '../components/underscore/underscore-min',
        handlebars: '../components/handlebars/handlebars.min',
        yaml: '../components/yaml-js/yaml',
        marked: '../components/marked/lib/marked'
    }
});

define('singleton', function () {
    return {}
})

require([
    'router',
    'app'
], function (Router, App) {
    var router = new Router()

    var app = new App({
        router: router
    })

    Backbone.history.start()
})
