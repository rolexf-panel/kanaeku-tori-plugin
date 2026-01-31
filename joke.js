// joke.js
const fetch = require('node-fetch');

module.exports = {
    name: "Random Joke",
    version: "1.0.0",
    description: "Mendapatkan joke lucu acak",
    usage: "/joke",
    commands: [
        { command: "joke", description: "Dapatkan joke lucu" }
    ],
    init: (bot) => {
        bot.command("joke", async (ctx) => {
            try {
                const response = await fetch('https://official-joke-api.appspot.com/random_joke');
                const data = await response.json();
                
                const message = `
😄 <b>Random Joke</b>

${data.setup}

<i>${data.punchline}</i> 😂
                `;
                
                await ctx.reply(message, { parse_mode: 'HTML' });
            } catch (error) {
                await ctx.reply("❌ Gagal mendapatkan joke. Coba lagi nanti.");
            }
        });
    }
};
