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
                        text: 'Probemos',
                        callback_data: 'letsgo'
                    }
                ]
            ]
        }
    }

    // return await messageRenderFunction(ctx)

    const message = `Hola, mi nombre es Eva - Soy un bot y soy tu asistente en el mundo del trading. Te he preparado un emocionante juego educativo que te dará los fundamentos para el trading de opciones binarias. Podrás aplicar los conocimientos adquiridos en la práctica y ganar dinero real con su ayuda. ¿Jugarás conmigo? \nADVERTENCIA: Sus fondos pueden estar en riesgo.`

    await ctx.replyWithSticker("CAACAgIAAxkBAAIeUGLyKvzcAj3CTjzoT_24XSmvBIDsAAI3BAACP5XMCkLU7Ai1u05wKQQ")
    // @ts-ignore
    ctx.update["message"] ? await ctx.reply(message, extra) : await ctx.reply(message, extra)
    // ctx.wizard.next()
}