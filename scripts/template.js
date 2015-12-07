define([
    'handlebars',
    'jquery'
], function (Handlebars, jQuery) {
    var templates = {}

    return function (id) {
        id += '_template'

        if (typeof templates[id] !== 'undefined') {
            return templates[id]
        } else {
            var source = jQuery('#' + id).html()
            var template = templates[id] = Handlebars.compile(source)
            return template
        }
    }
})
