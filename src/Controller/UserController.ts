import { MongoClient } from "mongodb";
require("dotenv").config();

const dbname = process.env.DB_NAME;
let uri = <string>process.env.DB_CONN_STRING;
const client = new MongoClient(uri);

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

        let current_balance =
            await client
                .db(dbname)
                .collection("users")
                .findOne({ id: user.id })

        console.log(current_balance)

        // if (percentaly) {
        //     return await client.db(dbname)
        //         .collection("users")
        //         .findOneAndUpdate({ id: user.id }, { $set: { balance: parseFloat(current_balance.balance) + ((count / 100) * 91) } })
        //         .then(async (result) => console.log(result))
        // }

        // return await client.db(dbname)
        //     .collection("users")
        //     .findOneAndUpdate({ id: user.id }, { $set: { balance: parseFloat(current_balance.balance) + count } })
        //     .then(async (result) => console.log(result))

    } catch (err) { return err }
}

export const lose_coins = async function (user, count: number, percentaly: boolean) {
    try {
        await client.connect()

        let current_balance =
            await client
                .db(dbname)
                .collection("users")
                .findOne({ id: user.id })
        console.log(current_balance)

        if (percentaly) {
            // return await client.db(dbname)
            //     .collection("users")
            //     .findOneAndUpdate({ id: user.id }, { $set: { balance: parseFloat(current_balance.balance) - ((count / 100) * 100) } })
            //     .then(async (result) => console.log(result))
        }

        return await client.db(dbname)
            // .collection("users")
            // .findOneAndUpdate({ id: user.id }, { $set: { balance: parseFloat(current_balance.balance) - count } })
            // .then(async (result) => console.log(result))

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