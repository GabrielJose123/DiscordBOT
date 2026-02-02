const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { execute } = require('./ping');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('git')
        .setDescription('relembrar comandos do git'),
    async execute(interaction) { await interaction.reply({ embed: [exempleEmbed]})}
}