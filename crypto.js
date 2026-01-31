// crypto.js
const fetch = require('node-fetch');

module.exports = {
    name: "Crypto Price",
    version: "1.0.0",
    description: "Cek harga cryptocurrency",
    usage: "/crypto <nama_coin>",
    commands: [
        { command: "crypto", description: "Cek harga crypto (contoh: /crypto bitcoin)" }
    ],
    init: (bot) => {
        bot.command("crypto", async (ctx) => {
            const args = ctx.message.text.split(' ').slice(1);
            
            if (args.length === 0) {
                return ctx.reply("❌ Gunakan: /crypto <nama_coin>\nContoh: /crypto bitcoin");
            }
            
            const coinId = args[0].toLowerCase();
            
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd,idr&include_24hr_change=true`);
                const data = await response.json();
                
                if (!data[coinId]) {
                    return ctx.reply("❌ Cryptocurrency tidak ditemukan. Coba nama lain.");
                }
                
                const coin = data[coinId];
                const priceUSD = coin.usd.toLocaleString('en-US');
                const priceIDR = coin.idr.toLocaleString('id-ID');
                const change = coin.usd_24h_change ? coin.usd_24h_change.toFixed(2) : 'N/A';
                const emoji = change > 0 ? '📈' : '📉';
                
                const message = `
💰 <b>${coinId.toUpperCase()} Price</b>

💵 USD: $${priceUSD}
💴 IDR: Rp${priceIDR}

${emoji} 24h Change: ${change}%
                `;
                
                await ctx.reply(message, { parse_mode: 'HTML' });
            } catch (error) {
                await ctx.reply("❌ Gagal mendapatkan harga crypto. Coba lagi nanti.");
            }
        });
    }
};
