// calculator.js
module.exports = {
    name: "Calculator UI",
    version: "2.0.0",
    description: "Kalkulator dengan tombol interaktif",
    usage: "/calc",
    commands: [
        { command: "calc", description: "Buka kalkulator dengan tombol" }
    ],
    init: (bot) => {
        // Store untuk menyimpan state kalkulator setiap user
        const calculatorStates = new Map();

        // Fungsi untuk membuat keyboard kalkulator
        function createCalculatorKeyboard() {
            const { InlineKeyboard } = require('grammy');
            const keyboard = new InlineKeyboard()
                .text("C", "calc_C").text("(", "calc_(").text(")", "calc_)").text("⌫", "calc_back")
                .row()
                .text("7", "calc_7").text("8", "calc_8").text("9", "calc_9").text("÷", "calc_/")
                .row()
                .text("4", "calc_4").text("5", "calc_5").text("6", "calc_6").text("×", "calc_*")
                .row()
                .text("1", "calc_1").text("2", "calc_2").text("3", "calc_3").text("-", "calc_-")
                .row()
                .text("0", "calc_0").text(".", "calc_.").text("=", "calc_=").text("+", "calc_+");
            return keyboard;
        }

        // Fungsi untuk membuat tampilan display
        function createDisplay(expression, result = null) {
            const displayExpr = expression || '0';
            const displayResult = result !== null ? `\n= ${result}` : '';
            
            return `
🧮 𝗖𝗮𝗹𝗰𝘂𝗹𝗮𝘁𝗼𝗿
━━━━━━━━━━━━━━━

<code>${displayExpr}</code>${displayResult}

━━━━━━━━━━━━━━━
`;
        }

        // Command untuk membuka kalkulator
        bot.command("calc", async (ctx) => {
            const userId = ctx.from.id;
            calculatorStates.set(userId, { expression: '', result: null });
            
            await ctx.reply(
                createDisplay(''),
                {
                    parse_mode: 'HTML',
                    reply_markup: createCalculatorKeyboard()
                }
            );
        });

        // Handler untuk callback dari tombol
        bot.on("callback_query:data", async (ctx) => {
            const data = ctx.callbackQuery.data;
            
            if (!data.startsWith('calc_')) return;
            
            const userId = ctx.from.id;
            const action = data.replace('calc_', '');
            
            // Ambil state kalkulator user
            let state = calculatorStates.get(userId);
            if (!state) {
                state = { expression: '', result: null };
                calculatorStates.set(userId, state);
            }

            let { expression, result } = state;

            // Handle action
            if (action === 'C') {
                // Clear
                expression = '';
                result = null;
            } else if (action === 'back') {
                // Backspace
                expression = expression.slice(0, -1);
                result = null;
            } else if (action === '=') {
                // Calculate
                if (expression) {
                    try {
                        // Replace × dan ÷ dengan operator JavaScript
                        const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');
                        
                        // Validasi karakter yang diizinkan
                        if (!/^[0-9+\-*/(). ]+$/.test(sanitized)) {
                            throw new Error('Invalid characters');
                        }
                        
                        // Evaluasi ekspresi
                        const calcResult = Function('"use strict"; return (' + sanitized + ')')();
                        
                        if (!isFinite(calcResult)) {
                            result = 'Error';
                        } else {
                            // Format hasil dengan max 10 digit desimal
                            result = parseFloat(calcResult.toFixed(10)).toString();
                        }
                    } catch (error) {
                        result = 'Error';
                    }
                }
            } else {
                // Append angka atau operator
                if (result !== null && result !== 'Error') {
                    // Jika sudah ada hasil, mulai ekspresi baru
                    if (['+', '-', '*', '/'].includes(action)) {
                        expression = result + action;
                    } else if (action === '(' || action === ')') {
                        expression = action;
                    } else {
                        expression = action;
                    }
                    result = null;
                } else if (result === 'Error') {
                    // Reset jika error
                    expression = action;
                    result = null;
                } else {
                    // Tambahkan ke ekspresi
                    expression += action;
                }
            }

            // Update state
            calculatorStates.set(userId, { expression, result });

            // Update tampilan
            try {
                await ctx.editMessageText(
                    createDisplay(expression, result),
                    {
                        parse_mode: 'HTML',
                        reply_markup: createCalculatorKeyboard()
                    }
                );
                await ctx.answerCallbackQuery();
            } catch (error) {
                // Jika gagal edit (mungkin message terlalu lama), kirim baru
                if (error.description && error.description.includes('message is not modified')) {
                    await ctx.answerCallbackQuery();
                } else {
                    await ctx.answerCallbackQuery({ text: '❌ Terjadi kesalahan' });
                }
            }
        });

        // Cleanup state yang lama setiap 1 jam
        setInterval(() => {
            if (calculatorStates.size > 1000) {
                calculatorStates.clear();
            }
        }, 3600000);
    }
};
