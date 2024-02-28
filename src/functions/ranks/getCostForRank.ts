import { ButtonInteraction, ChatInputCommandInteraction, Interaction } from "discord.js";
import { verify_user_exist } from "../economy/user_data";
import { verify_user_ranks_exist } from "../economy/user_rank";
import { get_user_rank } from "./getRankForUser";
import { UserData, UserRank, db } from "@/database";
import { createEmbed, findEmoji } from "@magicyan/discord";
import { formatNumber } from "../utils/formatNumbers";

export async function verifyAndBuyRank(interaction: ButtonInteraction<"cached">){
  await verify_user_exist(interaction)
  await verify_user_ranks_exist(interaction)
  const user_rank = await db.rank.get(interaction.user.id);
  const user_data = await db.users.get(interaction.user.id);
  const emoji_gold = findEmoji(interaction.guild).byName("gold_ore")
  const initial_cost = 10000
  const cost = user_rank?.rank! * initial_cost
  if (user_data?.economy.gold! >= cost) {
    const user_data_for_db: UserData = {
      economy: {
        gold: user_data?.economy.gold! - cost,
        gems: user_data?.economy.gems! + 1
      },
      guild_id: user_data?.guild_id!,
      user_id: user_data?.user_id!
    }
    const user_rank_for_db: UserRank = {
      rank: user_rank?.rank! + 1,
      guild_id: user_data?.guild_id!,
      user_id: user_data?.user_id!
    }

    await db.rank.set(interaction.user.id, user_rank_for_db)
    await db.users.set(interaction.user.id, user_data_for_db)
    const user_rank_for_use = await get_user_rank(interaction)
    const rank = user_rank_for_use?.next_rank_verify() 
    const embed = createEmbed({
      title: "Parabens",
      description: `Parabens ${interaction.user}\n Seu rank foi atualizado com sucesso!\n> Agora você esta no rank: ${rank}`,
    })

    await interaction.reply({embeds: [embed], ephemeral: true})
  } 
  else {
    const embed = createEmbed({
      title: "Erro",
      description: `Voce precisa de ${await formatNumber(cost)} ${emoji_gold} para comprar o seu rank\nE você esta com um total de ${await formatNumber(user_data?.economy.gold!)} ${emoji_gold}`,
    })
    await interaction.reply({embeds: [embed], ephemeral})
  }
  
}