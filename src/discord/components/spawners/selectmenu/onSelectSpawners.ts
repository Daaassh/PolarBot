import { db } from "@/database";
import { Component } from "@/discord/base";
import { createModalInput } from "@magicyan/discord";
import { ComponentType, ModalBuilder, TextInputStyle } from "discord.js";

new Component({
  customId: "spawners-menu-select",
  type: ComponentType.StringSelect, cache: "cached",
  async run(interaction) {
      const { values:[selected] } = interaction;
      const user_rank = await db.rank.get(interaction.user.id);
      const max_of_spawners: number = user_rank?.rank! * 10

      const modal = new ModalBuilder({
        custom_id: "spawners-modal",
        title: `Spawners | ${selected.charAt(0).toUpperCase() + selected.slice(1)}`,
        components: [
          createModalInput({
            customId: "spawners-modal-input",
            style: TextInputStyle.Short,
            label: "Quantia de Spawners",
            required: true,
            minLength: 1,
            maxLength: max_of_spawners
          })
        ]
      })

      await interaction.showModal(modal)
      
  },
});