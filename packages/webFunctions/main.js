'use strict';
class webFunctions {
	
	constructor(webScriptUrl) {
		this.webScriptUrl = webScriptUrl;
		this.refreshAllData();
		setInterval(this.refreshAllData, config.mapUpdate * 1000);
		events.Add("ClientConnected", this.onClientCreated, this);
    events.Add("ClientDisconnected", this.onClientDisconnected, this);
	}
	
	
	onClientCreated(client)
	{
		wf.updateStatus();
		request.post({
			url:     config.pathToWebsite + 'addNotify.php',
			form:    { accessHash: config.secretVerifyHash , type: "connect", name: client.name }
		}, function(error, response, body){
			if(error) console.log("Warning!!! Send a Event failed! Reason: " + error);
		});
	}
	
	onClientDisconnected(client)
	{
		wf.updateStatus();
		request.post({
			url:     config.pathToWebsite + 'addNotify.php',
			form:    { accessHash: config.secretVerifyHash , type: "disconnect", name: client.name }
		}, function(error, response, body){
			if(error) console.log("Warning!!! Send a Event failed! Reason: " + error);
		});
	}
	
	onPlayerDeath(player, reason, killer)
	{
		request.post({
			url:     config.pathToWebsite + 'addNotify.php',
			form:    { accessHash: config.secretVerifyHash , type: "kill", reason: reason, name: player.name, killername: killer.name }
		}, function(error, response, body){
			if(error) console.log("Warning!!! Send a Event failed! Reason: " + error);
		});
	}
	
	updateStatus()
	{
		let config = JSON.parse(gtamp.server.config);
		let serverStatus = [ config.serverName, config.map, config.mode, gtamp.server.curPlayers, config.maxPlayers , config.password != "" ? true : false, config.host, config.port];
		fs.writeFile("serverStatus.json", JSON.stringify(serverStatus), function(err) {
			if(err) {
				console.log("Warning!!! Save a Server Status failed! Reason: " + err);
			}
		});
	}
	
	refreshAllData()
	{
		let dataToFile = {};
		for (let i = 0; i < gtamp.players.length; i++) {
			//id;name;x;y;color;health;armor;
			dataToFile[i] = [
			gtamp.players[i].name,
			gtamp.players[i].position.x,
			gtamp.players[i].position.y,
			gtamp.players[i].color,
			gtamp.players[i].health,
			gtamp.players[i].armor];
		}
		
		fs.writeFile("mapData.json", JSON.stringify(dataToFile), function(err) {
			if(err) {
				console.log("Warning!!! Save a Map Data failed! Reason: " + err);
			}
		});
	}
	
}

var config = require("./config");
var fs = require("../../node_modules/file-system");
var request = require("../../node_modules/request");
var wf = new webFunctions("");