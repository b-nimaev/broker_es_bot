import { Composer, Scenes } from "telegraf";
import { getUser, lose_coins } from "../../Controller/UserController";
import { MyContext } from "../../Model/Model";
require("dotenv").config()

async function greeting(ctx) {
    let user = await getUser(ctx.from)

    let balance

    if (user) {
        if (user.balance) {
            balance = user.balance
        } else {
            balance = 0
        }
    } else {
        balance = 0
    }

    const message = "<b>Trofeos valiosos (por IQ Coins)</b> \n\n1. Participación en el sorteo de $1000 para la cuenta real en IQ option - 22000 coins \n2. Consulta con el gerente de cuenta con el deposito a partir de $1000 - 20000 Coins \n3. Estrategía de trading 1 3000 coins \n4. Estrategía de trading 2 3000 coins \n5. Estrategía de trading 3 3000 coins \n\n<b>Tu balance " + balance + " IQ Coins \n\nSeleccione el elemento deseado</b> \nPara volver a la página de inicio, envíe /back"
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [{ text: '1', callback_data: '1' },
                { text: '2', callback_data: '2' }],
                [{ text: '3', callback_data: '3' },
                { text: '4', callback_data: '4' },
                { text: '5', callback_data: '5' }],
                [{ text: 'Назад', callback_data: 'back' }]
            ]
        }
    }

    // @ts-ignore
    ctx.reply(message, extra)
}

const handler = new Composer<MyContext>();
const dashboard = new Scenes.WizardScene(
    "trophies",
    handler,
);

handler.hears("/back", async (ctx) => {
    // ctx.scene.enter("registration")
    ctx.scene.enter('home')
    // ctx.answerCbQuery()
})

handler.action("back", async (ctx) => {
    // ctx.scene.enter("registration")
    ctx.scene.enter('home')
    ctx.answerCbQuery()
})

dashboard.action("home", async (ctx) => {
    ctx.scene.enter("home")
    ctx.answerCbQuery()
})

handler.action("contact", async (ctx) => {
    ctx.wizard.next()
    ctx.editMessageText("Отправьте сообщение, администрация ответит в ближайшее время")
    ctx.answerCbQuery()
})

dashboard.enter(async (ctx) => await greeting(ctx))

async function getBalance(ctx) {
    let user = await getUser(ctx.from)

    let balance: number

    if (user) {
        if (user.balance) {
            balance = user.balance
        } else {
            balance = 0
        }
    } else {
        balance = 0
    }

    return balance
}

handler.action('1', async (ctx) => {
    let balance: number = await getBalance(ctx)

    if (balance > 22000) {
        await ctx.reply('¡Felicidades, te conviertes en un participante del sorteo de $1000 para una cuenta real en la IQ option! Puedes verificar los resultados del sorteo en el sitio web qevagame.com')
        await lose_coins(ctx.from, 22000, false)
        // await greeting(ctx)
        ctx.answerCbQuery()
    } else {
        const message2 = `Por desgracia, careces de las monedas para participar en el sorteo de $ 1.000 para el comercio real, pero eso no es problema, puedes ganar 10.000 coins por solo hacer un depósito. Presiona el botón en la parte inferior y luego envía tu correo electrónico para verificar. Te daré 10.000 coins.`
        ctx.answerCbQuery()
        await ctx.reply(message2)
        // await greeting(ctx)
    }
})
handler.action('2', async (ctx) => {

    let balance: number = await getBalance(ctx)

    if (balance > 20000) {
        await ctx.reply("Gran elección! Te he inscrito para una consulta con el Gurú del Comercio. Sólo necesito tiempo para comprobar el tamaño de tu depósito y volveré.")
        ctx.answerCbQuery()
        await lose_coins(ctx.from, 20000, false)
    } else {
        await ctx.reply(`Desafortunadamente, no tienes suficientes coins para consultar con sun gerente de cuenta, pero eso está bien, puedes ganar 10,000 IQ coins por solo hacer un depósito. Presiona el botón en la parte inferior y luego envía tu correo electrónico para verificar. Te daré 10.000 coins. Y no te olvides que para el acompañamiento a la cuenta de un gerente en su cuenta debe haber al menos $1,000`)
        ctx.answerCbQuery()
    }
})
handler.action('3', async (ctx) => {
    let balance: number = await getBalance(ctx)

    if (balance > 3000) {
        ctx.answerCbQuery()
        await ctx.reply('Gran elección! Toma la estrategia')
        await ctx.replyWithDocument({ source: './src/assets/Estrategia 1.pdf' })
        await lose_coins(ctx.from, 3000, false)
    } else {
        await ctx.reply(`Desafortunadamente, no tienes suficientes coins ${3000 - balance}`)
        ctx.answerCbQuery()
    }
})
handler.action('4', async (ctx) => {
    let balance: number = await getBalance(ctx)

    if (balance > 3000) {
        ctx.answerCbQuery()
        await ctx.reply('Gran elección! Toma la estrategia')
        await ctx.replyWithDocument({ source: './src/assets/Estrategia 2.pdf' })
        await lose_coins(ctx.from, 3000, false)
    } else {
        await ctx.reply(`Desafortunadamente, no tienes suficientes coins ${3000 - balance}`)
        ctx.answerCbQuery()
    }
})
handler.action('5', async (ctx) => {
    let balance: number = await getBalance(ctx)

    if (balance > 3000) {
        ctx.answerCbQuery()
        await ctx.reply('Gran elección! Toma la estrategia')
        await ctx.replyWithDocument({ source: './src/assets/Estrategia 3.pdf' })
        await lose_coins(ctx.from, 3000, false)
    } else {
        await ctx.reply(`Desafortunadamente, no tienes suficientes coins ${3000 - balance}`)
        ctx.answerCbQuery()
    }
})

dashboard.command("/start", async (ctx) => ctx.scene.enter("home"))
dashboard.command("/registration", async (ctx) => console.log(ctx))
dashboard.command("/game", async (ctx) => ctx.scene.enter("game"))

export default dashboard