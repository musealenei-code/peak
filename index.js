const { Client, GatewayIntentBits, ActivityType } = require("discord.js");

const { joinVoiceChannel } = require("@discordjs/voice");

const config = require("./config.json");

const client = new Client({

  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]

});

// ضع رابط البث هنا مباشرة

const STREAM_URL = "https://twitch.tv/toplz"; // غيره لرابطك

client.on("ready", () => {

  console.log(`Online as ${client.user.tag}`);

  // تغيير الحالة إلى Streaming

  client.user.setActivity("Toplz", {

    type: ActivityType.Streaming,

    url: STREAM_URL

  });

  const channel = client.channels.cache.get(config.voiceChannel);

  if (!channel) return console.log("Voice channel not found!");

  joinVoiceChannel({

    channelId: channel.id,

    guildId: channel.guild.id,

    adapterCreator: channel.guild.voiceAdapterCreator,

    selfDeaf: true

  });

  console.log(`Joined: ${channel.name} and streaming`);

});

client.login(config.token);