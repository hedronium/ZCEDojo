define([
    'singleton',
    'backbone',
    'template',
    'collections/categories',
    'views/category'
], function (App, Backbone, Template, CategoriesCollection, CategoryView) {
    var HomeView = Backbone.View.extend({
        tagName: 'section',
        className: 'contianer home',
        id: 'home',
        container: null,
        categories: null,
        initialize: function (opts) {
            this.container = opts.container
            App.categories.load(this.categories_loaded, this)
        },
        categories_loaded: function (categories) {
            this.$el.find('.loading').remove()
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            var el = this.$el.children('.categories')

            if (categories.length !== 0) {
                this.$el.find('.empty-notice').remove()
            }

            for (var i in categories.models) {
                var category_view = new CategoryView({
                    model: categories.models[i],
                    container: el
                })

                category_view.render()
                category_view.load_sets()
            }
        },
        render: function () {
            this.$el.append(Template('home'))
            this.container.append(this.$el)
        }
    })

    return HomeView
})
