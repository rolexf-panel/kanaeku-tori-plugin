// quote.js
const fetch = require('node-fetch');

module.exports = {
    name: "Random Quote",
    version: "1.0.0",
    description: "Mendapatkan quote motivasi acak",
    usage: "/quote",
    commands: [
        { command: "quote", description: "Dapatkan quote inspiratif" }
    ],
    init: (bot) => {
        bot.command("quote", async (ctx) => {
            try {
                const response = await fetch('https://api.quotable.io/random');
                const data = await response.json();
                
                const message = `
📜 <b>Quote of the Day</b>

"${data.content}"

— <i>${data.author}</i>
                `;
                
                await ctx.reply(message, { parse_mode: 'HTML' });
            } catch (error) {
                await ctx.reply("❌ Gagal mendapatkan quote. Coba lagi nanti.");
            }
        });
    }
};
