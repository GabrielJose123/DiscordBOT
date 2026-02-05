const { SlashCommandBuilder } = require('@discordjs/builders');
const { Options } = require('discord.js');

const ping = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('responde com pong')
    {Options: ['teste', 'teste2']}

module.exports = {
    data : ping,
    async execute(interaction){ await interaction.reply('pong') }
};