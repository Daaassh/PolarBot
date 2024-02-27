import { Command } from "@/discord/base";
import { verify_user_exist } from "@/functions";
import { ApplicationCommandType } from "discord.js";

new Command({
    name: "farms",
    description: "Use para enviar o menu de farms",
    dmPermission,
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        await verify_user_exist(interaction)
        
    }
});