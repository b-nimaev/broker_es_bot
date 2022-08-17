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

// @ts-ignore
home.steps.push((async (ctx) => {
    // console.log(ctx.session.__scenes.current)
    if (ctx.update["callback_query"]) {

        if (ctx.update["callback_query"].data == 'lets') {
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
            // @ts-ignore
            await ctx.editMessageText('Бинарный опцион - это выскодоходный финансовый инструмент, который дает возвожность получить прибыль до 91% минимум за 1 мин (В случае успешного закрытия сделки). Нужно лишь выбрать куда будет двигаться котировка на графике - вверх или вниз. Однако помни, там где высокий доход там и высокие риски. Бинарным он называется именно поэтому - все или ничего (ввех или вниз). Посмотри это видео, чтобы узнать подробнее: https://vimeo.com/channels/1002556/313147500', extra)
            ctx.wizard.next()
        }

    }
}),
    (async (ctx) => {

        if (ctx.update["callback_query"].data == 'continue') {

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

            await ctx.deleteMessage(ctx.update['callback_query'].message.message_id).then(res => console.log(res))
            await ctx.replyWithSticker("CAACAgIAAxkBAAIKnWLwltw9NWe3L9fe3uFCjJZzRRC7AAJGBAACP5XMCstXCFgVL57DKQQ")
            // @ts-ignore
            await ctx.reply('Торговать бинарными опционами ты можешь на торговой платформе брокера. Я предлагаю тебе для этого зарегистрироваться на лучшей из них - IQ Option. Я ведь сама бот и просто влюблена в их технологичную, профессиональную платформу, на которой есть все для удобной торговли. Платформа IQ option отмечена множеством наград. Ну как не влюбиться.', extra)
        }

        if (ctx.update["callback_query"]) {

            if (ctx.update["callback_query"].data == 'why') {

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

                await ctx.deleteMessage(ctx.update['callback_query'].message.message_id).then(res => console.log(res))
                await ctx.deleteMessage(ctx.update['callback_query'].message.message_id - 1).then(res => console.log(res))
                // @ts-ignore
                ctx.reply('Регистрация нужна для того, чтобы те знания которые ты получишь в игре, ты мог бы применить на тренировочном счете, а когда у тебя начнет получаться и в реальной торговле, на реальные деньги.', extra)
            }

            if (ctx.update["callback_query"].data == '1') {

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

                await ctx.deleteMessage(ctx.update['callback_query'].message.message_id).then(res => console.log(res))
                // @ts-ignore
                ctx.reply('Итак правила игры просты. На протяжении игры ты будешь зарабатывать игровые монеты - IQ coin\'s.Ты сможешь их получать либо за выполнение заданий и обучение, или за то, что будешь открывать позиции на игровые бинарные опционы, да да, все как в реальности.Но самое главное, на заработанные монеты ты сможешь приобрести реальные полезные призы!', extra)
            }


            if (ctx.update["callback_query"].data == '2') {
                ctx.scene.enter("registration")
            }

        }
    }))

home.enter((ctx) => greeting(ctx))

// Обработка входящих
// handler.on("start", async (ctx) => greeting(ctx))


// Давай попробуем
handler.action('letsgo', async (ctx) => {
    const data = await getInterface("rules", "Давай попробуем")
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
                // [
                //     {
                //         text: "Погоди, что такое бинарные опционы?",
                //         callback_data: "whats"
                //     }
                // ]
            ]
        }
    }

    deleteprevmessage(ctx)

    if (data.hasStick) {
        await ctx.replyWithSticker(data.sticker)
    }

    // @ts-ignore
    await ctx.editMessageText(data.message, extra)
    ctx.wizard.next()
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