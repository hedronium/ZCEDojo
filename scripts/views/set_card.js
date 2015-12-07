define([
    'backbone',
    'template',
    'collections/questions'
], function (Backbone, Template, Questions) {
    var SetView = Backbone.View.extend({
        tagName: 'a',
        className: 'set-card',
        initialize: function (opts) {
            this.container = opts.container
            this.model = opts.model
        },
        render: function () {
            var name = this.model.id.split('.')

            this.$el.append(Template('set_card')({
                set_name: name[1],
                set_namespace: name[0]
            }))

            this.$el.attr('href', '#/' + this.model.get('category') + '/' + this.model.get('id'))

            this.container.append(this.$el)
        }
    })

    return SetView
})
