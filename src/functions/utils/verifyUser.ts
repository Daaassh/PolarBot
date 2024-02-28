import { Interaction } from "discord.js"
import { verify_user_exist } from "../economy/user_data"
import { verify_user_ranks_exist } from "../economy/user_rank"
import { verify_user_spawners_exist } from "../economy/user_spawners"

export async function verifyUser(interaction: Interaction){
  await verify_user_spawners_exist(interaction)
  await verify_user_exist(interaction)
  await verify_user_ranks_exist(interaction)
}