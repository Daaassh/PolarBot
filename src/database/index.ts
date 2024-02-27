import { QuickDB } from "quick.db";
import { UserData } from "./interfaces/UserData";
import { UserRank } from "./interfaces/UserRank";

const filePath = rootTo("polarbot.sqlite");

const db = {
    users: new QuickDB<UserData>({ filePath, table: "users" }),
    rank: new QuickDB<UserRank>({ filePath, table: "ranks" })
};

export * from "./interfaces/UserData";
export * from "./interfaces/UserRank";
export { db };