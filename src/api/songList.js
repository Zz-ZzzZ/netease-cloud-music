import { get } from "@/api/http";

export const getSongList = limit => get("/personalized", limit);
