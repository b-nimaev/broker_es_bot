/* eslint-disable @typescript-eslint/no-floating-promises */
import { Composer, Markup, Scenes, session, Telegraf } from 'telegraf'
import { MyContext } from './Model/Model'
import { Request, Response } from 'express'

// Scenes
import home from './View/Home/HomeScene';
import dashboard from './View/Dashboard/DashboardScene';
import admin from './View/Admin/AdminScene';
import registration from './View/Registration/RegistrationScene';
import game from './View/Game/GameScene';
import { getUser } from './Controller/UserController';

// SSL
const fs = require('fs');
const key = fs.readFileSync('./ssl/localhost.decrypted.key');
const cert = fs.readFileSync('./ssl/localhost.crt');
const https = require('https');

const morgan = require("morgan")
const cors = require("cors")
const BodyParser = require("body-parser")
const user = require("../api/routes/userRouter.ts")

// Server
require("dotenv").config()
const express = require("express")

// Bot token check
const token = process.env.BOT_TOKEN

if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!')
}

// Init scenes & set secretPath for requires from bot

const scenes = [home, dashboard, admin, registration, game]
const bot = new Telegraf<MyContext>(token)
export default bot
const app = express()
const port = 8443
const secretPath = `/telegraf/${bot.secretPathComponent()}`
const stage = new Scenes.Stage<MyContext>(scenes, {
    default: 'home',
})

// Set webhook
if (process.env.mode === "development") {
    bot.telegram.setWebhook(`${process.env.ngrok}${secretPath}`)
        .then((status) => console.log('Webhook setted: ' + status))
} else {
    bot.telegram.setWebhook(`https://say-an.ru${secretPath}`)
        .then((status) => console.log('Webhook setted: ' + status))
    console.log(secretPath)
}

bot.command("/profile", async (ctx) => {

    let user = await getUser(ctx.from)
    let message = ``

    if (user) {
        if (user.balance) {
            message += `Ваш баланс: ${user.balance} IQCoins\n`
        }

        if (user.email) {
            message += `Ваш e-mail: ${user.email}\n`
        } else {
            message += `Ваш E-mail: не указан`
        }
    }

    ctx.reply(message)
})

bot.use(session())
bot.use((ctx, next) => {
    const now = new Date()
    ctx.myContextProp = now.toString()
    if (ctx.session) {
        if (ctx.session.__scenes) {
            if (ctx.session.__scenes.cursor) {
                console.log(ctx.session.__scenes.cursor)
            }
        }
    }
    return next()
})
bot.use(stage.middleware())
app.use(cors());
app.use(BodyParser.json());
app.use(
    BodyParser.urlencoded({
        extended: true,
    })
);
app.use(morgan("dev"));
app.use("/user", user);
// app.get("/", (req: Request, res: Response) => res.send("Hello!"))
app.use(bot.webhookCallback(secretPath))
const server = https.createServer({ key, cert }, app);
server.listen(port, () => console.log("telegram bot launched!"))

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))