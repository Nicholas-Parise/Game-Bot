const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

var guess = 0;


var randomNum = [];
var Players = [];




client.once('ready', () => {

    console.log('Ready!')

    client.user.setActivity(`with depression || Prefix is ${prefix}`);


})

client.on('message', message => {



    function GuessingFun(guess, randomNum, member) {

        for (var i = 0; i < Players.length; i++) {

            if (member == Players[i]) {

                if (guess > randomNum[i]) {

                    message.reply("Too high");

                } else if (guess < randomNum[i]) {

                    message.reply("Too Low");

                } else if (guess == randomNum[i]) {

                    message.reply("YOU WIN!");
                    randomNum.splice(i, i + 1);
                    Players.splice(i, i + 1);
                }

            }

        }

    }


    function Start_Guessing(member) {

        message.reply(`Guess A number between 1 - 100 \n enter your guess with ${prefix}number \"number\" (number being you guess)`);

        var temp = 0;

        for (var i = 0; i < Players.length; i++) {

            if (Players[i] != member) {
                temp++;
            }
        }

        if (temp == Players.length) {

            Players.push(member);
            randomNum.push(Math.ceil(Math.random() * 100));
        }

        console.log("Players = " + Players);
        console.log("random Number = " + randomNum);


    }


    function Enter_Guess(randomNum) {

        var thisRan = false;
        let member = message.member.user.tag;

        for (var i = 0; i < Players.length; i++) {

            if (Players[i] == member, randomNum) {

                thisRan = true;
                break;
            }
        }

        if (thisRan == true) {

            guess = message.content
            guess = guess.replace(`${prefix}number `, "");



            GuessingFun(guess, randomNum, member)
        }


        if (thisRan == false) {
            message.reply(`You need to start a game to use this command if you have any problems use ${prefix}help`);
        }


    }

    const embed = {
        "color": 3447003,
        "footer": {},
        "thumbnail": {

        },
        "author": {
            "name": "Commands:"
        },
        "fields": [
            {
                "name": "Help",
                "value": "What do you think? it's the help screen"
            },
            {
                "name": "Commands",
                "value": `${prefix}help \n ${prefix}guess\n ${prefix}test`,
                "inline": true
            },
            {
                "name": "Description",
                "value": "what do you think?\nStarts guessing game\nShhhh very secret",
                "inline": true
            }

        ]
    };


    /////////////////////////////////////////////////////////


    if (message.content == `${prefix}test`) {

        console.log(message.content);

        let member = message.member.user.tag;

        message.reply(" :pray: " + "why hello there!")

    }

    if (message.content == `${prefix}help`) {

        message.channel.send({ embed });
    }

    if (message.content == `${prefix}guess`) {

        let member = message.member.user.tag;
        Start_Guessing(member);

    }

    if (message.content.includes(`${prefix}number`)) {

        let member = message.member.user.tag;
        Enter_Guess(randomNum);

    }



    if (message.content == ("no u") || message.content == ("No u") || message.content == ("no U")) {


        let user = message.author;

        if (!user.bot) {


            message.channel.send("No u ");
        }
    }


    if (!message.author.bot && message.content.includes("420") && message.content.includes("69")) {
        message.channel.send("Ha nice 420 AND 69!");
    }
    else if (!message.author.bot && message.content.includes("69")) {
        message.channel.send("ha funny sex number");
    }

    else if (!message.author.bot && message.content.includes("420")) {
        message.channel.send("ha funny drug number");
    }


    // part that runs if not right

    if (message.content.startsWith(prefix)) {

        if (message.content != `${prefix}test` && message.content != `${prefix}help` && message.content != `${prefix}guess` && message.content != `${prefix}number${guess}` && message.content != `${prefix}number ${guess}`) {

            message.channel.send("This is not a supported please use " + prefix + "help for a list of commands. \n If you wern't trying to call my bot sorry");
        }
    }



})


client.login(token);
