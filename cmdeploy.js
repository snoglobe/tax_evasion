const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders')
const { CLIENT_ID, TOKEN } = require('./config.json');

const commands = [
    new SlashCommandBuilder()
        .setName('submit')
        .setDescription('Submit your taxes.')
        .addIntegerOption(option => option.setName('int').setDescription('Your balance.')),
    new SlashCommandBuilder()
        .setName('create')
        .setDescription('Open a TruttleBank account.'),
    new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your balance.')
].map(command => command.toJSON()); 

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
        Routes.applicationCommands(CLIENT_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();