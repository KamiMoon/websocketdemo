package com.eric.demo.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import org.atmosphere.annotation.Broadcast;
import org.atmosphere.annotation.Suspend;

import com.eric.demo.model.ClientRequest;
import com.eric.demo.model.Game;
import com.eric.demo.model.ServerResponse;

@Path("/game")
public class ServerNetwork {

	@Suspend(contentType = "application/json")
	@GET
	public String suspend() {
		return "";
	}

	@Broadcast(writeEntity = false)
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public ServerResponse broadcast(ClientRequest client) {
		return Game.runGameLogic(client);
	}

}
