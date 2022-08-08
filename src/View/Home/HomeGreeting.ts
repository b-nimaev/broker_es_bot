import { getUser, registerUser } from "../../Controller/UserController"
import { MyContext } from "../../Model/Model"

export async function greeting(ctx: MyContext) {

    if (ctx.update["message"]) {

        let user = ctx.update["message"].from

        if (user) {
            let userData = await getUser(user)
            if (!userData) {
                await registerUser(user)
            }
        }
    }

    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            keyboard: [["Давай попробуем"]],
            one_time_keyboard: true,
            resize_keyboard: true
        }
    }

    let message = `Привет, меня зовут Eva - я бот и я твой помощник в мире трейдинга. Я приготовила для тебя увлекательную обучающую игру, которая даст тебе основы для торговли бинарными опционами. Полученные знания ты сможешь применять на практике и зарабатывать с их помощью реальные деньги. Сыграешь со мной? \n\nПРЕДУПРЕЖДЕНИЕ: Ваши средства могут быть подвержены риску.`

    ctx.wizard.selectStep(0)
    await ctx.replyWithSticker("CAACAgIAAxkBAAIKiWLwlg76vprd1K5CSJ5UCcFsDqvoAAI3BAACP5XMCkLU7Ai1u05wKQQ");
    // @ts-ignore
    ctx.update["message"] ? ctx.reply(message, extra) : ctx.editMessageText(message, extra)
}