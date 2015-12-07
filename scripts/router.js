define([
    'backbone'
], function (Backbone) {
    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            ':category/:set': 'set',
            ':category/:set/:question': 'question',
        }
    })

    return Router
})
