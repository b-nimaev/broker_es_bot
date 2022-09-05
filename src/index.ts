/* eslint-disable @typescript-eslint/no-floating-promises */
import { Scenes, session, Telegraf } from 'telegraf'
import { MyContext } from './Model/Model'

// Scenes
import home from './View/Home/HomeScene';
import dashboard from './View/Dashboard/DashboardScene';
import _handler from './View/handlerScene';
import mailset from './View/mailset';
import admin from './View/Admin/AdminScene';
import registration from './View/Registration/RegistrationScene';
import game from './View/Game/GameScene';
import { getUser } from './Controller/UserController';

import { addDeposit, getEmail } from './Controller/UserController'

// SSL
const http = require('http')

const morgan = require("morgan")
const cors = require("cors")
const BodyParser = require("body-parser")
import user = require("../api/routes/userRouter");
import steps = require("../api/routes/stepsRouter");
import interface__ = require("../api/routes/interfaceRouter");

// Server
require("dotenv").config()
const express = require("express")

// Bot token check
const token = process.env.BOT_TOKEN

if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!')
}

// Init scenes & set secretPath for requires from bot

const scenes = [home, dashboard, admin, registration, game, _handler, mailset]
const bot = new Telegraf<MyContext>(token)
export default bot
const app = express()
const port = process.env.port
const secretPath = `/telegraf/${bot.secretPathComponent()}`
const stage = new Scenes.Stage<MyContext>(scenes, {
    default: 'home',
})

// Set webhook
if (process.env.mode === "development") {

    const fetch = require('node-fetch')
    fetch('http://localhost:4040/api/tunnels')
        .then(res => res.json())
        .then(json => json.tunnels.find(tunnel => tunnel.proto === 'https'))
        .then(secureTunnel => bot.telegram.setWebhook(`${secureTunnel.public_url}${secretPath}`))
        .then((status) => console.log('Webhook setted: ' + status))
        .catch(err => {
            if (err.code === 'ECONNREFUSED') {
                return console.error("Looks like you're not running ngrok.")
            }
            console.error(err)
        })
} else {
    bot.telegram.setWebhook(`https://anoname.xyz${secretPath}`)
        .then((status) => console.log('Webhook setted: ' + status))
    console.log(secretPath)
}

bot.command("/profile", async (ctx) => {

    let user = await getUser(ctx.from)
    console.log(user)
    let message = ``

    if (user) {
        if (user.balance) {
            message += `Mi cuenta: ${user.balance} IQCoins\n`
        }

        if (user.email) {
            message += `Mi email: ${user.email}\n`
        } else {
            message += `Mi email: no especificado \n\nPara especificar un correo electrónico, escriba /set`
        }
    }

    ctx.reply(message)
})

bot.command("/check", async (ctx) => {
    const message = '¡Recibido! Ya voy a una reunión con la plataforma para comprobar tu depósito. Necesitaré tiempo. Ya sabes, la plataforma está tan ocupada, siempre tengo que esperar para charlar. Pero los traders son mas importantes para ella. A veces me pongo celosa... Pero tan pronto como nos encontremos, estaré de vuelta con tus IQ Coins'
    await ctx.replyWithSticker("CAACAgIAAxkBAAINkGLw4KY1njQpI5sm8nt94oewD_3-AAJlBAACP5XMClzVsXn7vWCCKQQ")

    // запись заявки депозита
    let update = ctx.from
    // @ts-ignore
    update.email = await getEmail(ctx.from)

    await addDeposit(ctx.from)
    ctx.reply(message)
})

bot.hears("/additional", async (ctx) => {
    await ctx.reply(`1. Manejo de riesgo \n2. Cómo elejir el tiempo de expiración \n3. Tipos de traders (psicología de trading)`)
    await ctx.replyWithDocument({ source: './src/assets/Estrategia 1.pdf' })
    await ctx.replyWithDocument({ source: './src/assets/Estrategia 2.pdf' })
    await ctx.replyWithDocument({ source: './src/assets/Estrategia 3.pdf' })
})

bot.hears("/getapp", async (ctx) => {
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'descargar',
                        url: 'https://app.appsflyer.com/com.iqoption.x-install?af_r=https%3A%2F%2Fstatic.cdnpub.info%2Ffiles%2Fstorage%2Fpublic%2F5a%2Fe3%2F5de74a883.apk'
                    }
                ]
            ]
        }
    }

    // @ts-ignore
    ctx.reply(`para Android`, extra)
})

bot.command("/deposit", async (ctx) => {
    const extra = {
        parse_mdoe: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Hacer depósito',
                        url: 'https://iqoption.com/es/counting/'
                    }
                ]
            ]
        }
    }

    const message = "Vaya a la plataforma y recargue su cuenta. \nDé el primer paso hacia el comercio real"

    // @ts-ignore
    await ctx.reply(message, extra)
})


bot.use(session())
bot.use((ctx, next) => {
    const now = new Date()
    ctx.myContextProp = now.toString()
    // console.log(ctx)

    return next()
})
bot.use(stage.middleware())
let cosrOptions = {
    credentials: true,
    origin: 'https://iqevagame.com/',  // сменил на http://<имя моего домена>
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
}
app.use(cors());
app.use(BodyParser.json());
app.use(
    BodyParser.urlencoded({
        extended: true,
    })
);
// bot.command("/start", async (ctx) => console.log('start'))
app.use(morgan("dev"));
app.use("/user", user);
app.use("/steps", steps);
app.use("/interface", interface__);
// @ts-ignore
app.get("/", (req: Request, res: Response) => res.send("Hello!"))
app.use(bot.webhookCallback(secretPath))
const server = http.createServer(app);
server.listen(port, () => console.log("telegram bot launched!"))

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))