// advice.js
const fetch = require('node-fetch');

module.exports = {
    name: "Random Advice",
    version: "1.0.0",
    description: "Mendapatkan saran hidup acak",
    usage: "/advice",
    commands: [
        { command: "advice", description: "Dapatkan saran hidup" }
    ],
    init: (bot) => {
        bot.command("advice", async (ctx) => {
            try {
                const response = await fetch('https://api.adviceslip.com/advice');
                const data = await response.json();
                
                const message = `
💡 <b>Life Advice</b>

"${data.slip.advice}"
                `;
                
                await ctx.reply(message, { parse_mode: 'HTML' });
            } catch (error) {
                await ctx.reply("❌ Gagal mendapatkan advice. Coba lagi nanti.");
            }
        });
    }
};
