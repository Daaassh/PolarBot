import { db } from "@/database";
import { Command } from "@/discord/base";
import { formatNumber, verify_user_exist } from "@/functions";
import { verify_user_ranks_exist } from "@/functions/economy/user_rank";
import { verifyUser } from "@/functions/utils/verifyUser";
import { createEmbed, createEmbedAuthor, findEmoji } from "@magicyan/discord";
import { ApplicationCommandType, formatEmoji, verifyString } from "discord.js";


new Command({
    name: "golds",
    description: "Use para ver quantos golds você tem!",
    dmPermission,
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
      await verifyUser(interaction)
      const user = await db.users.get(interaction.user.id);
      const emoji_gold = findEmoji(interaction.guild).byName("gold_ore")
      const emoji_star = findEmoji(interaction.guild).byName("star_wither")
      const emoji_minecraft = findEmoji(interaction.guild).byName("minecraft")
      const golds = await formatNumber(user?.economy.gold!)
      const emoji = formatEmoji(emoji_minecraft?.id!, true)
      const embed = createEmbed({
        title: `${emoji} | Golds`,
        description: `Você esta com um total de:\n> **${emoji_gold} ${golds}**\n> **${emoji_star} ${user?.economy.gems}**\n`,
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