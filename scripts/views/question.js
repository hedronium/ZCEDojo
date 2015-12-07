define([
	'backbone',
	'template',
	'marked'
], function (Backbone, Template, Marked) {
	var QuestionView = Backbone.View.extend({
		tagName: 'section',
		className: 'question',
		initialize: function (opts) {
			this.model = opts.model
			this.container = opts.container

			this.render()
			this.model.on('sync', this.render_question, this)

			this.model.fetch()
		},
		render_question: function (question) {
			this.$el.find('.problem').html(Marked(question.get('question')))
			var options = question.get('options')

			for (var i in options) {
				var option = options[i]

				this.$el.find('.options').append(Template('option')({
					id: i,
					option: Marked(option)
				}))
			}
		},
		render: function () {
			this.$el.append(Template('question')({
				number: this.model.id
			}))

			this.container.append(this.$el)
		}
	})

	return QuestionView
})