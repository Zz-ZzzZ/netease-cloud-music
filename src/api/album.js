import { get } from "@/api/http";
export const getSingerAlbumById = params =>
  get("/artist/album", { id: params });
