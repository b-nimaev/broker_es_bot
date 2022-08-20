import { Composer, Scenes } from "telegraf";
import { addEmail, getInterface } from "../../Controller/UserController";
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
            if (EmailValidator.validate(ctx.update["message"].text)) {
                await addEmail(ctx.from, ctx.update["message"].text)
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Да, продолжаем',
                                    callback_data: 'next',
                                },
                                {
                                    text: 'Изменить',
                                    callback_data: 'cancel'
                                }
                            ]
                        ]
                    }
                }

                // @ts-ignore
                await ctx.reply(`Проверьте правильность ввода e-mail ${ctx.update["message"].text}`, extra)
                ctx.wizard.next()
            } else {
                ctx.reply("e-mail не валидный, повторите снова")
            }
        } else if (ctx.update["callback_query"]) {
            ctx.answerCbQuery('Пришлите e-mail')
        }
    }),
    (async (ctx) => {


        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data == 'cancel') {
                ctx.answerCbQuery()
                ctx.wizard.selectStep(ctx.session.__scenes.cursor - 1)
                await ctx.editMessageText("https://iqoption.com/ru \n\nПришли мне свой emai, который ты использовал для регистрации и я начислю тебе 10000 IQCoins.")
            }

            if (ctx.update['callback_query'].data == 'next') {
                ctx.answerCbQuery('next')
                await ctx.reply("Лови свои первые 10000 IQCoins и добро пожаловать в игру! ;)")
                await ctx.replyWithSticker("CAACAgIAAxkBAAIKrGLwmAoW3iFfEPhcYdD3JnFA6DCqAAJXBAACP5XMCj6R_XixcB-qKQQ")

                const extra2 = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Понял']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                // @ts-ignore
                await ctx.reply("Кстати, чтобы торговать бинарными опционами на Android нужно специальное приложение IQ option Х.  Но если ты пользуешься веб версией то в ней уже есть нужный тебе инструмент. В меню есть специальная ссылка на приложение, устонавливай и возвращайся в игру :)", extra2)
            }
        }

        if (ctx.update["message"]) {

            if (ctx.update['message'].text == 'Понял') {
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Я заработал!', 'Я потерял :(']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                const message = 'Предлагаю не медлить и попробовать совершить свою первую сделку на демо счёте. \nВыбери актив: EUR / USD \nВыбери размер позиции: $100 \nВыбери время экспирации: 1 min \nВыбери выше или ниже.Посмотри это видео, в котором подробно рассказано как совершить сделку: Небойся ошибиться, это тренировочный счёт ;)'

                await ctx.replyWithVideo({ source: "./src/assets/6.mp4" })
                // @ts-ignore
                await ctx.reply(message, extra)
                ctx.scene.enter("registration")
                ctx.wizard.next()
            }
        }
    })
);


home.action("lets1", async (ctx) => {
    // ctx.scene.enter("registration")
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [[{
                text: "Интересно, а как с его помощью можно заработать?",
                callback_data: "continue"
            }]],
        }
    }
    await ctx.reply('Классный вопрос!')
    await ctx.replyWithVideo({ source: './src/assets/2.mp4' })
    ctx.answerCbQuery()
    // @ts-ignore
    await ctx.reply('Бинарный опцион - это выскодоходный финансовый инструмент, который дает возвожность получить прибыль до 91% минимум за 1 мин (В случае успешного закрытия сделки). Нужно лишь выбрать куда будет двигаться котировка на графике - вверх или вниз. Однако помни, там где высокий доход там и высокие риски. Бинарным он называется именно поэтому - все или ничего (ввех или вниз). Посмотри это видео, чтобы узнать подробнее', extra)
    ctx.wizard.next()
})

home.action("continue", async (ctx) => {
    ctx.answerCbQuery()
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [[
                {
                    text: "Зачем регистрироваться?",
                    callback_data: "why"
                }
            ]],
        }
    }

    // await ctx.deleteMessage(ctx.update['callback_query'].message.message_id).then(res => console.log(res))
    await ctx.replyWithSticker("CAACAgIAAxkBAAIKnWLwltw9NWe3L9fe3uFCjJZzRRC7AAJGBAACP5XMCstXCFgVL57DKQQ")
    // @ts-ignore
    await ctx.reply('Торговать бинарными опционами ты можешь на торговой платформе брокера. Я предлагаю тебе для этого зарегистрироваться на лучшей из них - IQ Option. Я ведь сама бот и просто влюблена в их технологичную, профессиональную платформу, на которой есть все для удобной торговли. Платформа IQ option отмечена множеством наград. Ну как не влюбиться.', extra)

})

home.action("why", async (ctx) => {
    ctx.answerCbQuery()

    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [[
                {
                    text: "Здорово!",
                    callback_data: '1'
                }
            ]],
        }
    }

    // await ctx.deleteMessage(ctx.update['callback_query'].message.message_id).then(res => console.log(res))
    // await ctx.deleteMessage(ctx.update['callback_query'].message.message_id - 1).then(res => console.log(res))
    // @ts-ignore
    ctx.reply('Регистрация нужна для того, чтобы те знания которые ты получишь в игре, ты мог бы применить на тренировочном счете, а когда у тебя начнет получаться и в реальной торговле, на реальные деньги.', extra)

})

