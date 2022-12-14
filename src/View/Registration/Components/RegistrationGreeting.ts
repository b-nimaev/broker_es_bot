async function greeting(ctx) {
    ctx.answerCbQuery()
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Зарегистрироваться',
                        callback_data: 'register',
                        url: 'https://iqoption.com'
                    },
                    {
                        text: 'Авторизоваться',
                        callback_data: 'auth'
                    }
                ]
            ]
        }
    }
    // await ctx.deleteMessage(ctx.update['callback_query'].message.message_id).then(res => console.log(res))
    await ctx.reply("Предлагаю тебе получить твои первые игровые 10 000 IQCoins, они нужны будут для того чтобы открывать позиции в игре и зарабатывать еще больше монет, которые ты потом сможешь обменять на призы. Для их получения тебе нужно просто зарегистрироваться в IQ Option. Не беспокойся для регистрации тебе понадобиться минимум данных - твое имя и адрес электронной почты, никаких платежных данных и привязок карт. При регистрации ты получишь $10000 на свой демо счет, на них ты сможешь торговать на платформе, тренировать навык, а если они закончаться, то сможешь их бесплатно восполнить. Скорее переходи по ссылке внизу, регистрируйся, а потом возвращайся сюда и я дам тебе 10000 IQCoins.")
    // @ts-ignore
    await ctx.reply('Заходи на платформу нажимай кнопку "Регистрация" в верхнем правом углу.  Вводи свою электронную почту, придумай пароль и подтверди, что тебе есть 18 лет. Вот и всё!', extra)
}

export default greeting