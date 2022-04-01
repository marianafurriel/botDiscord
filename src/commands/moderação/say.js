const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "falar",
            description: "faz o bot dizer alguma msg",
            options: [
                {
                    name: 'canal',
                    type: 'CHANNEL',
                    description: 'canal onde a msg será enviada',
                    required: true
                },
                {
                    name: 'mensagem',
                    type: 'STRING',
                    description: 'A mensagem que será enviada no canal',
                    required: true
                }
            ]
        })
    }
    run = (interaction) => {
        const canal = interaction.options.getChannel('canal')
        if (!['GUILD_TEXT', 'GUILD_ANNOUNCEMENTS'].includes(canal.type)) return interaction.reply({ content: 'ERRO! Informe um canal de texto ou de anúncios', ephemeral: true })

        const texto = interaction.options.getString('mensagem')

        const embed = new MessageEmbed()
            .setTitle(`Uma mensagem foi enviada neste canal`)
            .setDescription(texto)
            .setColor('#0000ff')
            .setTimestamp()

        canal.send({ embeds: [embed] })
            .then(() => interaction.reply({ content: `Mensagem enviada com sucesso no canal #${canal.name}!`, ephemeral: true }))
            .catch(() => interaction.reply({ content: `Erro ao tentar enviar a mensagem no canal`, ephemeral: true }))
    }
}