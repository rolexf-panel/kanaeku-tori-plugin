module.exports = {
    name: "Halo Sederhana",
    version: "1.0.0",
    description: "Bot akan menyapa jika user mengetik 'halo' atau 'hai'",
    usage: "Ketik 'halo' di chat",
    commands: [], // Tidak ada command khusus
    
    // Fungsi init dipanggil saat bot start
    init: (bot) => {
        // Menggunakan regex untuk menangkap kata "halo" atau "hai" (tidak case sensitive)
        bot.hears(/^(halo|hai|hi|hello)/i, async (ctx) => {
            await ctx.reply("Halo juga! Senang bertemu denganmu! 👋");
        });
    }
};
