import { db } from "@/database";
import { Interaction } from "discord.js";

export async function verify_user_spawners_exist(interaction: Interaction){
  const user_data = await db.spawners.get(interaction.user.id);
  if (!user_data) {
    await db.spawners.set(interaction.user.id, {
      cow: 1,
      user_id: interaction.user.id,
      guild_id: interaction.guildId
    })
  }
}