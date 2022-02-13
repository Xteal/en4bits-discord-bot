require('dotenv').config()
const express = require('express');
const appServer = express();
const server = require('http').Server(appServer);
const Discord = require("discord.io");
const logger = require("winston");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = "debug";

server.listen(process.env.serverPort, () => {
    appServer.get('/', (req, res) => {
        res.json({"mesage":true})
    })
});

// Initialize Discord Bot
const bot = new Discord.Client({
    token: process.env.TOKEN,
    autorun: true,
    intent: ['GUILD','GUILD_MESSAGES']
});

bot.on("ready", function(evt) {
    logger.info(bot.username + "–(" + bot.id + ")");
});

bot.on("message", function(user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == "!") {
        const args = message.split("!");
        const cmd = args[1];
        switch (cmd) {
            case "live":
                bot.sendMessage({
                    to: process.env.LIVECHANNELID,
                    message: `:red_circle: 4Biters :red_circle: estamos en directo @everyone.

                                Os esperamos en https://twitch.tv/en4bits`
                })
        }
    }
});