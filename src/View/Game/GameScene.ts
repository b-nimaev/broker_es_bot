import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../Model/Model";
require("dotenv").config()
import * as EmailValidator from 'email-validator';
import { addDeposit, addEmail, add_coins, getEmail, getUser, lose_coins } from "../../Controller/UserController";

const handler = new Composer<MyContext>();
const game = new Scenes.WizardScene(
    "game",
    handler,

    // Строка 128
    async (ctx) => {
        if (ctx.update["message"]) {

            if (ctx.update["message"].text == 'Линия поддержки') {
                const message = "Ты абсолютно прав, это линия поддержки. так как она проходит по нижним точкам графика цены. Лови свои 500 коинов"
                await add_coins(ctx.from, 500, false)
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
                const message = "Ты абсолютно прав, котировка достигла линии сопротивлени, и скорее всего пошла бы вниз. Лови свои 455 коинов. Мне нравится твоя ловкость!"
                await add_coins(ctx.from, 455, false)
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

                ctx.wizard.selectStep(ctx.session.__scenes.cursor + 2)
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
                ctx.wizard.next()
            }

        }
    },

    async (ctx) => {
        if (ctx.update["message"]) {

            let extra = {
                reply_markup: {
                    keyboard: [['Играть']],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }

            let message

            if (ctx.update["message"] == "Через 1 час") {
                message = `Хорошо, напишу через час`
            }
            if (ctx.update["message"] == "Через 8 часов") {
                message = `Хорошо, напишу через 8 часов`
            }
            if (ctx.update["message"] == "Через 12 часов") {
                message = `Хорошо, напишу через 12 часов`
            }
            if (ctx.update["message"] == "Через 24 часа") {
                message = `Хорошо, напишу через сутки`
            }

            await ctx.replyWithSticker("CAACAgIAAxkBAAINjGLw4FsIsWDIECUejo7RaAvreJElAAI-BAACP5XMCmXGbS9Z4RFmKQQ")
            await ctx.reply(message, extra)
        }
    },

    async (ctx) => {
        if (ctx.message) {

            const extra = {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [['Конечно', 'Позже']],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }

            if (ctx.update["message"] == "Выше") {
                let message = `К сожалению это неверный ответ( Здесь видно, что цена достигла уровня сопротивления, а значит с большей вероятностью она пойдет вниз. Не отчаивайся, у меня еще много интересных заданий!`
                // @ts-ignore
                await ctx.reply(message)
                await ctx.replyWithPhoto("AgACAgIAAxkBAAIKbGLwZn96lKvNYrEG8jjpX9Gxl2k_AALhvzEb-yWAS_bHICEy4NbsAQADAgADcwADKQQ")
                await ctx.replyWithSticker("CAACAgIAAxkBAAIPbWLw7QKCo0orkR8urtNwcJlXmR69AAJXBAACP5XMCj6R_XixcB-qKQQ")
                await ctx.reply(`Ты отлично справился с заданиями! И у тебя уже много практики, которую ты можешь перенести на реальную торговлю. Тренируй технический анализ на демо счете, а затем переходи на реальную торговлю \n\nЧтобы проверить баланс введи /profile`)
                // @ts-ignore
                await ctx.reply("Как насчет того, чтобы потренировать фундаментальный анализ?", extra)
                ctx.wizard.next()
            }

            if (ctx.update["message"] == "Ниже") {
                let message = `Ты абсолютно прав, котировка достигла линии сопротивления, и скорее всего пошла бы вниз. Лови свои 455 коинов. Мне нравится твоя ловкость!`
                await add_coins(ctx.from, 455, false)
                // @ts-ignore
                await ctx.reply(message)
                await ctx.replyWithPhoto("AgACAgIAAxkBAAIKbGLwZn96lKvNYrEG8jjpX9Gxl2k_AALhvzEb-yWAS_bHICEy4NbsAQADAgADcwADKQQ")
                await ctx.replyWithSticker("CAACAgIAAxkBAAIPbWLw7QKCo0orkR8urtNwcJlXmR69AAJXBAACP5XMCj6R_XixcB-qKQQ")
                await ctx.reply(`Ты отлично справился с заданиями! И у тебя уже много практики, которую ты можешь перенести на реальную торговлю. Тренируй технический анализ на демо счете, а затем переходи на реальную торговлю \n\nЧтобы проверить баланс введи /profile`)
                // @ts-ignore
                await ctx.reply("Как насчет того, чтобы потренировать фундаментальный анализ?", extra)
                ctx.wizard.next()
            }

        }
    },

    async (ctx) => {
        if (ctx.message) {
            if (ctx.message["text"] == "Конечно") {
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Понял, присылай новость']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
                ctx.reply("Здорово! Обожаю игры и мне нравиться что ты такой же, как я, хоть и человек, а не бот.")
                // @ts-ignore
                ctx.reply("Буду присылать тебе новости которые могут влиять на нашу пару TEA/CFF а ты выбирай, куда пойдет котировка. Но помни, что иногда новость может быть неоднозначной, например одинаково влиять сразу на оба товара в паре. В таких случаях может быть сложно определить направление цены и лучше воздержаться от совершения сделки.", extra)
                ctx.wizard.next()
            }
        }
    },

    async (ctx) => {
        if (ctx.message) {
            if (ctx.message["text"] == 'Понял, присылай новость') {

                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Выше', 'Ниже'], ['Воздержаться от сделки']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                // @ts-ignore
                ctx.reply(`Новость 1. "Ученый Александр Пимштейн сделал невероятное открытие после 5 лет исследований. У 5000 испытуемых женщин, которые пили по 3 чашки кофе в день замедлились процессы старения в 1,5 раза. Он смог открыть невероятную способность кофе к омоложению организма. Похоже даже любители чая по всему миру начинают переходить на кофе". \n\nКак думаешь, куда вероятнее всего пойдет котировка нашего актива TEA/CFF после этой новости? Выбери направление и открой позицию на 500 IQ Coin.`, extra)
                ctx.wizard.next()
            }
        }
    },

    async (ctx) => {
        if (ctx.message) {

            const extra = {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [['Понял, присылай следующую новость']],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }

            let message: string

            if (ctx.message["text"] == "Выше") {
                message = `К сожалению ты выбрал неверное направление. Если бы наш актив был CFF/TEA то есть кофе был бы базовым товаром, то тогда бы котировка нашего актива пошла вверх, но так как кофе в нашей паре котируемый товар, соответственно его стоимость по отношению к чаю возрастет, то котировка нашего актива после такой новости скорее всего полетит вниз.`
                await lose_coins(ctx.from, 500, false)
            }

            if (ctx.message["text"] == 'Ниже') {
                message = `Ты абсолютно прав! Вероятнее всего из-за большого спроса на кофе стоимость его возрастет, а так как это котируемый товар в нашей паре, то котировка актива скорее всего после этой новости полетит вниз. Лови свои 425 IQ Coin`
                await add_coins(ctx.from, 455, false)
            }

            if (ctx.message["text"] == "Воздержаться от сделки") {
                message = `Вероятнее всего из-за большого спроса на кофе стоимость его возрастет, а так как это котируемый товар в нашей паре, то котировка актива скорее всего после этой новости полетит вниз. Но если ты не уверен, лучше не рисковать. Мне нравиться твоя осторожность!`
            }

            // @ts-ignore
            ctx.reply(message, extra)
            ctx.wizard.next()

        }
    },

    async (ctx) => {
        if (ctx.message) {
            if (ctx.message["text"] == "Понял, присылай следующую новость") {
                const extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['Понял, присылай следующую новость']],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }

                let message = `Лови новость 2. "Самая популярная поп звезда Кэтти Кэндл на свой день рождения устроила большую чайную церемонию. Она сообщила своим гостям, что чай это ее любимый напиток, который помогает ей быть всегда энергичной, и она может давать так много гастролей в том числе благодаря любимому напитку. Похоже фанаты Кэтти Кэндл по всему миру теперь будут пить только чай, позабыв про коллу, кофе и другие напитки"  \n\nКак думаешь, куда вероятнее всего пойдет котировка нашего актива TEA/CFF после этой новости? Выбери направление и открой позицию на 500 IQ Coin.`
                // @ts-ignore
                ctx.reply(message, extra)
                ctx.wizard.next()
            }
        }
    },

    async (ctx) => {
        if (ctx.message) {

            const extra = {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [['Понял, присылай следующую новость']],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }

            let message: string

            if (ctx.message["text"] == "Выше") {
                message = `Ты абсолютно прав! Здесь ситуация изменилась в другую сторону. Так как данная поп звезда является инфлюенсером, который задает тренды ее заявление может повлиять на спрос на чай, а соответственно и на его стоимость. И так как чай в нашей паре базовый товар, то рост его цены, так же повлияет на рост котировки всего актива TEA/CFF. Возможно ты слышал как Илон Маск не раз влиял на стоимость криптовалюты Dogcoin своими твитами. Здесь в нашем игровом мире, похожая ситуация. Лови свои 425 IQ Coin`
                await add_coins(ctx.from, 455, false)
            }
            
            if (ctx.message["text"] == 'Ниже') {
                message = `К сожалению ты выбрал неверное направление. Чай в нашей паре базовый актив, а соответственно повышенный спрос на чай повлияет на рост его цены, и котировка актива TEA/CFF будет вероятнее всего рости после этой новости.`
                await lose_coins(ctx.from, 500, false)
            }

            if (ctx.message["text"] == "Воздержаться от сделки") {
                message = `Чай в нашей паре базовый актив, а соответственно повышенный спрос на чай повлияет на рост его цены, и котировка актива TEA/CFF будет вероятнее всего рости после этой новости. Но если ты не уверен, лучше не рисковать. Мне нравиться твоя осторожность!`
            }

            // @ts-ignore
            ctx.reply(message, extra)

        }  
    }

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

game.on("sticker", ctx => console.log(ctx.message))
// game.on("sti", ctx => console.log(ctx.message))

export default game