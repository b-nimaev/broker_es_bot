import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../Model/Model";
require("dotenv").config()
import * as EmailValidator from 'email-validator';
import { addDeposit, addEmail, getEmail, getUser } from "../../Controller/UserController";

const handler = new Composer<MyContext>();
const game = new Scenes.WizardScene(
    "game",
    handler,

    // Строка 128
    async (ctx) => {
        if (ctx.update["message"]) {

            if (ctx.update["message"].text == 'Линия поддержки') {
                const message = "Ты абсолютно прав, это линия поддержки. так как она проходит по нижним точкам графика цены. Лови свои 500 коинов"
                await ctx.replyWithSticker("CAACAgIAAxkBAAINlWLw4TfLvzsDawccQvPswpOo0xO7AAJGBAACP5XMCstXCFgVL57DKQQ")
                await ctx.reply(message)
            }

            if (ctx.update["message"].text == 'Линия сопротивления') {
                const message = "К сожалению это неверный ответ( Это не линия сопротивления, а линия поддержки. так как она проходит по нижним точкам графика цены. Но у тебя еще много возможностей заработать. Кстати одна из них пополнить депозит и получить сразу 10 000 коинов на свой счет! Тогда тебе точно хватит на главный приз! Нажимай на кнопку в меню ниже и делай первый шаг в реальную торговлю!"
                await ctx.replyWithSticker("CAACAgIAAxkBAAINlmLw4T1-Kj5aK4SqswLjOJBw0LApAAJaBAACP5XMCu4_V1wQbaG7KQQ")
                await ctx.reply(message)
            }

            const extra = {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [['Выше', 'Ниже']],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }


            await ctx.reply("А теперь давай попробуем совершить сделку используя технический анализ")
            await ctx.reply("Посмотри на график нашей пары TEA/CFF, я уже добавила на график трендовую линию. Какую, я думаю ты уже знаешь) Как думаешь куда вероятнее всего пойдет котировка актива?")
            // @ts-ignore
            await ctx.replyWithPhoto("AgACAgIAAxkBAAIKWGLwZaKcbl3WDApWbY4ZuTUEicM_AALgvzEb-yWASwABL_VxOtDT4QEAAwIAA3MAAykE", extra)
            ctx.wizard.next()
        }
    },

    // Строка 132
    async (ctx) => {
        if (ctx.update["message"]) {

            if (ctx.update["message"].text == 'Выше') {
                const message = "Твой анализ оказался не верным. Скорее всего котировка пошла бы вниз, так как она встретилась с линией сопротивления. Но ты можешь практиковаться дальше!"
                await ctx.reply(message)
            }

            // AgACAgIAAxkBAAIKbGLwZn96lKvNYrEG8jjpX9Gxl2k_AALhvzEb-yWAS_bHICEy4NbsAQADAgADcwADKQQ

            if (ctx.update["message"].text == 'Ниже') {
                const message = "Ты абсолютно прав, котировка достигла линии сопротивлени, и скорее всего пошла бы вниз. Лови свои 425 коинов. Мне нравиться твоя ловкость!"
                await ctx.reply(message)
            }

            const extra = {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [['Конечно', 'Позже']],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }

            await ctx.replyWithPhoto("AgACAgIAAxkBAAIKbGLwZn96lKvNYrEG8jjpX9Gxl2k_AALhvzEb-yWAS_bHICEy4NbsAQADAgADcwADKQQ")
            // @ts-ignore
            await ctx.reply("Играем дальше?", extra)
            ctx.wizard.next()
        }
    },

    // Строка 138
    async (ctx) => {
        if (ctx.update["message"]) {

            if (ctx.update["message"].text == 'Конечно') {
                const message = "Отлично! Смотри на еще один график. Теперь он без линий тренда. Попробуй провести линию визуально и оценить куда может пойти цена актива?"
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Выше', 'Ниже']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                await ctx.reply(message)
                // @ts-ignore
                await ctx.replyWithPhoto("AgACAgIAAxkBAAIKbGLwZn96lKvNYrEG8jjpX9Gxl2k_AALhvzEb-yWAS_bHICEy4NbsAQADAgADcwADKQQ", extra)
            }

            // AgACAgIAAxkBAAIKbGLwZn96lKvNYrEG8jjpX9Gxl2k_AALhvzEb-yWAS_bHICEy4NbsAQADAgADcwADKQQ

            if (ctx.update["message"].text == 'Позже') {
                const message = "Хорошо. когда тебе напомнить?"
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Через 1 час', 'Через 8 часов', 'Через 12 часов', 'Через 24 часа']],
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

    // Строка 139
    async (ctx) => {
        if (ctx.update["message"]) {

            if (ctx.update["message"].text == 'Конечно') {
                const message = "Отлично! Смотри на еще один график. Теперь он без линий тренда. Попробуй провести линию визуально и оценить куда может пойти цена актива?"
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Выше', 'Ниже']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                await ctx.reply(message)
                // @ts-ignore
                await ctx.replyWithPhoto("AgACAgIAAxkBAAIKbGLwZn96lKvNYrEG8jjpX9Gxl2k_AALhvzEb-yWAS_bHICEy4NbsAQADAgADcwADKQQ", extra)
            }

            // AgACAgIAAxkBAAIKbGLwZn96lKvNYrEG8jjpX9Gxl2k_AALhvzEb-yWAS_bHICEy4NbsAQADAgADcwADKQQ

            if (ctx.update["message"].text == 'Позже') {
                const message = "Хорошо. когда тебе напомнить?"
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Через 1 час', 'Через 8 часов', 'Через 12 часов', 'Через 24 часа']],
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

)

game.enter(async (ctx) => {

    const message = "Сначала простое задание, посмотри на график, какую линию ты видишь? Как всегда за правильный отет тебя ждет 500"
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            keyboard: [['Линия поддержки', 'Линия сопротивления']],
            one_time_keyboard: true,
            resize_keyboard: true
        }
    }

    // @ts-ignore
    ctx.reply(message, extra)
    await ctx.replyWithPhoto("AgACAgIAAxkBAAIKTGLwY39wZ96uyo5BcCznP7x_QitCAALTvzEb-yWAS0lY_HT9BxMdAQADAgADbQADKQQ")
    ctx.wizard.next()
})

// game.on("message", ctx => console.log(ctx.message))

export default game