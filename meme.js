// meme.js
const fetch = require('node-fetch');

module.exports = {
    name: "Random Meme",
    version: "1.0.0",
    description: "Mendapatkan meme lucu acak dari Reddit",
    usage: "/meme",
    commands: [
        { command: "meme", description: "Dapatkan meme lucu" }
    ],
    init: (bot) => {
        bot.command("meme", async (ctx) => {
            try {
                await ctx.replyWithChatAction("upload_photo");
                const response = await fetch('https://meme-api.com/gimme');
                const data = await response.json();
                
                await ctx.replyWithPhoto(data.url, {
                    caption: `😂 <b>${data.title}</b>\n\n👍 ${data.ups} upvotes | 📱 r/${data.subreddit}`,
                    parse_mode: 'HTML'
                });
            } catch (error) {
                await ctx.reply("❌ Gagal mendapatkan meme. Coba lagi nanti.");
            }
        });
    }
};
