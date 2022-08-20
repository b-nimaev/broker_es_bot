import { MongoClient, WithId } from "mongodb";
require("dotenv").config();

const dbname = process.env.DB_NAME;
let uri = <string>process.env.DB_CONN_STRING;
const client = new MongoClient(uri);

interface DocumentForCoins extends WithId<Document> {
    balance: number
}

export const registerUser = async function (update) {
    try {
        await client.connect()
        return await client.db(dbname)
            .collection("users")
            .insertOne(update)
    } catch (err) {
        return false
    }
}


export const getUser = async function (update) {
    try {
        await client.connect()
        return await client.db(dbname)
            .collection("users")
            .findOne({ id: update.id })
            .then(async (user) => {
                if (user) {
                    return user
                } else {
                    return false
                }
            })
    } catch (err) {
        return false
    }
}

export const addEmail = async function (update, email) {
    try {
        await client.connect()
        return await client.db(dbname)
            .collection("users")
            .updateOne({ id: update.id }, { $set: { "balance": 10000, "email": email } }, { upsert: true })
    } catch (err) {
    }
}

export const addDeposit = async function (update) {
    try {
        await client.connect()
        return await client.db(dbname)
            .collection("deposits")
            .insertOne(update)
    } catch (err) {
        console.log(err)
    }
}

export const getEmail = async function (update) {
    try {
        await client.connect()
        return await client.db(dbname)
            .collection("users")
            .findOne({ id: update.id })
            .then(async (document) => {
                if (document) {
                    if (document.email) {
                        return document.email
                    } else {
                        return 'no e-mail'
                    }
                } else {
                    return 'no user'
                }
            })
    } catch (err) {
        return err
    }
}

export const add_coins = async function (user, count: number, percentaly: boolean) {
    try {
        await client.connect()

        return await client
            .db(dbname)
            .collection("users")
            .findOne({ id: user.id })
            .then(async (res: DocumentForCoins) => {
                if (res) {
                    if (res.balance) {
                        if (percentaly) {
                            return await client.db(dbname)
                                .collection("users")
                                .findOneAndUpdate({ id: user.id }, { "$set": { "balance": <number>res.balance + ((<number>count / 100) * 91) } }, { upsert: true })
                                .then(async (result) => console.log(result))
                        }

                        return await client.db(dbname)
                            .collection("users")
                            .findOneAndUpdate({ id: user.id }, { "$set": { "balance": <number>res.balance + <number>count } }, { upsert: true })
                            .then(async (result) => console.log(result))
                    }
                }
            })


    } catch (err) { return err }
}

export const lose_coins = async function (user, count: number, percentaly: boolean) {

    try {
        await client.connect()

        return await client
            .db(dbname)
            .collection("users")
            .findOne({ id: user.id })
            .then(async (res: DocumentForCoins) => {
                if (res) {
                    if (res.balance) {

                        let fin = <number>res.balance - ((count / 100) * 100)

                        if (percentaly) {
                            return await client.db(dbname)
                                .collection("users")
                                .findOneAndUpdate({ "id": user.id }, { "$set": { "balance": fin } })
                                .then(async (result) => console.log(result))
                        }

                        return await client.db(dbname)
                            .collection("users")
                            .findOneAndUpdate({ "id": user.id }, { "$set": { "balance": fin } })
                            .then(async (result) => console.log(result))
                    }
                }
            })



    } catch (err) { return err }
}

export const getInterface = async function (field, name) {
    try {
        await client.connect()
        return await client.db(dbname)
            .collection("bin")
            .findOne({ field: field, id: name })
    } catch (err) {
        return err
    }
}