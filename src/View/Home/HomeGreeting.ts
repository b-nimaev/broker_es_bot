import { getUser, registerUser, removeBalance, getInterface } from "../../Controller/UserController"
import { MyContext } from "../../Model/Model"
// import { messageRenderFunction } from "./HomeScene"

export async function greeting(ctx: MyContext) {

    if (ctx.update["message"]) {

        let user = ctx.update["message"].from

        if (user) {

            let userData = await getUser(user)

            if (!userData) {
                await registerUser(user)
            } else {
                await removeBalance(user)
            }

        }
    }

    let extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Давай попроубем',
                        callback_data: 'letsgo'
                    }
                ]
            ]
        }
    }

    // return await messageRenderFunction(ctx)

    const message = `Привет, меня зовут Eva - я бот и я твой помощник в мире трейдинга. Я приготовила для тебя увлекательную обучающую игру, которая даст тебе основы для торговли бинарными опционами. Полученные знания ты сможешь применять на практике и зарабатывать с их помощью реальные деньги. Сыграешь со мной? \nПРЕДУПРЕЖДЕНИЕ: Ваши средства могут быть подвержены риску.`

    await ctx.replyWithSticker("CAACAgIAAxkBAAIeUGLyKvzcAj3CTjzoT_24XSmvBIDsAAI3BAACP5XMCkLU7Ai1u05wKQQ")
    // @ts-ignore
    ctx.update["message"] ? await ctx.reply(message, extra) : await ctx.reply(message, extra)
    // ctx.wizard.next()
}