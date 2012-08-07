define([ 'Class', 'atmosphere', ], function(Class, Atmosphere) {

	var Network = Class.extend({
		init : function(App) {
			this.App = App;
			this.socket = $.atmosphere;
			var request = {
				url : '/rest/game',
				contentType : "application/json",
				logLevel : 'debug',
				transport : 'websocket',
				fallbackTransport : 'long-polling'
			};
			var self = this;

			request.onOpen = function(response) {
				self.onConnect(response);
			};
			request.onMessage = function(response) {
				self.receiveMessage(response);
			};
			request.onClose = function(response) {
				self.receiveClose(response);
			};

			this.subSocket = this.socket.subscribe(request);

			return this;
		},
		onConnect : function(response) {
			console.log("Connected: "
					+ jQuery.stringifyJSON(response.responseBody));
			// send a message to the server to get all the players
			this.sendMessage({
				name : this.App.userId,
				event : "PLAYER_CONNECTED"
			});
		},
		receiveMessage : function(response) {
			var resp = jQuery.parseJSON(response.responseBody);
			console.log("receiveMessage: "
					+ jQuery.stringifyJSON(response.responseBody));
			this.App.dispatcher.trigger(resp.event, resp);
		},
		receiveClose : function(response) {
			console.log("receiveClose: "
					+ jQuery.stringifyJSON(response.responseBody));
		},
		sendMessage : function(data) {
			this.subSocket.push(jQuery.stringifyJSON(data));
		}
	});

	return Network;
});