import { Interaction } from "discord.js";
import { verify_user_ranks_exist } from "../economy/user_rank";
import { verify_user_exist } from "../economy/user_data";
import { db } from "@/database";

export async function get_user_rank(interaction: Interaction){
  await verify_user_exist(interaction)
  await verify_user_ranks_exist(interaction)
  const user_rank = await db.rank.get(interaction.user.id);
  const ranks: string[] = [
    "Iniciante",
    "Aventureiro",
    "Explorador",
    "Mestre das Masmorras",
    "Matador de Monstros",
    "Conquistador",
    "Lendário",
    "Herói",
    "Mestre das Feras",
    "Senhor da Guerra",
    "Lorde das Trevas",
    "Protetor do Reino",
    "Guardião Supremo",
    "Cavaleiro De Dragoes",
    "Campeão Eterno"
  ];

  if (!user_rank) return

  return {
    rank: ranks[user_rank?.rank - 1],
    next_rank_verify: () => {
      if (user_rank?.rank === ranks.length) return "Maximo | Sem proximo rank"
      return ranks[user_rank?.rank]
    }
  }
}