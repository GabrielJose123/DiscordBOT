const { SlashCommandBuilder, EmbedBuilder  } = require('@discordjs/builders');

const embedGIT = new EmbedBuilder()
    .setTitle('testeWK')
    .setDescription('teste')
    .setColor(0xff0000)
    .setAuthor({ name: 'gabriel' })
    .setFooter({ text: 'teste' })
    .addFields(
        { name: 'Campo 1', value: 'este', inline: true },
        { name: 'Campo 2', value: 'teste', inline: true }
    )
    .setImage('https://picsum.photos/800/400')
    .setThumbnail('https://placekitten.com/300/300');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('git')
        .setDescription('Mostra o embed de teste'),

    async execute(interaction) {
        await interaction.reply({ embeds: [embedGIT] });
    }
};
