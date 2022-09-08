import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../Model/Model";
require("dotenv").config()
import * as EmailValidator from 'email-validator';
import { addDeposit, addEmail, add_coins, lose_coins, getEmail, } from "../../Controller/UserController";
import EmailCheck from "./Components/EmailCheck";
import RegistrationGreeting from "./Components/RegistrationGreeting";

const handler = new Composer<MyContext>();

const registration = new Scenes.WizardScene(
    "registration",
    handler,
    // Обучение: О устройстве валютной пары. О двух видах анализа. О риске на сделку.
    (async (ctx) => {
        if (ctx.update["message"]) {


            if (ctx.update["message"].text == "¡Gracias!") {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['¡Cool!']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = `Quiero contarte un poco más de teoría para que puedas entender cómo funcionan las opciones binarias. Y este conocimiento en el futuro agregará claridad sobre cómo elegir la dirección correcta de la cotización y ganar.`

                // @ts-ignore
                await ctx.reply(message, extra)

            }

            if (ctx.update["message"].text == "¡Cool!") {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Más detalles?']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = 'Hay diferentes tipos de opciones binarias en la plataforma IQ Option: por pares de divisas, por acciones, por materias primas, por índices. Las opciones binarias más populares entre los traders son los pares de divisas, y el par de divisas o activo más popular en el mundo es el EUR/ USD.'

                // @ts-ignore
                await ctx.reply(message, extra)

            }


            if (ctx.update["message"].text == "Más detalles?") {
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['¡Esta claro!', 'Es difícil...']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = `Un par de divisas es la relación de los precios de dos monedas. Al comprar una moneda, se vende otra. Por ejemplo: \nEUR/USD \nEUR es la moneda base, USD es la moneda de cotización. El movimiento del gráfico se produce debido a un cambio en la relación de la moneda base y la cotizada, y el valor que afecta el movimiento del gráfico se llama la cotización.\n\nPar de divisas significa que por USD - dólar estadounidense, compramos EUR - euro.`

                await ctx.replyWithSticker("CAACAgIAAxkBAAIK6GLwmMzjKT42FwVxott3Uvff8tQ8AAJRBAACP5XMCuERUT38lNp6KQQ")
                // @ts-ignore
                await ctx.reply(message, extra)

            }

            if (ctx.update["message"].text == "¡Esta claro!") {
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Bueno, vamos a jugar ya!']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = `Genial, entonces será fácil para ti completar el juego, también tendrá su propio par, ¿qué tal té y café? Llamémoslo TEA/CFF. Me gusta el nombre de nuestro par de juego, ¡todo es real!`

                // @ts-ignore
                await ctx.reply(message, extra)

            }

            if (ctx.update["message"].text == "Es difícil...") {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Bueno, vamos a jugar ya!']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = `No te preocupes, puedes entender mejor cómo funciona todo en mi juego, también tendrá su propio par, ¿qué tal té y café? Llamémoslo TEA/CFF. Me gusta el nombre de nuestro par de juego, ¡todo es real!`

                // @ts-ignore
                await ctx.reply(message, extra)

            }

            if (ctx.update["message"].text == "Bueno, vamos a jugar ya!") {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Quiero saber']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = `Recientemente abriste tu primera posición, pero elegiste la dirección sin ningún conocimiento. En este caso, tu resultado es casualidad, y casualidad es 50/50. Entonces, ¿cómo aumentar tus posibilidades de obtener una ganancia?`

                // @ts-ignore
                await ctx.reply(message, extra)

            }

            if (ctx.update["message"].text == "Quiero saber") {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['He oído hablar de él', 'No sé nada al respecto']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = `¡Estoy muy contenta con tu curiosidad y te lo contaré todo! Hay dos tipos de análisis que ayudan a la mayoría de los traders a decidir sobre la dirección del movimiento de un activo - técnico y fundamental.`

                // @ts-ignore
                await ctx.reply(message, extra)

            }

            if (ctx.update["message"].text == "He oído hablar de él") {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['¿Qué tal un ejemplo?']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = `¡Entonces será más fácil para ti! El análisis técnico es un análisis del precio de un activo, que está representado por un gráfico de su cambio en el tiempo. El análisis fundamental es un análisis de la situación de mercado/economía/política que afecta a un activo.`

                // @ts-ignore
                await ctx.reply(message, extra)

            }

            if (ctx.update["message"].text == "No sé nada al respecto") {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['¿Qué tal un ejemplo?']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = `¡Entonces te contaré! El análisis técnico es un análisis del precio de un activo, que está representado por un gráfico de su cambio en el tiempo. El análisis fundamental es un análisis de la situación de mercado/economía/política que afecta a un activo.`

                // @ts-ignore
                await ctx.reply(message, extra)

            }

            if (ctx.update["message"].text == "¿Qué tal un ejemplo?") {

                const message = `¡Por supuesto! Echemos un vistazo más de cerca al análisis técnico. Como he dicho, este es un análisis del precio de un activo, que está representado por un gráfico. El gráfico se puede mostrar como una línea o como una vela. Para el análisis, los gráficos de velas se utilizan con mayor frecuencia. Por cierto, en la plataforma se puede cambiar la visualización del gráfico en cualquier momento de lineal al de velas y viceversa. ¡Vamos a intentarlo ahora mismo! Inicia sesión en la plataforma y cambia el horario como se muestra en la imagen. Y luego sube una captura de pantalla con un horario modificado, y gana otras 500 monedas IQ coins. ¡Recuerda que al final del juego puedes intercambiar monedas de juego por premios reales!`
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Subir captura de pantalla']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                await ctx.reply(message)
                // @ts-ignore
                await ctx.replyWithPhoto({ source: "./src/assets/66-74.jpeg.jpg" }, extra)
                ctx.wizard.next()

            }

        }
    }),

    // Ожидаем загрузки скриншота
    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].photo) {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['¡Gracias!']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = '¡Qué hermoso gráfico de velas! Toma otras 500  IQ coins'
                await add_coins(ctx.from, 500, false)
                await ctx.replyWithSticker("CAACAgIAAxkBAAIK7GLwmPeBoVq6Bwc1mbdg7Vvg6caBAAJGBAACP5XMCstXCFgVL57DKQQ")
                // @ts-ignore
                await ctx.reply(message, extra)

                ctx.wizard.next()
            } else {
                await ctx.reply("No, no, eso no funcionará.")
                await ctx.reply("Sube una captura de pantalla del gráfico modificado")
            }
        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == '¡Gracias!') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['¿Qué sigue?']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = 'Y ahora te diré qué información pueden darte las velas japonesas, sí, sí, así es como se llaman. Ve este video y regresa:'

                await ctx.replyWithVideo({ source: "./src/assets/3.mp4" })
                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }
        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == '¿Qué sigue?') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Ya lo vi, ¡quiero ver en la práctica cómo funciona!']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = '¡Vas muy rápido! El método más popular de análisis técnico es el trading de tendencias. Para hacerlo, necesitas saber qué es una tendencia, una línea de resistencia, una línea de soporte y una ruptura. He preparado un video detallado para ti aquí:'
                await ctx.replyWithVideo({ source: "./src/assets/4.mp4" })
                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }
        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == 'Ya lo vi, ¡quiero ver en la práctica cómo funciona!') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Exactamente']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = '¡Por supuesto! Después de todo, esto es exactamente por qué estás jugando este juego. Bien, es hora de nuestro par de TEA/CFF. Mira este gráfico y la línea de soporte que ya conoces, ¿hacia dónde crees que irá el gráfico? Pero espera, recuerda que debes elegir el tiempo de expiración (después de qué tiempo se cerrará la toperación con el resultado previsto) y la cantidad por la que desea realizar la operación.'

                // @ts-ignore
                await ctx.reply(message, extra)
                await ctx.replyWithPhoto({ source: '66-74.jpeg' })
                ctx.wizard.next()
            }
        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == 'Exactamente') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['¿Por qué no más del 5%']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = 'Nos ponemos de acuerdo en que en el juego vamos a hacer un trading con un tiempo mínimo de 1 minuto, y tu cantidad por operación será no más de 5% de total de tu cuenta.'

                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }
        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == '¿Por qué no más del 5%') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Claro que voy a echar un vistazo']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = 'Gran pregunta! Me encanta tu curiosidad! Hay un concepto de gestión de riesgos en el trading. Se trata de un conjunto de normas que ayudan a preservar y aumentar el capital del trader. Uno de los conceptos de gestión de riesgos es el riesgo por operación. El riesgo por operación es el riesgo máximo en % de tu depósito por operación. Típicamente, cuando hacen trading con opciones binarias, los traders arriesgan el 1-5% de su capital. Esta es solo una pequeña parte de la información sobre la gestión de riesgos, pero he preparado material para que lo lees. Prométeme que definitivamente lo estudiarás.'

                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }
        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == 'Claro que voy a echar un vistazo') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Vamos, no puedo esperar']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = 'No me engañarás, ¿verdad? Aunque soy un bot, también soy una chica, y con mi IA entiendo que puedes lograr excelentes resultados aplicando el conocimiento ganado en este juego! Volvamos rápidamente al gráfico y a nuestra primera operación.'

                await ctx.replyWithSticker("CAACAgIAAxkBAAIHRmMAAUmpv50GE1nXerYteTIUJvdsLwACNQQAAj-VzAo8IRZc9lRTiSkE")
                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }
        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == 'Vamos, no puedo esperar') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Hacia arriba', 'Hacia abajo']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = 'Así que, aquí está el gráfico de nuestro par de TEA/CFF, incluso dibujé una línea de SOPORTE para ti. ¿Haciadónde crees que irá el gráfico después de 1 minuto? Prueba a apostar 500 IQ coins en subida o bajada de TEA/CFF'

                // @ts-ignore
                await ctx.reply(message, extra)
                await ctx.replyWithPhoto({ source: '76-78.jpeg' })
                ctx.wizard.next()
            }
        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == 'Hacia arriba') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Toma 455 IQ Coins']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                await add_coins(ctx.from, 500, true)
                const message = '¡Felicidades! Tu mismo elijiste la dirección correcta y ganaste el primer dinero en opciones binarias. Sí, es virtual, pero puedes transferir tus conocimientos a operaciones reales y una cuenta real. ¿Sabes por qué hiciste dinero? Porque usaste lo que aprendiste. Ahora tienes la primera estrategia de trading en tu arsenal - Trading por la tendencia.'


                await ctx.reply(message)
                // await ctx.replyWithPhoto({ source: '76-78.jpeg' })
                // @ts-ignore
                await ctx.replyWithVideo({ source: "./src/assets/higher.mp4" }, extra)

                ctx.wizard.next()
            }

            if (ctx.update["message"].text == 'Hacia abajo') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Vamos a seguir practicando']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = 'Lo más probable es que el gráfico suba porque tocó la línea de soporte. Tu predicción era incorrecta. En tu cuenta XXX. Ves lo genial que es que tu posición se abrió para no más del 5% de la cuenta. Perdiste bastante y estas son solo operaciones virtuales. Pero has ganado experiencia. No te preocupes, seguiremos practicando.'
                await lose_coins(ctx.from, 500, false)
                // @ts-ignore
                await ctx.reply(message, extra)
                await ctx.replyWithPhoto({ source: '76-78.jpeg' })
                ctx.wizard.next()
            }
        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text) {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['¿Cómo se hace esto?']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = '¿Qué tal si abrimos una operación utilizando el conocimiento de la tendencia en una cuenta de demostración?'

                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }
        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == '¿Cómo se hace esto?') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Lo intentaré ahora', 'No recuerdo cómo hacerlo']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = '¡No te preocupes, te ayudaré! Abramos el familiar par EUR/USD. Si ves un gráfico de líneas, cámbialo por un gráfico de velas. A continuación, puedes cambiar el tiempo de una vela, digamos 1 minuto. y un marco de tiempo, digamos 30 minutos, para encontrar una tendencia y una línea de resistencia o apoyo.'

                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }
        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == 'Lo tengo, lo probaré ahora' || ctx.update["message"].text == 'Lo intentaré ahora') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Sube captura de pantalla']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = '¡Genial! Ahora, usando la herramienta de rayos, dibuja una línea de resistencia o soporte en el gráfico. ¿Cuando lo hagas sube una captura de pantalla y te daré otras 500 IQ coins'

                await ctx.replyWithPhoto({ source: "./src/assets/84.jpeg" })
                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }

            if (ctx.update["message"].text == 'No recuerdo cómo hacerlo') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Lo tengo, lo probaré ahora']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = 'Ve el video sobre las velas de nuevo:'

                await ctx.replyWithVideo({ source: "./src/assets/5.mp4" })
                // @ts-ignore
                await ctx.reply(message, extra)
            }

        }
    }),

    // Ожидаем загрузки скриншота
    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].photo) {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['¡He ganado!', 'He perdido']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = 'Toma otras 500 IQCoins, ¡vas genial!'

                await add_coins(ctx.from, 500, false)
                // @ts-ignore
                await ctx.reply(message, extra)
                await ctx.reply("¡Genial! Eres un aprende rápido. Ahora vamos a tratar de abrir una operación en una cuenta demo en la plataforma, basado en la información que recibiste. Elije activo: EUR/USD \nElije la cantidad: $100 \nElije el tiempo de expiración: 5 min \nElije hacia arriba o hacia abajo.Vuelve cuando lo tengas")
                ctx.wizard.next()
            } else {
                await ctx.reply("Sube captura de pantalla")
            }
        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {

            if (ctx.update["message"].text == '¡He ganado!') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Recargar el depósito', 'Seguiré practicando']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = '¡Guau! ¡Eres muy pila! Pudiste hacer el dinero en una cuenta de demostración, y de hecho funciona de la misma manera que el trading real. No puedes retirar dinero de una cuenta demo. Pero si transfieres el conocimiento adquirido a una cuenta real, serás capaz de hacer trading con dinero real y de retirarlo. Sugiero no dudar y reponer el depósito. Por cierto, por reponer el depósito, voy a depositarte de inmediato 10.000 IQ coins, lo que significa que puedes elegir el premio más caro en el juego! Y por cierto, obtén 500 por hacer unaoperación en una cuenta de demostración;)'

                await add_coins(ctx.from, 500, false)
                await ctx.replyWithSticker("CAACAgIAAxkBAAINiGLw3mZJj-9vT1F9_KRyVN_hw454AAJDBAACP5XMCrPB96QaJA_TKQQ")
                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }

            if (ctx.update["message"].text == 'He perdido') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Ver vídeo de tendencia', 'Jugar siguiente']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = '¡No te preocupes, apenas estás aprendiendo! Recuerda, no hay ninguna estrategia que daría resultados del 100%. A veces puede haber una ruptura de la línea de resistencia o de apoyo, la tendencia puede cambiar. A continuación, explicaré por qué esto podría estar sucediendo. Entrena más y obtendrás mejores resultados. Y por cierto, toma 500 por hacer unaoperación en una cuenta demo.'
                await ctx.replyWithSticker("CAACAgIAAxkBAAINjGLw4FsIsWDIECUejo7RaAvreJElAAI-BAACP5XMCmXGbS9Z4RFmKQQ")
                await add_coins(ctx.from, 500, false)
                // @ts-ignore
                await ctx.reply(message, extra)
            }

            if (ctx.update["message"].text == 'Ver vídeo de tendencia') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Я заработал!', 'Я потерял :(']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = 'Ver el video de nuevo, y luego puedes practicar en una cuenta de demostración'
                await ctx.replyWithVideo({ source: "./src/assets/50.mp4" })
                // @ts-ignore
                await ctx.reply(message, extra)
            }

            if (ctx.update["message"].text == 'Jugar siguiente') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            [
                                '¿Cómo puedes ganar dinero con él?'
                            ]
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = '¡Bien! ¡Tienes un enfoque sólido y con razón! Cuanto más práctica, mejor es el resultado'

                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.selectStep(ctx.session.__scenes.cursor + 2)
            }

        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {

            if (ctx.update["message"].text == 'Recargar el depósito') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Listo',
                                    callback_data: 'send_to_check'
                                }
                            ]
                        ]
                    }
                }

                const message = 'No estás perdiendo tu tiempo. Ve este video para obtener más detalles sobre cómo financiar tu cuenta. Tan pronto como repongas el depósito, regresa e ingresa tu correo electrónico que utilizaste durante lainscripción. Voy a comprobar todo y te daré 10000 IQ Coins'

                await ctx.replyWithVideo({ source: './src/assets/1.mp4' })
                // @ts-ignore
                await ctx.reply(message, extra)
            }   

            if (ctx.update["message"].text == 'Играть дальше' || (ctx.update['message'].text == 'Seguiré practicando')) {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            [
                                '¿Cómo puedes ganar dinero con él?'
                            ]
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = '¡Genial! Vamos a continuar.Y así ahora sabes que puedes utilizar el análisis técnico y la más popular estrategia de trading de tendencia para tomar decisiones sobre dónde irá el precio.Ahora veamos cómo puedes aplicar el Análisis Fundamental en el trading.El análisis fundamental es un análisis basado en noticias y datos.'

                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }

        }

        if (ctx.update["callback_query"]) {

            if (ctx.update["callback_query"].data == 'send_to_check') {

                // запись заявки депозита
                let update = ctx.from
                // @ts-ignore
                update.email = await getEmail(ctx.from)
                await addDeposit(update)

                ctx.answerCbQuery()
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Comprobar estado',
                                    callback_data: 'check_deposit'
                                }
                            ]
                        ]
                    }
                }

                const message = 'No estás perdiendo tu tiempo. Ve este video para obtener más detalles sobre cómo financiar tu cuenta. Tan pronto como repongas el depósito, regresa e ingresa tu correo electrónico que utilizaste durante lainscripción. Voy a comprobar todo y te daré 10000 IQ Coins'
                // const message = 'Уже сособираюсь на встречу в платформой, чтобы проверить твой депозит. Мне потребуется время. Знаешь, платформа такая занятая, я постоянно жду не дождусь, чтобы пообщаться. Но трейдеры для нее на первом месте. Иногда я ревную...Но как только мы встретимся, я вернусь с твоими IQ Coins'

                // await ctx.replyWithSticker("CAACAgIAAxkBAAINkGLw4KY1njQpI5sm8nt94oewD_3-AAJlBAACP5XMClzVsXn7vWCCKQQ")
                // @ts-ignore
                await ctx.editMessageText(message, extra)
                // await ctx.replyWithVideo({ source: './src/assets/1.mp4' })
                // ctx.wizard.next()
            }

            if (ctx.update["callback_query"].data == 'check_deposit') {
                ctx.answerCbQuery()

                const message = '¡Recibido! Ya voy a una reunión en la plataforma para comprobar tu depósito. Necesitaré tiempo. Ya sabes, la plataforma está tan ocupada, no puedo esperar para charlar. Pero los traders son mas importantes para ella. A veces me pongo celosa... Pero tan pronto como nos encontremos, estaré de vuelta con tus IQ Coins'
                await ctx.replyWithSticker("CAACAgIAAxkBAAINkGLw4KY1njQpI5sm8nt94oewD_3-AAJlBAACP5XMClzVsXn7vWCCKQQ")
                // @ts-ignore
                await ctx.editMessageText(message)
                // ctx.wizard.next()
            }

        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == "¿Cómo puedes ganar dinero con él?") {
                const message = "¡Genial! Vamos a continuar. Y así ahora sabes que puedes utilizar el análisis técnico y la más popular estrategia de trading de tendencia para tomar decisiones sobre dónde irá el precio. Ahora veamos cómo puedes aplicar el Análisis Fundamental en el trading. El análisis fundamental es un análisis basado en noticias y datos."
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            [
                                'Seguro'
                            ]
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                // @ts-ignore
                await ctx.reply(message, extra)
            }

            if (ctx.update["message"].text == "Seguro") {
                const message = `Imaginemos que hay noticias sobre nuestro par TEA/CFF. Noticias de última hora. El proveedor más grande de China informa la siembra más grande de té este año, almacenes de té 75% llenos"`
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            [
                                '¿Y cómo afectará esto el valor del par?'
                            ]
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                // @ts-ignore
                await ctx.reply(message, extra)
            }

            if (ctx.update["message"].text == "¿Y cómo afectará esto el valor del par?") {
                const message = `Vamos a verlo. Asi que TEA en nuestro par es el producto subyacente, lo que significa que el valor del activo es directamente proporcional al valor del producto subyacente. Si el precio del té sube, entonces todo el activo sube; si el precio del té cae, entonces todo el activo cae. Las noticias dicen que hay un exceso de té en el mercado, e incluso los almacenes están casi llenos. Cuando algo está en exceso, el costo del producto caerá para compensar el sesgo. Volvamos a nuestra primeraoperación de TEA/CFF. Así se veía el gráfico. Ahora imaginemos que en el momento de elegir la dirección, salieron las mismas noticias. Vamos a abrir una posición en 500 IQ Coins y elegir una dirección.`
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            [
                                'Hacia arriba', 'Hacia abajo'
                            ]
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                await ctx.replyWithSticker("CAACAgIAAxkBAAIHY2MB3kwxaemAXPw2d7NA1oo35CA8AAJRBAACP5XMCuERUT38lNp6KQQ")
                await ctx.replyWithPhoto({ source: './src/assets/66-74.jpeg' })
                // @ts-ignore
                await ctx.reply(message, extra)
            }


            if (ctx.update["message"].text == "Hacia arriba") {
                const message = `¡Estabas cerca! Pero por desgracia elegíste la dirección equivocada. Sí, basado en el análisis técnico, con una alta probabilidad, la cotización de nuestro par debería haber rebotado de la línea de soporte y aumentado. Pero en el momento de la transacción, salieron noticias que indicaban que había un exceso de té (nuestro producto base) en el mercado, y, en consecuencia, la cotización de nuestro par se derrumbó. Hubo una ruptura en la línea de resistencia. Has perdido 500 IQcoin, pero no te preocupes, puedes recuperar tus pérdidas en las siguientes etapas del juego.`
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            [
                                'Bien'
                            ]
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                await ctx.replyWithSticker("CAACAgIAAxkBAAINlGLw4S3GrisSBakjyi6pw7kHEvpyAAJTBAACP5XMCpUsffVEA7pxKQQ")
                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }

            if (ctx.update["message"].text == "Hacia abajo") {
                const message = `¡Esta es la dirección correcta! Reclama tus 455 IQ Coins. Sí, la cotización de nuestro par se acercó a la línea de soporte, y basado en el análisis técnico, con una alta probabilidad debería haber rebotado de la línea de soporte y haber ido más alto. Sin embargo, en ese momento, salieron noticias que indicaban que había un exceso de té (nuestra materia prima base) en el mercado, y, en consecuencia, la cotización de nuestro par se derrumbó. Hubo una ruptura de la línea de resistencia.`
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            [
                                '¡Cool!'
                            ]
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                await ctx.replyWithVideo({ source: './src/assets/higher.mp4' })
                await ctx.replyWithSticker("CAACAgIAAxkBAAINlWLw4TfLvzsDawccQvPswpOo0xO7AAJGBAACP5XMCstXCFgVL57DKQQ")
                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }
        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {
            const message = "Ahora sabes que ambos tipos de análisis - tanto técnico como fundamental - pueden ser muy útiles en tu trading. ¿Qué tal una prueba pequeña y una oportunidad para ganar monedas IQ extra?"
            const extra = {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [
                        [
                            '¡Quiero ganar!', 'Más tarde'
                        ]
                    ],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }
            // @ts-ignore
            await ctx.reply(message, extra)
            ctx.wizard.next()
        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == "¡Quiero ganar!") {
                const message = "¡Me encanta tu entusiasmo!"
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
                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.wizard.next()
            }

            if (ctx.update["message"].text == "Más tarde") {
                const message = "Vale, te recuerdo que continúes. ¿Cuándo necesitas que te lo recuerde?"
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
            }
        }
    }),

    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"].text == "Jugar") {
                await ctx.scene.enter("game")
            }

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
                // @ts-ignore
                await ctx.reply(message, extra)
                await ctx.scene.enter("game")
            }

        }
    }),

);

