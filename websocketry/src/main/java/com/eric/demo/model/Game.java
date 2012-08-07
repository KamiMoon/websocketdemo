package com.eric.demo.model;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class Game {

	private static final int MAX_PLAYERS = 4;
	private static final Set<Player> PLAYERS = new HashSet<Player>(MAX_PLAYERS);
	private static final String[] COLORS = new String[] { "red", "green",
			"blue", "yellow" };

	public static ServerResponse runGameLogic(ClientRequest client) {
		ServerResponse response = null;
		Event event = Event.valueOf(client.getEvent().toUpperCase());

		switch (event) {
		case ADD_PLAYER:
			response = tryAddingPlayer(client);
			break;
		case CHAT:
			response = playerChat(client);
			break;
		case MOVE:
			response = playerMoved(client);
			break;
		case REMOVE_PLAYER:
			response = tryRemovingPlayer(client);
			break;
		case GET_ALL_PLAYERS:
			response = getAllPlayers(client);
			break;
		case PLAYER_CONNECTED:
			response = tryAddingPlayer(client);
			break;
		}

		return response;
	}

	private static ServerResponse getAllPlayers(ClientRequest client) {
		ServerResponse response = new ServerResponse();
		response.setName(client.getName());
		response.setEvent(Event.GET_ALL_PLAYERS.toString());
		response.putPayload("players", PLAYERS.toArray());
		return response;
	}

	private static ServerResponse tryRemovingPlayer(ClientRequest client) {
		// TODO - logic that might be needed before removing player

		return null;
	}

	private static ServerResponse playerMoved(ClientRequest client) {
		ServerResponse response = new ServerResponse();
		response.setName(client.getName());
		response.setEvent(Event.MOVE.toString());
		response.putPayload("x", client.getPayload().get("x"));
		response.putPayload("y", client.getPayload().get("y"));
		return response;
	}

	private static ServerResponse playerChat(ClientRequest client) {
		ServerResponse response = new ServerResponse();
		response.setName(client.getName());
		response.setEvent(Event.CHAT.toString());
		response.putPayload("chat", client.getPayload().get("text"));
		return response;
	}

	// there is no payload
	private static ServerResponse tryAddingPlayer(ClientRequest client) {
		ServerResponse response = new ServerResponse();
		Player player = new Player();
		player.setName(client.getName());

		int totalPlayers = PLAYERS.size();

		if (totalPlayers >= MAX_PLAYERS) {
			response.putPayload("validation", "There is a max of "
					+ MAX_PLAYERS + " players");
		} else {
			boolean nameIsUnique = PLAYERS.add(player);
			if (nameIsUnique) {
				player.setChat("");
				player.setX(50 + PLAYERS.size() * 15);
				player.setY(50);
				player.setR(10);
				player.setColor(COLORS[PLAYERS.size() - 1]);
			} else {
				response.putPayload("validation", player.getName()
						+ " name is already in the game");
			}
		}

		response.setEvent(client.getEvent());
		response.putPayload("players", PLAYERS.toArray());
		response.setName(player.getName());
		return response;
	}

}