// dog.js
const fetch = require('node-fetch');

module.exports = {
    name: "Random Dog",
    version: "1.0.0",
    description: "Mendapatkan gambar anjing acak",
    usage: "/dog",
    commands: [
        { command: "dog", description: "Dapatkan gambar anjing lucu" }
    ],
    init: (bot) => {
        bot.command("dog", async (ctx) => {
            try {
                await ctx.replyWithChatAction("upload_photo");
                const response = await fetch('https://dog.ceo/api/breeds/image/random');
                const data = await response.json();
                
                await ctx.replyWithPhoto(data.message, {
                    caption: "🐕 Woof! Here's a cute dog for you!"
                });
            } catch (error) {
                await ctx.reply("❌ Gagal mendapatkan gambar anjing. Coba lagi nanti.");
            }
        });
    }
};
