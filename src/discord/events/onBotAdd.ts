import { settings } from "@/settings";
import { Event } from "@discord/base";
import { formatEmoji } from "discord.js";

new Event({
    name: "guildCreate",
    async run(guild) {
      const emojisToAdd = [
        { name: 'database', image: 'https://cdn.discordapp.com/emojis/1211830384778674255.webp?size=64' },
        { name: 'up', image: 'https://cdn.discordapp.com/emojis/1193607996161392753.webp?size=64' },
        { name: 'minecraft', image: 'https://cdn.discordapp.com/emojis/1168064697086509056.gif?size=64' },
        { name: 'spawners', image: 'https://cdn.discordapp.com/emojis/1195067760384942100.webp?size=64' },
        { name: 'gold_ore', image: 'https://cdn.discordapp.com/emojis/1211839528411729920.webp?size=64' },
        { name: 'ranks', image: "https://cdn.discordapp.com/emojis/932346165654073415.webp?size=64"},
        { name: 'cow', image: "https://cdn.discordapp.com/emojis/841687836767682570.webp?size=64"},
        { name: 'blaze', image: "https://cdn.discordapp.com/emojis/892103795050418247.webp?size=64"},
        { name: 'spider', image: "https://cdn.discordapp.com/emojis/892103846782967899.webp?size=64"},
        { name: "star_wither", image: "https://cdn.discordapp.com/emojis/839024300236210176.webp?size=64"},
        { name: 'wither_skeleton', image: "https://cdn.discordapp.com/emojis/1195067597020995665.webp?size=128"},
        { name: 'skeleton', image: 'https://cdn.discordapp.com/emojis/1079777600341286912.gif?size=128'}
      ];
      
      try {
        for (const emojiData of emojisToAdd) {
          const existingEmoji = guild.emojis.cache.find(emoji => emoji.name === emojiData.name);
    
          if (!existingEmoji) {
            const emoji = await guild.emojis.create({
              attachment: emojiData.image,
              name: emojiData.name
            });
          }
        }
      }
      catch (error){
        console.log(`Error on guild ${guild.id}/${guild.name}: \n${error}`)
      }

    }
});
