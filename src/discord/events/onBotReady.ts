import { UserData, db } from "@/database";
import { Event } from "@discord/base";
import { schedule } from "node-cron"

new Event({
  name: "ready",
  once: true,
  async run() {
    const get_all_users = await db.users.all()
    const adicionarMoedas = async () => {
      const usuarios = await get_all_users;
      usuarios.filter((entry) => /^\d+$/.test(entry.id)).forEach(async (usuario) => {
        const userId = usuario.id;
        const moedasAtuais = await db.users.get(userId);
        const users_spawners = await db.spawners.get(userId);
        const amount = users_spawners?.cow!

        const users_date: UserData = {
          user_id: userId,
          economy: {
            gold: moedasAtuais?.economy.gold! + (amount * 250),
            gems: moedasAtuais?.economy.gems!,
          },
        }
        await db.users.set(userId, users_date);
      });
    };
    schedule('*/10 * * * * *', async () => {
      await adicionarMoedas();
    });
  }
})