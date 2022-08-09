import { getInterface, getUser, registerUser } from "../../Controller/UserController"
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

    const data = await getInterface("greeting", "/start")

    ctx.wizard.selectStep(0)

    if (data.hasStick) {
        await ctx.replyWithSticker(data.sticker)
    }

    // @ts-ignore
    ctx.update["message"] ? ctx.reply(data.message, extra) : ctx.editMessageText(data.message, extra)
}