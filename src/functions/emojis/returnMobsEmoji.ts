import { findEmoji } from "@magicyan/discord";
import { Interaction, formatEmoji } from "discord.js";

export async function returnEmojis(interaction: Interaction){
  if (!interaction) return;

  const blazeEmoji = findEmoji(interaction.guild!)?.byName("blaze")!;
  const witherSkeletonEmoji = findEmoji(interaction.guild!)?.byName("wither_skeleton")!;
  const skeletonEmoji = findEmoji(interaction.guild!)?.byName("skeleton")!;
  const cowEmoji = findEmoji(interaction.guild!)?.byName("cow")!;
  const spiderEmoji = findEmoji(interaction.guild!)?.byName("spider")!;

  const values = ["cow","spider","skeleton","blaze","wither_skeleton"];
  const names = ["Vaca","Aranha","Esqueleto","Blaze","Esqueleto Wither"];
  const emojis = [cowEmoji, spiderEmoji, skeletonEmoji, blazeEmoji, witherSkeletonEmoji];

  return {
    names,
    values,
    emojis
  };

}