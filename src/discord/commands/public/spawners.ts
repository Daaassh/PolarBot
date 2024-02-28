import { Command } from "@/discord/base";
import { returnEmojis, verify_user_exist } from "@/functions";
import { verify_user_ranks_exist } from "@/functions/economy/user_rank";
import { verifyUser } from "@/functions/utils/verifyUser";
import { createEmbed, createRow, findEmoji } from "@magicyan/discord";
import { ActionRow, ApplicationCommandType, SelectMenuComponentOptionData, StringSelectMenuBuilder, formatEmoji } from "discord.js";

new Command({
    name: "spawners",
    description: "Use para enviar o menu de spawners",
    dmPermission,
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
      await verifyUser(interaction)
      const emoji = findEmoji(interaction.guild).byName("spawners")
      const emojis_functions = await returnEmojis(interaction)
      const list_of_emojis = await emojis_functions?.emojis!

      if (!emojis_functions) return
      if (!list_of_emojis) return
      const embed = createEmbed({
        title: `${emoji} | Spawners`,
        description: "Selecione abaixo algum spawner\n> Para verificar o preço do spawner!",
        color: "DarkAqua",
        timestamp: new Date(),
      })
      const selectOptions: SelectMenuComponentOptionData[] = emojis_functions.values.map((value, index) => ({
        value: value,
        label: `${index + 1} - ${emojis_functions.names[index]}`,
        emoji: list_of_emojis[index]
      }));

      const row = createRow(new StringSelectMenuBuilder({
        customId: "spawners-menu-select",
        placeholder: "Selecione o spawner",
        options: selectOptions
      })
    );
    await interaction.reply({ embeds: [embed], components: [row], ephemeral})

    }
});