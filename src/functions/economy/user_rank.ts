import { db } from "@/database";
import { Interaction } from "discord.js";

export async function verify_user_ranks_exist(interaction: Interaction){
  const user_data = await db.rank.get(interaction.user.id);
  if (!user_data) {
    await db.rank.set(interaction.user.id, {
      rank: 1,
      user_id: interaction.user.id,
      guild_id: interaction.guildId
    })
  }
}