const Discord = require('discord.js');
const fetch = require('node-fetch');

let config = {
    groupId: '2859030',
    groupIconURL: 'https://trello-logos.s3.amazonaws.com/157b03353e1faf3ebf3c24450c496ee5/170.png',
    webhookId: '1242009937823924265',
    webhookToken: 'pueB0Oib-3F5Jr5YDbzkwfln21GM8esogFyOzHRvRjpOY533wXmFtTRJ5iGWj5rVyr-R'
}

let client = new Discord.WebhookClient(config.webhookId, config.webhookToken);

let milestones = ['200000'];
let currentCount = 0;
let firstCheck = true;

let refreshCount = async () => {
    let groupResponse = await fetch(`https://groups.roblox.com/v1/groups/${config.groupId}`);
    let groupBody = await groupResponse.json();
    let newCount = groupBody.memberCount;
    let amountLeft = newCount - 200000
    if(firstCheck === true) {
        firstCheck = false;
        currentCount = newCount;
        return setTimeout(refreshCount, 60);
    }
    if(milestones.some(milestone => newCount > milestone && currentCount < milestone)) {
        let milestoneReached = milestones.find(milestone => newCount > milestone && currentCount < milestone);
        let embed = new Discord.MessageEmbed();
        embed.setThumbnail(config.groupIconURL);
        embed.setTitle('🎊 Milestone reached!');
        embed.setDescription(`${groupBody.name} just hit the ${milestoneReached} group member count milestone!`);
        embed.setColor('#84b060');
        return client.send(embed);
    }
    if(newCount !== currentCount) {
        if(newCount > currentCount) {
            let embed = new Discord.MessageEmbed();
            embed.setThumbnail(https://cdn.discordapp.com/attachments/1088970007465164942/1200403725974515722/Verde_Logo_copy.png?ex=664bde56&is=664a8cd6&hm=894e2daaf4faf50ffb77352cb58e56aed3ec575cb5124edce1015d6b7a2860ba&);
            embed.setTitle('🎉 New member!');
            embed.setDescription(`${groupBody.name} just reached ${newCount} members! We are ${amountLeft} away from 200,000 members!`);
            embed.setColor('#d96370');
            return client.send(embed);
        }
    }
    currentCount = newCount;
    setTimeout(refreshCount, 60);
}

refreshCount();
console.log('Started member counter!');
