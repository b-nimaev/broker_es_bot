import { Composer, Scenes } from "telegraf";
import { addEmail, add_coins, getInterface } from "../../Controller/UserController";
import * as EmailValidator from 'email-validator';
import { MyContext } from "../../Model/Model";
import { greeting } from "./HomeGreeting";
require("dotenv").config();

const handler = new Composer<MyContext>(); // function
const emailHandler = new Composer<MyContext>(); // function
const home = new Scenes.WizardScene(
    "home",
    handler,
    (async (ctx) => {
        console.log(ctx.wizard.step)
        if (ctx.update["message"]) {

            // @ts-ignore
            if (ctx.update["message"].text) {
                if (ctx.update['message'].text == "/back") {

                    ctx.wizard.selectStep(0)
                    ctx.answerCbQuery()
                    const extra = {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Inscribirse',
                                        callback_data: 'register',
                                        // url: 'https://iqoption.com/ru'
                                    },
                                    {
                                        text: 'Ya estoy inscrito',
                                        callback_data: 'auth'
                                    }
                                ]
                            ]
                        }
                    }

                    const message = `Para recibirlos, solo tienes que registrarte en la IQ Option. Necesitas un mínimo de datos - tu nombre y dirección de correo electrónico, sin datos de pago y enlaces de tarjetas. Al registrarte, recibirás $10,000 a tu cuenta de demostración, en la que puedes operar en la plataforma, entrenar. Más bien, sigue el enlace de abajo, registrate, y luego vuelva aquí y te daré 10.000 IQCoins.`

                    // @ts-ignore
                    return await ctx.reply(message, extra)
                } else if (EmailValidator.validate(ctx.update["message"].text)) {
                    await addEmail(ctx.from, ctx.update["message"].text)
                    const extra = {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Si, continuamos',
                                        callback_data: 'next',
                                    },
                                    {
                                        text: 'Сambio',
                                        callback_data: 'cancel'
                                    }
                                ]
                            ]
                        }
                    }

                    // @ts-ignore
                    await ctx.reply(`Verifique la corrección del correo electrónico ingresado ${ctx.update["message"].text}`, extra)
                    ctx.wizard.next()
                } else {
                    ctx.reply("correo electrónico no válido, inténtalo de nuevo")
                }
            }

        } else if (ctx.update["callback_query"]) {
            ctx.answerCbQuery('Enviar correo electrónico')
        }
    }),
    (async (ctx) => {


        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data == 'cancel') {
                ctx.answerCbQuery()
                ctx.wizard.selectStep(ctx.session.__scenes.cursor - 1)
                await ctx.editMessageText("https://iqoption.com/ru \n\nEnvíame tu correo electrónico que usaste para registrarte y te daré 10000 IQCoins.")
            }

            if (ctx.update['callback_query'].data == 'next') {
                ctx.answerCbQuery('next')
                await ctx.reply("¡Atrapa tus primeros 10000 IQCoins y bienvenido al juego! ;)")
                await add_coins(ctx.from, 10000, false)
                await ctx.replyWithSticker("CAACAgIAAxkBAAIKrGLwmAoW3iFfEPhcYdD3JnFA6DCqAAJXBAACP5XMCj6R_XixcB-qKQQ")

                const extra2 = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['¡He ganado!', 'He perdido']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                // @ts-ignore
                await ctx.reply("Por cierto, para el trading de opciones binarias con Android, se necesita una aplicación especial IQ Option X. Pero si utilizas la versión web, entonces ya tienes la herramienta que necesitas. Hay un enlace especial a la aplicación en el menú, instalalo y vuelve al juego :)")

                await ctx.replyWithVideo({ source: "./src/assets/37.mp4" })
                // @ts-ignore
                await ctx.reply(`Sugiero no dudar y tratar de hacer tu primera operación en una cuenta de demostración. \nElije activo: EUR/USD \nElije la cantidad: $100 \nElije el tiempo de expiración: 1 min \nElije hacia arriba o hacia abajo. Ve este video, que explica en detalle cómo hacer una operación. \nNo tengas miedo de cometer un error, esta es una puntuación de práctica`, extra2)
                return ctx.scene.enter("registration")
                ctx.wizard.next()

            }
        }
    })
);
home.leave(async (ctx) => console.log("home leave"))

