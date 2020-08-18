import { get } from "@/api/http";

export const getUserInfoById = params => get("/user/detail", { uid: params });
