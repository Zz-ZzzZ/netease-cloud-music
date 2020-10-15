import { get } from "@/api/http";
export const getSingerAlbumById = params =>
  get("/artist/album", { id: params });

export const getSingerAlbumDetailById = params => get("/album", { id: params });
