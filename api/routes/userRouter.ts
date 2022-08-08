import bot from "../../src"

require("dotenv").config()
const MongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectId

const path = require("path")
const express = require('express')
const userRouter = express.Router();

// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient(process.env.DB_CONN_STRING);

userRouter.use("/register", async function (req, res) {
    try {
        mongoClient.connect(function (err, client) {
            if (err) {
                return res.send(err);
            }

            console.log(req.body)
            client
                .db("broker")
                .collection("admins")
                .insertOne({
                    username: req.body.username,
                    password: req.body.password
                })
                .then(document => res.send(document))
                .catch(err => res.send(err))
        });
    } catch (err) {
        console.log(err)
    }
});

userRouter.use("/auth", async function (req, res) {
    try {

        mongoClient.connect(function (err, client) {

            if (err) {
                return console.log(err);
            }

            console.log(req.body)

            client.db("broker").collection("admins").findOne({
                username: req.body.username,
                password: req.body.password
            }).then(async (document) => {
                await res.send(document)
                client.close();
            })

        });

    } catch (err) {

        console.log(err)

    }
});

userRouter.use("/getUsers", async function (req, res) {
    try {

        mongoClient.connect(async function (err, client) {

            if (err) {
                return console.log(err);
            }

            await client.db("broker").collection("deposits").find({}).toArray().then(async (document) => {
                res.send(document)
            })

        });

    } catch (err) {

        console.log(err)

    }
});

userRouter.use("/removeProposal", async function (req, res) {
    try {

        mongoClient.connect(async function (err, client) {

            if (err) {
                return console.log(err);
            }
            console.log(req.body.id)
            // await client.db("broker").collection("deposits").findOn({ id: req.body.id }).then((data) => {
            await client.db("broker").collection("deposits").deleteOne({ id: req.body.id }).then((data) => {
                console.log(data)
            })
            const extra = {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [['Играть дальше']],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            }
            const message = "Я все проверила! Ты делаешь первые шаги в реальном трейдинге. Лови еще 10000 IQ Coins"
            // @ts-ignore
            bot.telegram.sendMessage(req.body.id, message, extra)
        });

    } catch (err) {

        console.log(err)

    }
});

module.exports = userRouter;