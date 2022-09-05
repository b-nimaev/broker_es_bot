import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../Model/Model";
require("dotenv").config()
import { add_coins, getUser, lose_coins } from "../../Controller/UserController";

const handler = new Composer<MyContext>();
const game = new Scenes.WizardScene(
    "game",
    handler,

    // Строка 128
    async (ctx) => {
        console.log(128)
        if (ctx.update["message"]) {

            if (ctx.update["message"].text == 'Línea de soporte') {
                const message = "Tienes toda la razón, esta es una línea de soporte. Ya que pasa por los puntos más bajos del grafico de precios. Toma tus 500 monedas"
                await add_coins(ctx.from, 500, false)
                // await ctx.replyWithVideo({ source: './src/assets/higher.mp4' })
                await ctx.replyWithSticker("CAACAgIAAxkBAAINlWLw4TfLvzsDawccQvPswpOo0xO7AAJGBAACP5XMCstXCFgVL57DKQQ")
                await ctx.reply(message)
            }

            if (ctx.update["message"].text == 'Línea de resistencia') {
                const message = "Desafortunadamente esta es la respuesta equivocada. Esta no es una línea de resistencia, sino una línea de soporte. Pasa a través de los puntos más bajos del gráfico de precios. Pero todavía tienes muchas oportunidades para ganar. Por cierto, una de ellas es reponer el depósito y recibir inmediatamente 10.000 monedas a stu cuenta! ¡Entonces definitivamente tendrás bastante para el premio principal! ¡Dale click al botón en el menú de abajo y toma el primer paso hacia el trading verdadero!"
                await ctx.replyWithSticker("CAACAgIAAxkBAAINlmLw4T1-Kj5aK4SqswLjOJBw0LApAAJaBAACP5XMCu4_V1wQbaG7KQQ")
                await ctx.reply(message)
            }

            const extra = {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [['Hacia arriba', 'Hacia abajo']],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }


            await ctx.reply("Ahora vamos a tratar de hacer un a operación utilizando el análisis técnico.")
            await ctx.reply("Mira el gráfico de nuestro par de TEA/CFF, ya he añadido una línea de tendencia al gráfico. ¿Cuál, creo que ya sabes) ¿Qué te parece, hacia dónde es más probable que vaya la cotización de activos?")
            // @ts-ignore
            await ctx.replyWithPhoto({ source: './src/assets/131.jpg' }, extra)
            ctx.wizard.next()
        }
    },

    // Строка 132
    async (ctx) => {
        if (ctx.update["message"]) {

            if (ctx.update["message"].text == 'Hacia arriba') {
                const message = "Tu análisis fue incorrecto. Lo más probable era que la cotización hubiera bajado, ya que se encontró con la línea de resistencia. ¡Pero puedes seguir practicando!"
                await ctx.reply(message)
            }

            if (ctx.update["message"].text == 'Hacia abajo') {
                const message = "Tienes toda la razón, la cotización ha llegado a la línea de resistencia, y lo más probable es que hubiera bajado. Toma tus 425 monedas. ¡Me gusta tu habilidad!"
                await add_coins(ctx.from, 455, false)
                await ctx.replyWithVideo({ source: './src/assets/higher.mp4' })
                await ctx.reply(message)
            }

            const extra = {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [['Seguro', 'Más tarde']],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }

            await ctx.replyWithPhoto({ source: './src/assets/133_134.jpg' })
            // @ts-ignore
            await ctx.reply("¿Vamos a seguir jugando?", extra)
            ctx.wizard.next()
        }
    },

    // Строка 138
    async (ctx) => {
        if (ctx.update["message"]) {

            if (ctx.update["message"].text == 'Jugar') {
                const message = "¡Entrenemos tu conocimiento del análisis técnico! Te mostraré los gráficos en el momento de la transacción, y tu eliges hacia dónde irá el precio."
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Hagamoslo']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                // @ts-ignore
                await ctx.reply(message, extra)
            }

            if (ctx.update["message"].text == 'Seguro' || (ctx.update['message'].text == 'Hagamoslo')) {
                const message = "Excelente! Mira otro gráfico. Ahora es sin líneas de tendencia. Trata de dibujar una línea visualmente y evaluar hacia dónde puede ir el precio del activo?"
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Hacia arriba', 'Hacia abajo']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                await ctx.reply(message)
                // @ts-ignore
                await ctx.replyWithPhoto({ source: './src/assets/139.jpeg' }, extra)
                ctx.wizard.selectStep(ctx.session.__scenes.cursor + 2)
                // await ctx.wizard.next()
            }

            // AgACAgIAAxkBAAIKbGLwZn96lKvNYrEG8jjpX9Gxl2k_AALhvzEb-yWAS_bHICEy4NbsAQADAgADcwADKQQ

            if (ctx.update["message"].text == 'Más tarde') {
                const message = "Bien. ¿Cuándo necesitas que te lo recuerden?"
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['Después de 1 hora'],
                            ['Después de 8 horas'],
                            ['Después de 12 horas'],
                            ['Después de 24 horas']
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
                // await ctx.wizard.selectStep(ctx.session.__scenes.cursor + 2)
            }

        }
    },

    async (ctx) => {
        if (ctx.update["message"]) {

            if (ctx.update["message"].text == "Después de 1 hora" || ctx.update["message"].text == "Después de 8 horas" || ctx.update["message"].text == "Después de 12 horas" || ctx.update["message"].text == "Después de 24 horas") {
                const message = 'Date prisa en volver al juego, es hora de ganar!';
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            [
                                'Jugar'
                            ]
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                await ctx.replyWithSticker("CAACAgIAAxkBAAINjGLw4FsIsWDIECUejo7RaAvreJElAAI-BAACP5XMCmXGbS9Z4RFmKQQ")
                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.selectStep(ctx.session.__scenes.cursor - 1)
            }
        }
    },

    async (ctx) => {
        if (ctx.update["message"]) {
            // console.log(ctx.message)
            const extra = {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [['¡Claro, vamos!', 'Más tarde']],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }

            if (ctx.update["message"].text == "Выше") {
                let message = `Desafortunadamente, esta es la respuesta incorrecta:( Aquí se puede ver que el precio ha alcanzado el nivel de resistencia, lo que significa que es más probable que baje. ¡No te desesperes, todavía tengo muchas tareas interesantes!`
                // @ts-ignore       
                await ctx.reply(message)
                await ctx.replyWithPhoto({ source: './src/assets/141-2.jpeg' })
                await ctx.replyWithSticker("CAACAgIAAxkBAAIPbWLw7QKCo0orkR8urtNwcJlXmR69AAJXBAACP5XMCj6R_XixcB-qKQQ")
                await ctx.reply(`¡Hiciste un gran trabajo! Y ya tienes mucha práctica que puedes transferir a trading real. Practica el análisis técnico en una cuenta demo y luego cambia a comercio real. ¿Recuerdas que por hacer el depósito, inmediatamente te cargo 10.000 monedas, y el premio principal te está garantizado! Haz clic en el botón en el menú de abajo, y luego envía tu correo para su verificación.`)

                // @ts-ignore
                await ctx.reply("¿Qué tal si practicamos el análisis fundamental ? ", extra)
                ctx.wizard.next()
            }

            if (ctx.update["message"].text == "Ниже") {
                let extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Забрать 455 IQ Coins']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                let message = `Tienes toda la razón, la cotización ha llegado a la línea de resistencia, y lo más probable era que hubiera bajado. Toma tus 425 monedas. ¡Me gusta tu habilidad!`
                await add_coins(ctx.from, 455, false)
                await ctx.replyWithPhoto({ source: './src/assets/141-2.jpeg' })
                await ctx.reply(message)
                // @ts-ignore
                await ctx.replyWithVideo({ source: './src/assets/higher.mp4' }, extra)
            }

            if (ctx.update["message"].text == "Забрать 455 IQ Coins") {
                await ctx.replyWithSticker("CAACAgIAAxkBAAIPbWLw7QKCo0orkR8urtNwcJlXmR69AAJXBAACP5XMCj6R_XixcB-qKQQ")
                await ctx.reply(`¡Hiciste un gran trabajo! Y ya tienes mucha práctica que puedes transferir a trading real. Practica el análisis técnico en una cuenta demo y luego cambia a comercio real. ¿Recuerdas que por hacer el depósito, inmediatamente te cargo 10.000 monedas, y el premio principal te está garantizado! Haz clic en el botón en el menú de abajo, y luego envía tu correo para su verificación.`)
                // @ts-ignore
                await ctx.reply("¿Qué tal si practicamos el análisis fundamental ? ", extra)
                ctx.wizard.next()
            }

        }
    },

    async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == "¡Claro, vamos!" || ctx.update["message"].text == "Играть") {
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Entendido, envíame las noticias']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                ctx.reply("¡Genial! Me encantan los juegos y me gusta que seas igual que yo, aunque seas una persona, no un bot.")
                // @ts-ignore
                ctx.reply("Te enviaré noticias que pueden afectar a nuestro par de TEA/CFF, y tu eliges hacia dónde irá la cotización. Pero recuerda que a veces las noticias pueden ser ambiguas, por ejemplo, puede afectar por igual a ambos productos en un par a la vez. En tales casos, puede ser difícil determinar la dirección del precio y es mejor abstenerse de hacer una operación.", extra)
                ctx.wizard.next()
            }
        }
    },

    async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == 'Entendido, envíame las noticias') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Hacia arriba', 'Hacia abajo'], ['No abrir posición']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                // @ts-ignore
                ctx.reply(`Noticia 1. "El científico Alexander Pimshtein hizo un descubrimiento increíble después de 5 años de investigación. En 5000 mujeres de prueba que bebieron 3 tazas de café al día, el proceso de envejecimiento se ralentizó 1,5 veces. Logró descubrir la increíble capacidad del café para rejuvenecer el cuerpo. Parece que incluso los amantes de los tés de todo el mundo están empezando a cambiar a café." ¿Hacia dónde crees que la cotización de nuestro activo TEA/CFF probablemente irá después de esta noticia? Elije una dirección y abra una posición por 500 IQ Coins.`, extra)
                ctx.wizard.next()
            }
        }
    },

    async (ctx) => {
        if (ctx.update["message"]) {

            const extra = {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [['Entendido, envíame la siguiente noticia']],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }

            let message: string
            if (ctx.update["message"].text == "Hacia arriba") {
                message = `Por desgracia, has elegido la dirección equivocada. Si nuestro activo fuera CFF/ TEA, es decir, el café sería el producto base, entonces la cotización de nuestro activo aumentaría, pero como el café es un producto cotizado en nuestro par, su valor aumentará en consecuencia en relación con el té, entonces la cotización de nuestro activo después de tales noticias es probable que se caera.`
                // await lose_coins(ctx.from, 500, false)
            }

            if (ctx.update["message"].text == 'Hacia abajo') {
                message = `¡Tienes toda la razón! Lo más probable es que, debido a la alta demanda de café, su precio aumentará, y ya que es un producto cotizado en nuestro par, la cotización de los activos probablemente volará hacia abajo después de esta noticia. Toma tus 465 IQ coins`
                await ctx.replyWithVideo({ source: './src/assets/higher.mp4' })
                await add_coins(ctx.from, 455, false)
            }

            if (ctx.update["message"].text == "Воздержаться от сделки") {
                message = `Lo más probable es que, debido a la alta demanda de café, su precio aumentará, y ya que es un producto cotizado en nuestro par, la cotización de los activos probablemente volará hacia abajo después de esta noticia. Pero si no estás seguro, es mejor no arriesgarte. ¡Me gusta su discreción!`
            }

            // await ctx.replyWithVideo({ source: './src/assets/higher.mp4' })
            // @ts-ignore
            await ctx.reply(message, extra)
            ctx.wizard.next()

        }
    },

    async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update['message'].text == "Entendido, envíame la siguiente noticia") {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Hacia arriba', 'Hacia abajo'], ['No abrir posición']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                let message = `Mira la noticia 2. "La estrella pop más popular Katty Candle organizó una gran ceremonia de té para su cumpleaños. Le dijo a sus invitados que el té es su bebida favorita, lo que la mantiene energizada, y que puede hacer tantos tours gracias a el. Parece que los fans de Katty Candle de todo el mundo ahora beberán solo té, olvidándose de la cola, el café y otras bebidas"¿Hacia dónde crees que es más probable que vaya nuestra cotización de activos de TEA/CFF después de esta noticia? Elije una dirección y abre una posición por 500 IQ Coins.`
                // @ts-ignore
                ctx.reply(message, extra)
                ctx.wizard.next()
            }
        }
    },

    async (ctx) => {
        if (ctx.update["message"]) {


            if (ctx.update['message'].text == "Hacia arriba") {
                let message = `"¡Tienes toda la razón! Aquí la situación ha cambiado en una dirección diferente. Dado que esta estrella de pop es una influencer que marca tendencias, su declaración puede afectar la demanda de té y, en consecuencia, su precio. Y dado que el té es un producto base en nuestro par, el crecimiento de su precio también afectará el crecimiento de la cotización de todo el activo de TEA/CFF. Es posible que hayas oído cómo Elon Musk ha influido repetidamente en el valor de la criptomoneda Dogecoin con sus tweets. Aquí en nuestro mundo del juego, una situación similar. Toma tus 425 IQ coins"`
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [["¡Genial, envía la siguiente noticia!"]],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                await add_coins(ctx.from, 455, false)
                await ctx.replyWithVideo({ source: './src/assets/higher.mp4' })
                // @ts-ignore
                await ctx.reply(message, extra)
            }

            if (ctx.update['message'].text == 'Hacia abajo') {
                let message = "Por desgracia, has elegido la dirección equivocada.El té es el activo base en nuestro par, y, en consecuencia, el aumento de la demanda de té afectará el crecimiento de su precio, y la cotización de activos TEA / CFF lo más probable es que crezca después de esta noticia."
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Entendí, quiero practicar más']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                await lose_coins(ctx.from, 500, false)
                await ctx.replyWithSticker("CAACAgIAAxkBAAIHUmMAAbQ52FmwwPuJE-bOVYMpqj_27QACPQQAAj-VzAq6TgWWNfDg2ykE")
                // @ts-ignore
                await ctx.reply(message, extra)
            }

            if (ctx.update['message'].text == "No abrir posición") {
                let message = `"El té es el activo base en nuestro par, y, en consecuencia, el aumento de la demanda de té afectará  el crecimiento de  precio, y la cotización de activos TEA/CFF lo más probable es que crezca después de esta noticia. Pero si no estás seguro, es mejor no arriesgarte. ¡Me gusta tu discreción!"`
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['¡Entendido, envíame la siguiente noticia!']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                // @ts-ignore
                await ctx.reply(message, extra)
            }

            ctx.wizard.next()
        }
    },

    async (ctx) => {
        const message = `¡Te felicito! Aprendes sobre la marcha. Entonces toma otra noticia. "Debido a la pandemia del virus Bovido, se esperan retrasos logísticos en todo el mundo. Esto afectará especialmente a los productos alimenticios: grano, aceite, té, café y otros."`
        const extra = {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [['Hacia arriba', 'Hacia abajo'], ['No abrir posición']],
                one_time_keyboard: true,
                resize_keyboard: true
            }
        }

        if (ctx.update["message"]) {
            // @ts-ignore
            ctx.reply(message, extra)
            ctx.wizard.next()
        }

    },

    async (ctx) => {
        if (ctx.update["message"]) {


            if (ctx.update['message'].text == "Hacia arriba") {
                let message = `Esta noticia es ambigua y no está claro cómo podría afectar el movimiento de la cotización de nuestro par. Esta operación resultó ser arriesgada.`
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Entendido']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                // @ts-ignore
                await ctx.reply(message, extra)
            }

            if (ctx.update['message'].text == 'Hacia abajo') {
                let message = "Esta noticia es ambigua y no está claro cómo podría afectar el movimiento de la cotización de nuestro par.Esta operación resultó ser arriesgada."
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Entendido']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                // @ts-ignore
                await ctx.reply(message, extra)
            }

            if (ctx.update['message'].text == "No abrir posición") {
                let message = `¡Tenías razón! Esta noticia es ambigua y no está claro cómo podría afectar el movimiento de la cotización de nuestro par.`
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Entendido']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                // @ts-ignore
                await ctx.reply(message, extra)
            }

            ctx.wizard.next()
        }
    },

    async (ctx) => {
        if (ctx.update["message"]) {
            const message = "Lo hiciste genial! Estoy empezando a dudar de que eres definitivamente un ser humano, no un bot? Aunque, si eres un bot, envíame un mensaje después del juego, ¿de acuerdo?"
            const message2 = "¡Ay! Hablemos sobre lo más importante para un trader. Sobre el resultado financiero. Y cómo retirarlo de la plataforma cuando es positivo."
            const extra = {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [['Es realmente interesante']],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }
            const sticker = "CAACAgIAAxkBAAIHUGMAAbQCd6Skju0odY_N5RgPg3yVlgACXAQAAj-VzApRofnwhTO6ASkE"
            await ctx.reply(message)
            if (sticker) {
                await ctx.replyWithSticker(sticker)
            }
            // @ts-ignore
            await ctx.reply(message2, extra)
            ctx.wizard.next()
        }
    },

    async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == 'Это очень интересно') {
                const message = "Cuando ganas dinero en una cuenta real, puedes retirar tus ganancias. Pero antes de retirar fondos, hay un paso importante."
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['¿Cual paso?']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                const sticker = null
                if (sticker) {
                    await ctx.replyWithSticker(sticker)
                }
                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }
        }
    },

    async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == '¿Cual paso?') {
                const message = "¡Compartir las ganancias conmigo, por supuesto!"
                const message2 = "¡Bromeando! Acabo de imaginar cómo abriste la boca por sorpresa. De hecho, un paso importante es verificar tu cuenta o verificar tu identidad."
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['¿Por qué es necesaria la verificación?']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                const sticker = "CAACAgIAAxkBAAIHTmMAAbPqrbWQAAGQUdQ925SlS3fE0f4AAjQEAAI_lcwKIspAoTBLsuopBA"
                await ctx.reply(message)
                if (sticker) {
                    await ctx.replyWithSticker(sticker)
                }
                // @ts-ignore
                await ctx.reply(message2, extra)
                ctx.wizard.next()
            }
        }
    },

    async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == '¿Por qué es necesaria la verificación?') {
                const message = "Este es un requisito de las normas y reguladores internacionales. Es decir, los órganos que controlan el trabajo de todos los brokers, incluida la IQ Option. La verificación ayuda a confirmar tu identidad y proteger tus intereses financieros en caso de disputas, asegurar tu cuenta, y también evitar que las personas que no pueden hacer trading en los mercados financieros, como los menores de edad, lo hagan. Para la verificación, es necesario proporcionar documentos que confirmen la identidad. Pero no te preocupes, el broker almacena estos datos de forma segura y no transfiere información a terceros."
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Хорошо, я спокоен']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }
        }
    },

    async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == 'Ok, estoy tranquilo') {
                const message = "Genial. Si ya has hecho un depósito, te recomiendo que hagas la verificación para no posponer las cosas. Después de todo, tarda de 1 a 3 días hábiles. Por cierto, mira este video útil sobre cómo ser verificado. <a href='https://vimeo.com/channels/1002556/331181006'>.</a>"
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Entonces, ¿cómo retirar dinero?']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                // await ctx.replyWithVideo({ source: './src/assets/last.mp4' })
                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }
        }
    },

    async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == 'Entonces, ¿cómo retirar dinero?') {
                const message = "Si hiciste el deposito a tu cuenta con una tarjeta bancaria, entonces el retiro de la cantidad inicial del depósito debe hacerse a la misma tarjeta, y la cantidad restante se puede retirar de cualquier otra manera. Por ejemplo, hiciste un depósito de $100 de una tarjeta bancaria y ganaste $50 de trading, lo que significa que necesitas retirar $100 a la misma tarjeta, y el dinero ganado de cualquier otra manera."
                const message2 = "El monto mínimo disponible para el retiro es de tan solo $2 (dependiendo del método de depósito), el máximo es de $1,000,000. Por cierto, los traders de IQ Option retiran más de $2,000,000 a sus cuentas cada mes!"
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['¡Vaya, sí que es genial!']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                await ctx.reply(message)

                const sticker = "CAACAgIAAxkBAAIHTGMAAbO43uyvSB9-30zjLEpCga3pKwACTwQAAj-VzArpOg_MthLpGikE"

                if (sticker) {
                    await ctx.replyWithSticker(sticker)
                }

                // @ts-ignore
                await ctx.reply(message2, extra)
                ctx.wizard.next()
            }
        }
    },

    async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == '¡Vaya, sí que es genial!') {
                const message = "¡Eres muy bueno! Me gustas cada vez más. Completaste el juego brillantemente, dominaste las habilidades básicas de trading y ganaste muchas IQ coins. Vamos a ver rápidamente lo que se puede comprar con las monedas que ganaste"
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Hagamoslo']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const sticker = "CAACAgIAAxkBAAIHRmMAAUmpv50GE1nXerYteTIUJvdsLwACNQQAAj-VzAo8IRZc9lRTiSkE"
                if (sticker) {
                    await ctx.replyWithSticker(sticker)
                }

                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }
        }
    },

    async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == 'Hagamoslo') {
                const message = `Participación en el sorteo de $1000 a una cuenta real en la IQ Option - 22000 coins. Consulta con un gestor de cuenta 20000 IQ coins (despues de haber depositado  al menos $1000) \nEstrategia 1 para el trading 3000 IQ coins  \nEstrategia 2 para el trading 3000 IQ coins  \nEstrategia 3 para el trading  3000 IQ coins`
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Cool!']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }
        }
    },

    async (ctx) => {
        if (ctx.update['message'].text == 'Cool!') {

            let user = await getUser(ctx.from)

            if (user) {
                if (user.balance) {
                    if (user.balance < 22000) {
                        await ctx.reply('Desafortunadamente, no tienes suficientes monedas para el trofeo principal, pero no importa, puedes ganar 10.000 monedas con solo hacer un depósito. Haz clic en el botón de abajo y luego envía tu correo electrónico para su verificación. Te daré 10.000 monedas.')
                    } else {
                        await ctx.reply(`Si más - Ve al menú, haz clic en "Trofeos valiosos" y el cambia IQ Coins ganadas  por valiosos premios! ¡Eres increible, pasaste todas las pruebas perfectamente y completaste todas las tareas!`)
                    }
                } else {
                    await ctx.reply('Desafortunadamente, no tienes suficientes monedas para el trofeo principal, pero no importa, puedes ganar 10.000 monedas con solo hacer un depósito. Haz clic en el botón de abajo y luego envía tu correo electrónico para su verificación. Te daré 10.000 monedas.')
                }
            }
        }
    }

)

game.enter(async (ctx) => {

    const message = "Prueba una tarea simple, mira el gráfico, ¿qué línea ves? Como siempre, por la respuesta correcta, te están esperando 500"
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            keyboard: [['Línea de soporte', 'Línea de resistencia']],
            one_time_keyboard: true,
            resize_keyboard: true
        }
    }

    await ctx.replyWithPhoto({ source: './src/assets/126.jpg' })
    // @ts-ignore
    await ctx.reply(message, extra)
    ctx.wizard.selectStep(1)
})
game.hears('/start', async (ctx) => ctx.scene.enter("home"))
game.hears('/register', async (ctx) => ctx.scene.enter("registration"))
game.command("/trophies", async (ctx) => ctx.scene.enter("trophies"))

export default game