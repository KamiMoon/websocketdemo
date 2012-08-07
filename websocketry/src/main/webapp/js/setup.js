require.config({
	paths : {
		jquery : 'libs/backbone/jquery-1.7.1',
		json2 : 'libs/backbone/json2',
		underscore : 'libs/backbone/underscore-1.3.1',
		backbone : 'libs/backbone/backbone',
		bootstrap : 'libs/bootstrap/js/bootstrap',
		text : 'libs/require/text',
		handlebars : 'libs/handlebars-1.0.0.beta.6',
		atmosphere : 'libs/jquery.atmosphere',
		Class : 'libs/Class'
	},
	shim : {
		json2 : {
			exports : 'JSON'
		},
		underscore : {
			exports : '_'
		},
		backbone : {
			deps : [ 'underscore', 'jquery', 'json2' ],
			exports : 'Backbone'
		},
		bootstrap : {
			deps : [ 'jquery' ],
			exports : 'jquery'
		},
		handlebars : {
			exports : 'Handlebars'
		},
		atmosphere : {
			deps : [ 'jquery' ],
			exports : 'Atmosphere'
		},
		Class : {
			exports : 'Class'
		}
	}
});

require([ 'app' ], function(App) {
	new App;
});