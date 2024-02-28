import { QuickDB } from "quick.db";
import { UserData } from "./interfaces/UserData";
import { UserRank } from "./interfaces/UserRank";
import { UserSpawners } from "./interfaces/UserSpawners";

const filePath = rootTo("polarbot.sqlite");

const db = {
    users: new QuickDB<UserData>({ filePath, table: "users" }),
    rank: new QuickDB<UserRank>({ filePath, table: "ranks" }),
    spawners: new QuickDB<UserSpawners>({ filePath, table: "spawners" })
};

export * from "./interfaces/UserData";
export * from "./interfaces/UserRank";
export * from "./interfaces/UserSpawners";
export { db };