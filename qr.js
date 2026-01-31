// qr.js
module.exports = {
    name: "QR Code Generator",
    version: "1.0.0",
    description: "Generate QR Code dari teks",
    usage: "/qr <teks>",
    commands: [
        { command: "qr", description: "Buat QR Code (contoh: /qr https://google.com)" }
    ],
    init: (bot) => {
        bot.command("qr", async (ctx) => {
            const args = ctx.message.text.split(' ').slice(1);
            
            if (args.length === 0) {
                return ctx.reply("❌ Gunakan: /qr <teks>\nContoh: /qr https://google.com");
            }
            
            const text = args.join(' ');
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}`;
            
            try {
                await ctx.replyWithChatAction("upload_photo");
                await ctx.replyWithPhoto(qrUrl, {
                    caption: `✅ QR Code untuk:\n<code>${text}</code>`,
                    parse_mode: 'HTML'
                });
            } catch (error) {
                await ctx.reply("❌ Gagal membuat QR Code. Coba lagi nanti.");
            }
        });
    }
};
