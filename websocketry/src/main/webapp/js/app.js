define([ 'jquery', 'bootstrap', 'game/game', 'backbone', 'underscore',
		'game/network' ], function($, bootstrap, Game, Backbone, _, Network) {

	var App = function() {
		var network = new Network(this);
		var game = new Game("canvas", this);
		var self = this;

		$(document).ready(function() {
			var $chatText = $("#chatText");
			var $chatForm = $("#chatForm");
			var $chatInput = $("#chatText");
			self.userId = $("#userId").val();
			console.log("client: " + self.userId);

			$chatText.focus();
			$chatForm.submit(function(event) {
				var text = $chatInput.val();
				event.preventDefault();
				network.sendMessage({
					name : self.userId,
					event : "CHAT",
					payload : {
						text : text
					}
				});
			});

			$("body").on("keyup", function(event) {
				game.handleKeys(event);
				return false;
			});
		});

		this.dispatcher = _.clone(Backbone.Events);

		// client pushed events
		this.dispatcher.on("CLIENT_MOVED", function(player) {
			network.sendMessage({
				name : self.userId,
				event : "MOVE",
				payload : {
					x : player.model.x,
					y : player.model.y
				}
			});
		});

		// server pushed events
		this.dispatcher.on("ADD_PLAYER", function(response) {
			game.addPlayers(response.payload.players);
		});

		this.dispatcher.on("PLAYER_CONNECTED", function(response) {
			if (response.payload.validation) {
				alert(response.payload.validation);
			}
			game.addPlayers(response.payload.players);
		});

		this.dispatcher.on("CHAT", function(response) {
			game.updatePlayer({
				name : response.name,
				chat : response.payload.chat
			});
		});

		this.dispatcher.on("GET_ALL_PLAYERS", function(response) {
			game.addPlayers(response.payload.players);
		});

		this.dispatcher.on("MOVE", function(response) {
			game.updatePlayer({
				name : response.name,
				x : response.payload.x,
				y : response.payload.y
			});
		});

	};
	return App;
});