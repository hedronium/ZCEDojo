define([
	'backbone',
	'models/category'
], function (Backbone, Category) {
	var Categories = Backbone.Collection.extend({
		url: 'questions/categories.json',
		model: Category,
		syncing: false,
		synced: false,
		initialize: function () {
			this.on('sync', function () {
				this.synced = true
				this.syncing = false
			}, this)
		},
		fetch: function (opts) {
			this.syncing = true
			Backbone.Collection.prototype.fetch.apply(this, [opts])
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

	return Categories
})
