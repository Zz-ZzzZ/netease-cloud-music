import { get } from "./http";

export const getBanner = () => get("/banner?type=2");
