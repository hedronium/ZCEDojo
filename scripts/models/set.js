define([
    'backbone',
    'collections/questions'
], function (Backbone, Questions) {
    var Set = Backbone.Model.extend({
        questions: null,
        initialize: function (opts) {
            this.id = opts.id
            this.name = opts.name
            this.category = opts.category;

            this.questions = new Questions(null, {
                question_set: this
            })

            this.questions.on('sync', function (questions) {
            });
        },
        loadQuestions: function () {
            this.questions.fetch()
        }
    })

    return Set
})
