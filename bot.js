const stickers = ['https://stickerswiki.ams3.cdn.digitaloceanspaces.com/dogsemideia/sticker_0.webp', 
'https://stickerswiki.ams3.cdn.digitaloceanspaces.com/fire_laviniya_vk/6401980.160.webp', 'https://stickerswiki.ams3.cdn.digitaloceanspaces.com/supernaturalstickk/7955778.160.webp',
'https://stickerswiki.ams3.cdn.digitaloceanspaces.com/spec2d77134350e7d26ea791e725b43733_by_stckrRobot/860419.160.webp',
'https://stickerswiki.ams3.cdn.digitaloceanspaces.com/Circuitmunna/3234521.160.webp', 'https://stickerswiki.ams3.cdn.digitaloceanspaces.com/a9cb5ddf_e036_47db_9a77_f14d3330ae02_by_sticat_bot/315813.160.webp']

const TelegramApi = require('node-telegram-bot-api')
const token = '6283728101:AAH_S3dnZVlB919RYaMTpPVvbtAAwNl2us4'
const bot = new TelegramApi(token, {polling: true});
const chats = {};

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard:
            [
                [{text: '1', callback_data: '1'},{text: '2', callback_data: '2'},{text: '3', callback_data: '3'}],
                [{text: '4', callback_data: '4'},{text: '5', callback_data: '5'},{text: '6', callback_data: '6'}],
                [{text: '7', callback_data: '7'},{text: '8', callback_data: '8'},{text: '9', callback_data: '9'}],
                [{text: '0', callback_data: '0'}],
            ]
    })
}
const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard:
            [
                [{text: 'Play Again', callback_data: 'Again'}],
            ]
    })
}

const startGame =async(chatID) =>{
    await bot.sendMessage(chatID, 'Let\s play a game! You need to guess a number from 0 to 9');
    const randomnum = Math.floor(Math.random() * 10);
    chats[chatID] = randomnum;
    await bot.sendMessage(chatID, 'Choose', gameOptions);
}
bot.setMyCommands([
    {command: '/start', description: 'Start the bot'},
    {command: '/info', description: 'Get information'},
    {command: '/game', description: 'Let\'s play'},
]);
const start = () =>{
    bot .on('message',  async msg => {
        const text = msg.text;
        const chatID = msg.chat.id;
        const first_name = msg.from.first_name;
        let last_name = msg.from.last_name;
        if(typeof(last_name) === 'undefined'){
            last_name = '';
        }
        const username = msg.from.username;
        if(text == '/start'){
            await bot.sendSticker(chatID, stickers[Math.floor(Math.random() * stickers.length)]);
            return bot.sendMessage(chatID, 'Hello! I am a bot that will help you.');
        }
        if(text == '/info'){
            return bot.sendMessage(chatID, 'Your name is ' + first_name +'' + last_name + ' And your username is '+ username + '');
        }
        if(text == '/game'){
            return startGame(chatID);
        }
    
        return bot.sendMessage(chatID, 'I don'+'t understand your command');
    
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatID = msg.message.chat.id;
        if(data === 'Again'){
          return startGame(chatID);rtGame(cha)
        }
        if(data == chats[chatID]){
            return bot.sendMessage(chatID, 'You guessed the number '+ data + ' correctly', againOptions);
        }else{
            return bot.sendMessage(chatID, 'You guessed the number '+ data+ ' incorrectly' + ' The correct answer was '+ chats[chatID], againOptions);
        }
        });
}

start();

// https://api.telegram.org/bot6283728101:AAH_S3dnZVlB919RYaMTpPVvbtAAwNl2us4/getUpdates?timeout=10000000000000