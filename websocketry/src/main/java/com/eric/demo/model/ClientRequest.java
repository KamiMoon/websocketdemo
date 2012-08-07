package com.eric.demo.model;

import java.util.HashMap;
import java.util.LinkedHashMap;

public class ClientRequest {
	// player's name
	private String name;
	// event name
	private String event;
	// dynamic object that could hold many different types of payloads
	private HashMap<String, Object> payload = new LinkedHashMap<String, Object>();

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEvent() {
		return event;
	}

	public void setEvent(String event) {
		this.event = event;
	}

	public HashMap<String, Object> getPayload() {
		return payload;
	}

	public void setPayload(HashMap<String, Object> payload) {
		this.payload = payload;
	}

}