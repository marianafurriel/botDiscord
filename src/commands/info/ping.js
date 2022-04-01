const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "mostra o ping do bot"
        })
    }
    run = (interaction) => {
        interaction.reply({
            content: `o ping do bot é \`${this.client.ws.ping}\`ms`,
            ephemeral: false
        })
    }
}