home.action("1", async (ctx) => {


    ctx.answerCbQuery()
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [[
                {
                    text: 'Круто!',
                    callback_data: '2'
                }
            ]]
        }
    }

    // await ctx.deleteMessage(ctx.update['callback_query'].message.message_id).then(res => console.log(res))
    // @ts-ignore
    ctx.reply('Итак правила игры просты. На протяжении игры ты будешь зарабатывать игровые монеты - IQ coin\'s.Ты сможешь их получать либо за выполнение заданий и обучение, или за то, что будешь открывать позиции на игровые бинарные опционы, да да, все как в реальности.Но самое главное, на заработанные монеты ты сможешь приобрести реальные полезные призы!', extra)

})

home.action("2", async (ctx) => {
    ctx.answerCbQuery()
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Зарегистрироваться',
                        callback_data: 'register',
                        // url: 'https://iqoption.com/ru'
                    },
                    {
                        text: 'Я уже зарегистрирован',
                        callback_data: 'auth'
                    }
                ]
            ]
        }
    }

    const extra2 = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Классный приз',
                        callback_data: 'cool',
                        // url: 'https://iqoption.com/ru'
                    }
                ]
            ]
        }
    }
    // @ts-ignore
    await ctx.reply("Предлагаю тебе получить твои первые игровые 10 000 IQCoins, они нужны будут для того чтобы торговать прямо в игре, а затем ты сможешь обменять IQCoins на ценные призы. А главный приз это $1000 на твой реальный счет в IQ option.", extra2)
})

home.action("cool", async (ctx) => {
    ctx.answerCbQuery()
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Зарегистрироваться',
                        callback_data: 'register',
                        // url: 'https://iqoption.com/ru'
                    },
                    {
                        text: 'Я уже зарегистрирован',
                        callback_data: 'auth'
                    }
                ]
            ]
        }
    }

    // @ts-ignore
    await ctx.reply('Для их получения тебе нужно просто зарегистрироваться в IQ Option. Понадобиться минимум данных - твое имя и адрес электронной почты, никаких платежных данных и привязок карт. При регистрации ты получишь $10000 на свой демо счет, на них ты сможешь торговать на платформе, тренироваться. Скорее переходи по ссылке внизу, регистрируйся, а потом возвращайся сюда и я дам тебе 10000 IQCoins. ', extra)
    ctx.wizard.selectStep(0)
})

handler.action("register", async (ctx) => {
    await ctx.reply("https://iqoption.com/ru \n\Пришли мне свой emai, который ты использовал для регистрации и я начислю тебе 10000 IQCoins. \n\nДля того чтобы вернуться нажать, отправьте /back")
    await ctx.reply("Ввести email")
    ctx.answerCbQuery()
    // await ctx.answerCbQuery()
    ctx.wizard.next()
})

handler.action("auth", async (ctx) => {
    ctx.answerCbQuery()
    // await ctx.deleteMessage(ctx.update['callback_query'].message.message_id).then(res => console.log(res))
    // await ctx.deleteMessage(ctx.update['callback_query'].message.message_id - 1).then(res => console.log(res))
    await ctx.reply("Какой ты молодец! Тогда пришли мне свой emai, который ты использовал для регистрации и я начислю тебе 10000 IQCoins. \n\nДля того чтобы вернуться нажать, отправьте /back")
    await ctx.reply("Ввести email")
    // await ctx.scene.enter("screenshoot")
    ctx.wizard.next()
})

handler.on("message", async (ctx) => console.log('handler'))
emailHandler.on("message", async (ctx) => console.log(ctx.update["messsage"]["text"]))
// home.enter((ctx) => greeting(ctx))

// Обработка входящих
// handler.on("start", async (ctx) => greeting(ctx))


// Давай попробуем
home.action('letsgo', async (ctx) => {
    // const data = await getInterface("rules", "Давай попробуем")
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Давай",
                        callback_data: "1"
                    }
                ],
                [
                    {
                        text: "Погоди, что такое бинарные опционы?",
                        callback_data: "lets1"
                    }
                ]
                // [
                //     {
                //         text: "Погоди, что такое бинарные опционы?",
                //         callback_data: "whats"
                //     }
                // ]
            ]
        }
    }

    // deleteprevmessage(ctx)

    // await ctx.replyWithSticker("CAACAgIAAxkBAAIeUGLyKvzcAj3CTjzoT_24XSmvBIDsAAI3BAACP5XMCkLU7Ai1u05wKQQ")

    ctx.answerCbQuery()
    // @ts-ignore
    await ctx.reply("Отлично! Давай расскажу тебе об игре и ее правилах.", extra)
})

home.start((ctx) => greeting(ctx))
home.command("/game", async (ctx) => ctx.scene.enter("game"))
// 
export default home