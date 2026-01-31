// cat.js
const fetch = require('node-fetch');

module.exports = {
    name: "Random Cat",
    version: "1.0.0",
    description: "Mendapatkan gambar kucing acak",
    usage: "/cat",
    commands: [
        { command: "cat", description: "Dapatkan gambar kucing lucu" }
    ],
    init: (bot) => {
        bot.command("cat", async (ctx) => {
            try {
                await ctx.replyWithChatAction("upload_photo");
                const response = await fetch('https://api.thecatapi.com/v1/images/search');
                const data = await response.json();
                
                await ctx.replyWithPhoto(data[0].url, {
                    caption: "🐱 Meow! Here's a cute cat for you!"
                });
            } catch (error) {
                await ctx.reply("❌ Gagal mendapatkan gambar kucing. Coba lagi nanti.");
            }
        });
    }
};
