import { Command } from "@/discord/base";
import { get_user_rank, verify_user_exist } from "@/functions";
import { verify_user_ranks_exist } from "@/functions/economy/user_rank";
import { createEmbed, createEmbedAuthor, createRow, findEmoji } from "@magicyan/discord";
import { ButtonStyle, formatEmoji } from "discord.js";
import { ApplicationCommandType, ButtonBuilder } from "discord.js";
import { writeFileSync } from "fs";

new Command({
    name: "ranks",
    description: "Utilize para ver seu rank e evoluir o seu rank",
    dmPermission,
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
      await verify_user_exist(interaction)
      await verify_user_ranks_exist(interaction)
      const emoji = formatEmoji(findEmoji(interaction.guild).byName("up")?.id!)
      const rank = await get_user_rank(interaction)
      const rank_verify = rank?.next_rank_verify()
      const embed = createEmbed({
        title: `${emoji} | Ranks`,
        description: `Olá, ${interaction.user}\n### Você está no rank \n**「 __${rank?.rank}__ 」**\n### Proximo rank: \n**「 ${rank_verify} 」** `,
        author: createEmbedAuthor({
          user: interaction.user,
          imageSize: 32,
        }),
        timestamp: new Date(),
        color: "DarkAqua",
        // fields: [
        //   {name: "Obs", value: "Ranks iram aumentar seu ganho de golds", inline: true},
        //   {name: "Gemas", value: "Gemas tem uma chance de ser obtidas ao eliminar algum mob", inline: true}
        // ]
      })
      writeFileSync('message_interaction_data.json', JSON.stringify({ userId: interaction.user.id }));
      
      const row = createRow(
        new ButtonBuilder({label: "Evoluir De Rank", style: ButtonStyle.Secondary, customId: `rank-evolve-button`, emoji: emoji})
      )
      await interaction.reply({ embeds: [embed], components: [row]})
    }
});