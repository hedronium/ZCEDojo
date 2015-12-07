define([
    'backbone',
    'template',
    'collections/sets',
    'views/set_card'
], function (Backbone, Template, SetsCollecton, SetCardView) {
    var CategoryView = Backbone.View.extend({
        tagName: 'section',
        className: 'category',
        initialize: function (opts) {
            this.model = opts.model
            this.container = opts.container
        },
        load_sets: function () {
            var sets_collection = new SetsCollecton({
                category_id: this.model.get('id')
            })

            sets_collection.fetch()
            sets_collection.on('sync', this.loaded_sets, this)
        },
        loaded_sets: function (sets_collection) {
            this.$el.find('.loading:first-child').remove()

            if (sets_collection.length !== 0) {
                this.$el.find('.empty-notice').remove()
            }
            
            for (var i in sets_collection.models) {
                var model = sets_collection.models[i]
                var el = this.$el.children('.sets')

                var set_card_view = new SetCardView({
                    container: el,
                    model: model
                })

                set_card_view.render()
            }
        },
        render: function () {
            this.$el.append(Template('category')({
                category_name: this.model.get('name'),
                category_set_count: ''
            }))

            this.$el.addClass(this.model.get('id'))

            this.container.append(this.$el)
        }
    })

    return CategoryView
})