home.action("lets1", async (ctx) => {
    // ctx.scene.enter("registration")
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [[{
                text: "¿Cómo puedo ganar dinero con él?",
                callback_data: "continue"
            }]],
        }
    }
    await ctx.reply('¡Buena pregunta!')
    await ctx.replyWithVideo({ source: './src/assets/2.mp4' })
    ctx.answerCbQuery()

    const message = `Una opción binaria es un instrumento financiero altamente rentable que te da la oportunidad de obtener un beneficio de hasta el 91% en al menos 1 minuto (En caso de un pronóstico correcto). Solo tienes que elegir dónde se moverá la cotización en el gráfico -  hacia arriba o hacia abajo. Sin embargo, recuerda que donde hay altas ganancias, hay altos riesgos. Se llama binario por esta misma razón - todo o nada (arriba o abajo). Vea este video para saber más:`;

    // @ts-ignore
    await ctx.reply(message, extra)
    ctx.wizard.next()
})

home.action("continue", async (ctx) => {
    ctx.answerCbQuery()
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [[
                {
                    text: "¿Por qué debería inscribirme?",
                    callback_data: "why"
                }
            ]],
        }
    }

    // await ctx.deleteMessage(ctx.update['callback_query'].message.message_id).then(res => console.log(res))
    await ctx.replyWithSticker("CAACAgIAAxkBAAIKnWLwltw9NWe3L9fe3uFCjJZzRRC7AAJGBAACP5XMCstXCFgVL57DKQQ")
    // @ts-ignore
    await ctx.reply('Puedes operar con opciones binarias en la plataforma de trading de un bróker. Para esto, te sugiero que te inscribas en el mejor de ellas - IQ Option. Soy un bot y estoy enamorada de su plataforma tecnológica y profesional, que tiene todo para el trading conveniente. La plataforma de IQ Option ha recibido muchos premios. Bueno, cómo no enamorarme.', extra)

})

home.action("why", async (ctx) => {
    ctx.answerCbQuery()

    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [[
                {
                    text: "¡Cool!",
                    callback_data: '1'
                }
            ]],
        }
    }

    // await ctx.deleteMessage(ctx.update['callback_query'].message.message_id).then(res => console.log(res))
    // await ctx.deleteMessage(ctx.update['callback_query'].message.message_id - 1).then(res => console.log(res))
    // @ts-ignore
    ctx.reply('La inscripción es necesaria para que puedas aplicar el conocimiento que ganas en el juego en una cuenta de práctica, y cuando comienzas a tener éxito en el comercio real, por dinero real.', extra)

})

home.action("1", async (ctx) => {


    ctx.answerCbQuery()
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [[
                {
                    text: 'Genial',
                    callback_data: '2'
                }
            ]]
        }
    }

    const message = `Así que las reglas del juego son simples. Durante el juego ganarás monedas de juego - IQ coins. Puedes conseguirlas por completar tareas y entrenamiento, o por abrir posiciones en opciones binarias de juegos, sí, sí, todo es como en la realidad. Pero lo más importante, ¡puedes comprar premios útiles reales con las monedas que ganes!`

    // @ts-ignore
    ctx.reply(message, extra)

})

home.action("2", async (ctx) => {
    ctx.answerCbQuery()
    const extra2 = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '¡Premio genial!',
                        callback_data: 'cool2',
                        // url: 'https://iqoption.com/ru'
                    }
                ]
            ]
        }
    }

    const message = `Te sugiero que obtengas tus primeros 10.000 IQCoins en el juego, que serán necesarios para operar directamente en el juego, y luego puedes intercambiar IQCoins por valiosos premios. Y el premio principal es de $1000 a tu cuenta real en la IQ Option.`;

    // @ts-ignore
    await ctx.reply(message, extra2)
})


home.action("cool2", async (ctx) => {
    ctx.answerCbQuery()
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Inscribirse',
                        callback_data: 'register',
                        // url: 'https://iqoption.com/ru'
                    },
                    {
                        text: 'Ya estoy inscrito',
                        callback_data: 'auth'
                    }
                ]
            ]
        }
    }

    const message = `Para recibirlos, solo tienes que registrarte en la IQ Option. Necesitas un mínimo de datos - tu nombre y dirección de correo electrónico, sin datos de pago y enlaces de tarjetas. Al registrarte, recibirás $10,000 a tu cuenta de demostración, en la que puedes operar en la plataforma, entrenar. Más bien, sigue el enlace de abajo, registrate, y luego vuelva aquí y te daré 10.000 IQCoins.`

    // @ts-ignore
    await ctx.reply(message, extra)

    ctx.wizard.selectStep(0)
})

