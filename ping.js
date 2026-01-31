module.exports = {
    name: "Ping Utility",
    version: "1.2.0",
    description: "Mengecek kecepatan respon bot",
    usage: "/ping",
    commands: [
        { command: "ping", description: "Cek kecepatan bot" }
    ],

    init: (bot) => {
        bot.command("ping", async (ctx) => {
            const start = Date.now();
            // Kirim pesan 'Pinging...' dulu
            const msg = await ctx.reply("Pinging... 🏓");
            const end = Date.now();
            const diff = end - start;
            
            // Edit pesan tersebut dengan hasil
            await ctx.api.editMessageText(
                ctx.chat.id, 
                msg.message_id, 
                `Pong! ⏱️ ${diff}ms`
            );
        });
    }
};
