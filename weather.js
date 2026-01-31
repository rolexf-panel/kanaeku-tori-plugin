// weather.js
const fetch = require('node-fetch');

module.exports = {
    name: "Weather Info",
    version: "1.0.0",
    description: "Cek cuaca kota",
    usage: "/weather <nama_kota>",
    commands: [
        { command: "weather", description: "Cek cuaca (contoh: /weather Jakarta)" }
    ],
    init: (bot) => {
        bot.command("weather", async (ctx) => {
            const args = ctx.message.text.split(' ').slice(1);
            
            if (args.length === 0) {
                return ctx.reply("❌ Gunakan: /weather <nama_kota>\nContoh: /weather Jakarta");
            }
            
            const city = args.join(' ');
            
            try {
                const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
                const data = await response.json();
                
                if (data.error) {
                    return ctx.reply("❌ Kota tidak ditemukan.");
                }
                
                const current = data.current_condition[0];
                const temp = current.temp_C;
                const feelsLike = current.FeelsLikeC;
                const desc = current.weatherDesc[0].value;
                const humidity = current.humidity;
                const windSpeed = current.windspeedKmph;
                
                const message = `
🌤️ <b>Weather in ${city}</b>

🌡️ Temperature: ${temp}°C (Feels like ${feelsLike}°C)
☁️ Condition: ${desc}
💧 Humidity: ${humidity}%
💨 Wind Speed: ${windSpeed} km/h
                `;
                
                await ctx.reply(message, { parse_mode: 'HTML' });
            } catch (error) {
                await ctx.reply("❌ Gagal mendapatkan info cuaca. Coba lagi nanti.");
            }
        });
    }
};
