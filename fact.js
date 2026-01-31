// fact.js
const fetch = require('node-fetch');

module.exports = {
    name: "Random Fact",
    version: "1.0.0",
    description: "Mendapatkan fakta menarik acak",
    usage: "/fact",
    commands: [
        { command: "fact", description: "Dapatkan fakta menarik" }
    ],
    init: (bot) => {
        bot.command("fact", async (ctx) => {
            try {
                const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
                const data = await response.json();
                
                const message = `
🧠 <b>Random Fact</b>

${data.text}
                `;
                
                await ctx.reply(message, { parse_mode: 'HTML' });
            } catch (error) {
                await ctx.reply("❌ Gagal mendapatkan fakta. Coba lagi nanti.");
            }
        });
    }
};
