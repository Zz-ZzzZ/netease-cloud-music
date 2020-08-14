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
  // eslint-disable-next-line no-unused-vars
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
      if (songListResult.status === 200 && songListResult.data.songs.length > 0)
        this.songList = songListResult.data.songs;
    }
    console.log(this.songList);
  }
};
</script>

<style scoped lang="scss"></style>
