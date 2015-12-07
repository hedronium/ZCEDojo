define([
    'backbone',
    'collections/sets'
], function (Backbone, Sets) {
    var Category = Backbone.Model.extend({
        defaults: {
            id: null,
            name: null
        },
        sets: null,
        initialize: function () {
            var id = this.get('id')
            var sets = this.sets = new Sets({
                category_id: id
            })
        }
    })

    return Category
})
