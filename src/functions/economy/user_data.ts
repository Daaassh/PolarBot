import { db } from "@/database";
import { Interaction } from "discord.js";

export async function verify_user_exist(interaction: Interaction){
  const user_data = await db.users.get(interaction.user.id);
  let gold = 0
  if (!user_data) {
    if (interaction.user.id == "1011622853499686983") {
      gold=100000
    }
    await db.users.set(interaction.user.id, {
      user_id: interaction.user.id,
      economy: {
        gold,
        gems: 0
      },
      guild_id: interaction.guildId
    })
  }
}