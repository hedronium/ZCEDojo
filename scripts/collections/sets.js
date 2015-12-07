define([
    'backbone',
    'models/set'
], function (Backbone, Set) {
    var Sets = Backbone.Collection.extend({
        model: Set,
        url: function () {
            return 'questions/' + this.category_id + '/sets.json'
        },
        parse: function (data) {
            var models = []

            for (var namespace in data) {
                for (var index = 0; index < data[namespace].length; index++) {
                    models.push({
                        id: namespace + '.' + data[namespace][index],
                        name: data[namespace][index],
                        category: this.category_id
                    });
                }
            }

            return models
        },
        initialize: function (args) {
            this.category_id = args.category_id
        }
    })

    return Sets
})
