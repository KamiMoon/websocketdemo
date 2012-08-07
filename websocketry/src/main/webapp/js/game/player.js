define([ 'Class', ], function(Class) {

	var Player = Class.extend({
		model : {
			name : "",
			x : 50,
			y : 50,
			r : 10,
			chat : "Hello World",
			color : "green"
		},
		init : function(raphaelCanvas, model) {
			if (model) {
				this.model = model;
			}
			this.circle = raphaelCanvas.circle(this.model.x, this.model.y,
					this.model.r);
			this.circle.attr({
				"fill" : this.model.color,
				"stroke" : "#fff"
			});
			this.text = raphaelCanvas.text(this.model.x, this.model.y,
					this.model.chat);

			this.update();
		},
		update : function() {
			this.updateText();
			this.updateCircle();
		},
		updateText : function() {
			this.text.attr({
				x : this.model.x,
				y : this.model.y - this.model.r - 20,
				text : this.model.name + "\n" + this.model.chat
			});
		},
		updateCircle : function() {
			this.circle.attr({
				fill : this.model.color,
				cx : this.model.x,
				cy : this.model.y,
				r : this.model.r
			});
		},
		up : function() {
			this.model.y -= 10;
			this.update();
		},
		down : function() {
			this.model.y += 10;
			this.update();
		},
		left : function() {
			this.model.x -= 10;
			this.update();
		},
		right : function() {
			this.model.x += 10;
			this.update();
		}
	});

	return Player;
});