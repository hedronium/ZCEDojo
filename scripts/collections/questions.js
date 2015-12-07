define([
    "backbone",
    "models/question"
], function (Backbone, Question) {
    var Questions = Backbone.Collection.extend({
        syncing: false,
        synced: false,
        url: function () {
            return 'questions/' + this.question_set.get('category') + '/' + this.question_set.get('id') + '/questions.json'
        },
        model: Question,
        comparator: function (a, b) {
            var aid = parseInt(a.id)
            var bid = parseInt(b.id)

            if (aid > bid) {
                return 1
            } else if (bid > aid) {
                return -1
            } else {
                return 0
            }
        },
        initialize: function (x, args) {
            this.question_set = args.question_set

            this.on('sync', function () {
                this.synced = true
                this.syncing = false
            }, this)
        },
        fetch: function (opts) {
            this.syncing = true
            Backbone.Collection.prototype.fetch.apply(this, [opts])
        },
        parse: function (data) {
            var models = []

            for (var id in data) {
                models.push({
                    id: data[id],
                    question_set: this.question_set
                })
            }

            return models
        },
        load: function (callback, context) {
            if (!(this.syncing || this.synced)) {
                this.fetch()
            } 

            if (this.synced) {
                callback.apply(context, [this])
            } else {
                this.on('sync', callback, context)
            }
        }
    });

    return Questions
});
