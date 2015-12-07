define([
	'singleton',
	'backbone',
	'template',
	'collections/questions',
	'views/question'
], function (App, Backbone, Template, QuestionsCollection, QuestionView) {
	var SetView = Backbone.View.extend({
		tagName: 'section',
		className: 'set',
		container: null,
		question_views: [],
		initialize: function (opts) {
			this.contianer = opts.container
			this.model = opts.model

			this.questions = new QuestionsCollection(null, {
				question_set: this.model
			})

			this.questions.fetch()
		},
		render_category: function (categories) {
			var category = categories.get(this.model.category)
			this.$el.find('.category').html(category.get('name'))
		},
		render_question_count: function (questions) {
			this.$el.find('.count').html(questions.length)
		},
		render_questions: function (questions) {
			var el = this.$el.find('.questions')

			for (var i in questions.models) {
				var question = questions.models[i]
				
				var question_view = new QuestionView({
					container: el,
					model: question
				})

				this.question_views.push(question_view)
			}
		},
		render: function () {
			var name = this.model.id.split('.')

			this.$el.append(Template('set')({
				set_name: name[1],
				set_namespace: name[0]
			}))

			this.questions.load(this.render_question_count, this)
			this.questions.load(this.render_questions, this)

			App.categories.load(this.render_category, this)

			this.contianer.append(this.$el)
		}
	})

	return SetView
})