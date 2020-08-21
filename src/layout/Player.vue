<template>
  <div class="player" v-if="a">
    <div></div>
  </div>
  <div class="mini-player" v-else>
    <div class="mini-img">
      <img v-lazy="songInfo.songInfo.picUrl" />
    </div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
import { checkSongStatus, getSongUrlById } from "@/api/song";

export default {
  name: "Player",
  data() {
    return {
      a: false,
      url: ""
    };
  },
  methods: {
    async getSongUrlById(id) {
      let statusResult = await checkSongStatus(id);
      if (statusResult.data.success) {
        let songUrlResult = await getSongUrlById(id);
        if (songUrlResult.status === 200) {
          this.url = statusResult.data.url;
        }
      }
    }
  },
  computed: {
    songInfo() {
      return this.$store.getters["songInfo/getSongInfo"];
    }
  },
  watch: {
    songInfo: {
      handler(params) {
        this.getSongUrlById(params.songInfo.id);
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="scss">
.player {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #747d8c;
  display: none;
}
.mini-player {
  position: absolute;
  bottom: 0;
  left: 3%;
  width: $container-width;
  height: 1rem;
  background: #ffffff;
  border-top: 1px solid $divider;
  @include flex-box(row, flex-start, center);

  .mini-img {
    width: 0.7rem;
    height: 0.7rem;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>
