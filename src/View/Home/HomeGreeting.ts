import { getUser, registerUser, removeBalance, getInterface } from "../../Controller/UserController"
import { MyContext } from "../../Model/Model"
import { messageRenderFunction } from "./HomeScene"

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

    return await messageRenderFunction(ctx)

    // await ctx.replyWithSticker("CAACAgIAAxkBAAIeUGLyKvzcAj3CTjzoT_24XSmvBIDsAAI3BAACP5XMCkLU7Ai1u05wKQQ")
    // @ts-ignore
    // ctx.update["message"] ? await ctx.reply(message, extra) : await ctx.reply(message, extra)
    // ctx.wizard.next()
}