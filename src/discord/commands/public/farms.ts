import { db } from "@/database";
import { Command } from "@/discord/base";
import { verifyUser } from "@/functions/utils/verifyUser";
import { createEmbed, createRow, findEmoji } from "@magicyan/discord";
import { ApplicationCommandType, ButtonBuilder, ButtonStyle } from "discord.js";

new Command({
    name: "farms",
    description: "Use para enviar o menu de farms ( Spawners )",
    dmPermission,
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        await verifyUser(interaction)
        const emoji = findEmoji(interaction.guild).byName("spawners")
        const cow_emoji = findEmoji(interaction.guild).byName("cow")
        const spawners_data = await db.spawners.get(interaction.user.id)
        if (!spawners_data) return
        const amount = spawners_data?.cow!
        const embed = createEmbed({
            title: `${emoji} | Spawners`,
            description: `Você tem uma quantia de: \n> **${amount} ${cow_emoji}**`,
            color: "DarkAqua",
            timestamp: new Date(),
        })
        // const row = createRow(
        //     new ButtonBuilder({label: "Coletar Ganhos", style: ButtonStyle.Secondary, customId: `spawners-button-collect`})
        // )
        await interaction.reply({ embeds: [embed]})
    }
});