registration.leave(async (ctx) => console.log("registration scene leave"))
registration.hears("/start", async (ctx) => ctx.scene.enter("home"))

// @ts-ignore
// registration.enter(async (ctx) => ctx.wizard.next())



handler.on("message", async (ctx) => {
    if (ctx.update["message"]) {
        console.log(ctx)

        const extra = {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [['¡Gracias!']],
                one_time_keyboard: true,
                resize_keyboard: true
            }
        }

        // win first deal
        // @ts-ignore
        if (ctx.update["message"].text == "¡He ganado!") {
            await add_coins(ctx.from, 500, false)

            const message = "¡Felicidades, tu primera operación exitosa que te trajo beneficio virtual! Sin embargo, recuerda que ahora solo tuviste suerte. El trading no es un casino o apuestas, es principalmente una actividad financiera basada en el conocimiento. Es el conocimiento que te voy a dar en el juego que te ayudará a analizar el movimiento de la grafica y elegir la dirección correcta. Y ahora toma otras 500 monedas IQ coins por completar la tarea y hacer la primera operación."
            // @ts-ignore
            await ctx.reply(message, extra)
            await ctx.replyWithSticker("CAACAgIAAxkBAAIK4GLwmG_f9q6hNqLRAX_mNYI_NMopAAJVBAACP5XMCi-iLW04pRSXKQQ")
            ctx.wizard.next()
        }
        // @ts-ignore
        if (ctx.update["message"].text == "He perdido") {
            await add_coins(ctx.from, 500, false)
            const message = "Sucede, es porque el trading no es un casino o apuestas, es principalmente una actividad financiera basada en el conocimiento. Muchas personas pierden en el trading porque abren posiciones sin analizar la situación, gráficas, sin tener en cuenta la información - sin conocimiento. Es el conocimiento que te voy a dar en el juego que te ayudará a analizar el movimiento de la gráfica y elegir la dirección correcta. Y ahora toma otras 500 IQ coins por completar la tarea y hacer la primera operación."
            // @ts-ignore
            await ctx.reply(message, extra)
            await ctx.replyWithSticker("CAACAgIAAxkBAAIK5GLwmKEuwfKrr95QderXWhJeSDjOAAJSBAACP5XMCk0qTC6hfBCAKQQ")
            ctx.wizard.next()
        }
    }
})

handler.action("exit", async (ctx) => await RegistrationGreeting(ctx))
registration.command("/start", async (ctx) => ctx.scene.enter("home"))
registration.command("/trophies", async (ctx) => ctx.scene.enter("trophies"))


export default registration