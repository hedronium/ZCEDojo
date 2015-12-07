define([
    'singleton',
    'backbone',
    'views/home',
    'collections/categories',
    'views/set',
    'models/set'
], function (App, Backbone, HomeView, CategoriesCollection, SetView, SetModel) {
    var AppView = Backbone.View.extend({
        el: 'body',
        views: {},
        initialize: function (opts) {
            this.router = opts.router

            var categories = App.categories = new CategoriesCollection()

            this.views.home = new HomeView({
                container: this.$el
            })

            this.views.home.render()
            this.listen()
        },
        listen: function () {
            this.router.on('route:home', this.home_route, this)
            this.router.on('route:set', this.set_route, this)
        },
        home_route: function () {
            if (typeof this.views.set !== 'undefined') this.views.set.remove()
        },
        set_route: function (category, set) {
            this.set(new SetModel({
                id: set,
                category: category
            }))
        },
        set: function (set) {
            this.home_route()

            var el  = this.$el

            var set_view = this.views.set = new SetView({
                container: el,
                model: set
            })

            set_view.render()
        }
    });

    return AppView
})
