define([ 'game/player', 'Class' ], function(Player, Class) {

	var Game = Class.extend({
		init : function(canvasId, App) {
			this.canvas = Raphael(canvasId, 800, 600);
			this.players = [];
			this.App = App;
		},
		nameIsUnique : function(player) {
			for ( var i = 0; i < this.players.length; i++) {
				if (player.name === this.players[i].model.name) {
					return false;
				}
			}
			return true;
		},
		addPlayer : function(playerModel) {
			if (this.nameIsUnique(playerModel)) {
				this.players.push(new Player(this.canvas, playerModel));
			}
		},
		addPlayers : function(players) {
			for ( var i = 0; i < players.length; i++) {
				this.addPlayer(players[i]);
			}
		},
		updatePlayer : function(player) {
			var iplayer = this.findPlayerByName(player.name);
			if (iplayer) {
				if (player.chat) {
					iplayer.model.chat = player.chat;
				}
				if (player.x) {
					iplayer.model.x = player.x;
				}
				if (player.y) {
					iplayer.model.y = player.y;
				}
				iplayer.update();
			}
		},
		findPlayerByName : function(name) {
			var iplayer;

			for ( var i = 0; i < this.players.length; i++) {
				iplayer = this.players[i];
				if (iplayer.model.name === name) {
					return iplayer;
				}
			}
			return false;
		},
		getMyPlayer : function() {
			return this.findPlayerByName(this.App.userId);
		},
		handleKeys : function(event) {
			var myPlayer = this.getMyPlayer();

			switch (event.keyCode) {
			case 38:
				myPlayer.up();
				this.App.dispatcher.trigger("CLIENT_MOVED", myPlayer);
				break;
			case 37:
				event.preventDefault();
				myPlayer.left();
				this.App.dispatcher.trigger("CLIENT_MOVED", myPlayer);
				break;
			case 40:
				myPlayer.down();
				this.App.dispatcher.trigger("CLIENT_MOVED", myPlayer);
				break;
			case 39:
				myPlayer.right();
				this.App.dispatcher.trigger("CLIENT_MOVED", myPlayer);
				break;
			}
		}
	});

	return Game;
});