<template>
  <ThePlayListDetailCard
    :play-list-detail="playListDetail"
    :song-list="songList"
  />
</template>

<script>
import ThePlayListDetailCard from "@/components/ThePlayListDetailCard";
import {
  getPlayListDetailById,
  getSongDetailByPlayListSongId
} from "@/api/song";
export default {
  name: "PlayListDetailInfo",
  data() {
    return {
      playListDetail: {},
      songList: []
    };
  },
  components: { ThePlayListDetailCard },
  async mounted() {
    let id = this.$route.query.id;
    let playlistResult = await getPlayListDetailById(id);
    let trackIds = [];
    if (playlistResult.status === 200) {
      this.playListDetail = playlistResult.data.playlist;
      playlistResult.data.playlist.trackIds.forEach(item => {
        trackIds.push(item.id);
      });
      let songListResult = await getSongDetailByPlayListSongId(
        trackIds.toString()
      );
      // 把获得到的音质信息添加到 音乐信息里（获取最大音质）
      if (
        songListResult.status === 200 &&
        songListResult.data.songs.length > 0
      ) {
        this.songList = songListResult.data.songs;
        songListResult.data.privileges.forEach((item, index) => {
          this.songList[index]["maxbr"] = item.maxbr;
        });
      }
    }
  }
};
</script>

<style scoped></style>