handler.action("register", async (ctx) => {
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'IQ Option',
                        // callback_data: 'register',
                        url: 'https://iqoption.com/ru'
                    },
                ]
            ]
        }
    }

    const message = `Envíame tu correo electrónico que usaste para registrarte y te daré 10000 IQCoins.`

    // @ts-ignore
    await ctx.reply(`https://iqoption.com/ru \n${message} \n\nPara volver a pulsar, enviar /back`, extra)
    await ctx.reply("Introduce tu correo electrónico")
    ctx.answerCbQuery()
    ctx.wizard.next()
})

handler.action("auth", async (ctx) => {
    ctx.answerCbQuery()
    // await ctx.deleteMessage(ctx.update['callback_query'].message.message_id).then(res => console.log(res))
    // await ctx.deleteMessage(ctx.update['callback_query'].message.message_id - 1).then(res => console.log(res))
    // await ctx.reply("Какой ты молодец! Тогда пришли мне свой emai, который ты использовал для регистрации и я начислю тебе 10000 IQCoins. \n\nДля того чтобы вернуться нажать, отправьте /back")

    const message = `¡Qué persona tan maravillosa eres! Entonces envíame tu correo que utilizaste para la inscripción y te daré 10000 IQCoins.`

    await ctx.reply(message)
    await ctx.reply("Introduce tu correo electrónico")
    // await ctx.scene.enter("screenshoot")
    ctx.wizard.next()
})

// @ts-ignore
// handler.on("message", async (ctx) => console.log(ctx.message.video))
emailHandler.on("message", async (ctx) => console.log(ctx.update["messsage"]["text"]))
home.enter((ctx) => greeting(ctx))

// Обработка входящих
// handler.on("start", async (ctx) => greeting(ctx))


// Давай попробуем
home.action('letsgo', async (ctx) => {
    // const data = await getInterface("rules", "Давай попробуем")

    // deleteprevmessage(ctx)
    // await ctx.replyWithSticker("CAACAgIAAxkBAAIeUGLyKvzcAj3CTjzoT_24XSmvBIDsAAI3BAACP5XMCkLU7Ai1u05wKQQ")

    let extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Vamos',
                        callback_data: 'lets'
                    }
                ],
                [
                    {
                        text: 'Espera, ¿qué son las opciones binarias?',
                        callback_data: 'lets1'
                    }
                ]
            ]
        }
    }

    // @ts-ignore
    await ctx.reply('¡Excelente! Déjame contarte sobre el juego y sus reglas.', extra)
    ctx.answerCbQuery()
})

home.start((ctx) => greeting(ctx))
home.command("/game", async (ctx) => ctx.scene.enter("game"))
home.command("/reg", async (ctx) => {
    console.log(ctx)
    ctx.telegram.copyMessage(ctx.from.id, ctx.from.id, ctx.update["message"].message_id - 1)
})
home.action("lets", async (ctx) => {
    ctx.answerCbQuery()
    let extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '¡Cool!',
                        callback_data: 'cool2'
                    }
                ],
            ]
        }
    }

    // @ts-ignore
    await ctx.reply("Así que las reglas del juego son simples. Durante el juego ganarás monedas de juego - IQ coins. Puedes conseguirlas por completar tareas y entrenamiento, o por abrir posiciones en opciones binarias de juegos, sí, sí, todo es como en la realidad. Pero lo más importante, ¡puedes comprar premios útiles reales con las monedas que ganes!", extra)
})
home.hears('/set', async (ctx) => {
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            keyboard: [['На главную']],
            one_time_keyboard: true,
            resize_keyboard: true
        }
    }

    // const message = 'Предлагаю не медлить и попробовать совершить свою первую сделку на демо счёте. \nВыбери актив: EUR / USD \nВыбери размер позиции: $100 \nВыбери время экспирации: 1 min \nВыбери выше или ниже.Посмотри это видео, в котором подробно рассказано как совершить сделку: Небойся ошибиться, это тренировочный счёт ;)'

    // await ctx.replyWithVideo({ source: "./src/assets/6.mp4" })
    // @ts-ignore
    await ctx.reply("Отправьте Ваш E-mail", extra)
    // ctx.scene.enter("registration")
    ctx.scene.enter('mailset')
})
home.command("/trophies", async (ctx) => ctx.scene.enter("trophies"))
export default home