define([
    'backbone',
    'yaml'
], function (Backbone, YAML) {
    var Question = Backbone.Model.extend({
        defaults: {
            id: '0',
            question_set: null
        },
        url: function () {
            return 'questions/' + this.question_set.category + '/' + this.question_set.id + '/' + this.id + '.yml'
        },
        parse: function (response) {
            if (typeof response.id === 'undefined') {
                return yaml.load(response)
            }
        },
        initialize: function (opts) {
            this.id = opts.id
            this.question_set = opts.question_set
        },
        fetch: function () {
            return Backbone.Model.prototype.fetch.apply(this, [{
                dataType: 'text'
            }])
        }
    })

    return Question
})
