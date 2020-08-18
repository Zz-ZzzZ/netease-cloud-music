import { get } from "@/api/http";

export const getSingerDescById = params => get("/artists", { id: params });
