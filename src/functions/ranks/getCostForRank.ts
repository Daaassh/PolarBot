import { ButtonInteraction, ChatInputCommandInteraction, Interaction } from "discord.js";
import { verify_user_exist } from "../economy/user_data";
import { verify_user_ranks_exist } from "../economy/user_rank";
import { get_user_rank } from "./getRankForUser";
import { UserData, UserRank, db } from "@/database";
import { createEmbed } from "@magicyan/discord";

export async function verifyAndBuyRank(interaction: ButtonInteraction<"cached">){
  await verify_user_exist(interaction)
  await verify_user_ranks_exist(interaction)
  const user_rank = await db.rank.get(interaction.user.id);
  const user_data = await db.users.get(interaction.user.id);
  const initial_cost = 100
  const cost = user_rank?.rank! * initial_cost
  if (user_data?.economy.gold! >= cost) {
    const user_data_for_db: UserData = {
      economy: {
        gold: user_data?.economy.gold! - cost,
        gems: user_data?.economy.gems!
      },
      guild_id: user_data?.guild_id!,
      user_id: user_data?.user_id!
    }
    const user_rank_for_db: UserRank = {
      rank: user_rank?.rank! + 1,
      guild_id: user_data?.guild_id!,
      user_id: user_data?.user_id!
    }
    await db.rank.delete(interaction.user.id)
    await db.users.delete(interaction.user.id)
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
      description: `Voce precisa de ${cost} golds para comprar o seu rank\nE você esta com um total de ${user_data?.economy.gold} golds`,
    })
    await interaction.reply({embeds: [embed], ephemeral})
  }
  
}