
const DiscordJS  = require("discord.js")
const { Intents } = require("discord.js")
const Cooldown = require("./tools/cooldown.js");
const fs = require("node:fs")
const path = require("node:path")
require("dotenv").config()


const { PREFIX }  = require("./config.json")
const TOKEN = process.env.TOKEN

const cooldown = new Cooldown(10) // Cooldown between commands

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
    ]
})

client.on("ready", () => {
    console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers`)
})

client.on("messageCreate", (message) => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "ping") { // Ping command
        message.channel.send(`Pong in **${Math.round(client.ws.ping)}ms**`)
    }

    if (command === "search" || command === "Search" || command === "s" || command === "S") { // Search command
        try {
            if(cooldown.isFinished()) {
                client.commands.get("search").execute(message, args, client)
                cooldown.start();
            } else {
                message.channel.send(`You can send another command in **${cooldown.timeLeft()} seconds**`);
            }
        } catch (e) {
            console.error(e);
            message.channel.send("An error accrued while executing this command");
        }
    }
})

//Load commands
client.commands = new DiscordJS.Collection()
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    client.commands.set(command.name, command)
}

//Start client
client.login(TOKEN)
