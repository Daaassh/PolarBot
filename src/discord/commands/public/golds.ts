import { db } from "@/database";
import { Command } from "@/discord/base";
import { verify_user_exist } from "@/functions";
import { verify_user_ranks_exist } from "@/functions/economy/user_rank";
import { createEmbed, createEmbedAuthor, findEmoji } from "@magicyan/discord";
import { ApplicationCommandType, formatEmoji } from "discord.js";


new Command({
    name: "golds",
    description: "Use para ver quantos golds você tem!",
    dmPermission,
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
      await verify_user_exist(interaction)
      await verify_user_ranks_exist(interaction)
      const user = await db.users.get(interaction.user.id);
      const emoji_gold = findEmoji(interaction.guild).byName("gold_ore")
      const emoji_minecraft = findEmoji(interaction.guild).byName("minecraft")
      const emoji = formatEmoji(emoji_minecraft?.id!, true)
      const embed = createEmbed({
        title: `${emoji} | Golds`,
        description: `Você esta com um total de:\n> **${emoji_gold} ${user?.economy.gold}**\n`,
        color: "DarkAqua",
        timestamp: new Date(),
        author: createEmbedAuthor({
          user: interaction.user,
          iconURL: interaction.user.displayAvatarURL()
        })
      })
      await interaction.reply({ embeds: [embed]})
    }
});