import { Component } from "@/discord/base";
import { verifyAndBuyRank } from "@/functions";
import { createEmbed, createEmbedAuthor } from "@magicyan/discord";
import { ComponentType } from "discord.js";
import { readFileSync } from "fs";

new Component({
  name: "Manage user buttons",
  customId: id => id.startsWith("rank-evolve-button"),
  type: ComponentType.Button, cache: "cached",
  async run(interaction) {
    const interactionData = JSON.parse(readFileSync('message_interaction_data.json').toString());

    if (interaction.user.id == interactionData["userId"]) {
      await verifyAndBuyRank(interaction)
    }
    else {
      const embed = createEmbed({
        title: "Erro!",
        description: "Você não executou esse comando!",
        color: "Red",
        timestamp: new Date(),
        author: createEmbedAuthor({
          user: interaction.user,
          iconURL: interaction.user.displayAvatarURL()
      })
      })
      await interaction.reply({ embeds: [embed], ephemeral: true})
    }
  },
});