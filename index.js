const { TOKEN } = require('./config.json');

UserBalances = {}

const TAX_RATE = 10;

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'submit') {
    bal = interaction.options.getInteger('int');
    owed = ((100 * TAX_RATE) / UserBalances[interaction.user.id])
    UserBalances[interaction.user.id] = UserBalances[interaction.user.id] - owed;
    await interaction.reply('Submitted taxes successfully. You owe ' + ((100 * TAX_RATE) / UserBalances[interaction.user.id]));
  }

  if(interaction.commandName === 'create') {
      UserBalances[interaction.user.id] = 10
      await interaction.reply('Opened a new TruttleBank account successfully! Your balance is 10.')
  }

  if(interaction.commandName === 'balance') {
    await interaction.reply(UserBalances[interaction.user.id])
  }
});

client.login(TOKEN);