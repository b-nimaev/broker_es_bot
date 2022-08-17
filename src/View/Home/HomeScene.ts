import { Composer, Scenes } from "telegraf";
import { getInterface } from "../../Controller/UserController";
import { MyContext } from "../../Model/Model";
import { greeting } from "./HomeGreeting";
require("dotenv").config();

const handler = new Composer<MyContext>(); // function
const home = new Scenes.WizardScene(
    "home",
    handler
);

home.action("lets", async (ctx) => {
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
    // await ctx.editMessageText('Классный вопрос!')
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

async function sentence(ctx) {
    ctx.answerCbQuery()
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Зарегистрироваться',
                        callback_data: 'register',
                        url: 'https://iqoption.com/ru'
                    },
                    {
                        text: 'Я уже зарегистрирован',
                        callback_data: 'auth'
                    }
                ]
            ]
        }
    }
    // await ctx.deleteMessage(ctx.update['callback_query'].message.message_id).then(res => console.log(res))
    await ctx.reply("Предлагаю тебе получить твои первые игровые 10 000 IQCoins, они нужны будут для того чтобы открывать позиции в игре и зарабатывать еще больше монет, которые ты потом сможешь обменять на призы. Для их получения тебе нужно просто зарегистрироваться в IQ Option. Не беспокойся для регистрации тебе понадобиться минимум данных - твое имя и адрес электронной почты, никаких платежных данных и привязок карт. При регистрации ты получишь $10000 на свой демо счет, на них ты сможешь торговать на платформе, тренировать навык, а если они закончаться, то сможешь их бесплатно восполнить. Скорее переходи по ссылке внизу, регистрируйся, а потом возвращайся сюда и я дам тебе 10000 IQCoins.")
    // @ts-ignore
    await ctx.reply('Заходи на платформу нажимай кнопку "Регистрация" в верхнем правом углу.  Вводи свою электронную почту, придумай пароль и подтверди, что тебе есть 18 лет. Вот и всё!', extra)

    // ctx.scene.enter("registration")
}

home.action("2", async (ctx) => {
    await sentence(ctx)
})

home.action("auth", async (ctx) => {
    ctx.answerCbQuery()
    // await ctx.deleteMessage(ctx.update['callback_query'].message.message_id).then(res => console.log(res))
    // await ctx.deleteMessage(ctx.update['callback_query'].message.message_id - 1).then(res => console.log(res))
    await ctx.reply("Какой ты молодец! Тогда пришли мне скрин своего торгового счета и я начислю тебе 10000 IQCoins. \n\nДля отмены отправьте /back")
    await ctx.scene.enter("screenshoot")
})


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
                        callback_data: "lets"
                    }
                ],
                [
                    {
                        text: "Погоди, что такое бинарные опционы?",
                        callback_data: "lets"
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
    ctx.wizard.selectStep(2)
})

home.start((ctx) => greeting(ctx))
home.command("/game", ctx => ctx.scene.enter('game'))

home.command("admin", async (ctx) => {
    ctx.scene.enter('admin')
})

async function deleteprevmessage(ctx) {
    let prev_message = ctx.update['callback_query'].message.message_id - 1
    await ctx.deleteMessage(prev_message)
}

// 
export default home