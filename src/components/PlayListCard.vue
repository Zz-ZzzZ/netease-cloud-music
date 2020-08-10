<template>
  <div class="play-list-card">
    <div class="card-top">
      <div class="top-title">{{ title }}</div>
      <div class="top-more">
        <BaseButton>
          {{ text }}
        </BaseButton>
      </div>
    </div>

    <div class="card-bottom">
      <div class="bottom-song" v-for="song in songList" :key="song.id">
        <img v-lazy="song.picUrl" class="song-img" />
        <div class="bottom-name van-multi-ellipsis--l2">{{ song.name }}</div>
        <div class="bottom-play-count">
          {{ playCountFormat(song.playCount) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { playCountFormat } from "@/utils/utils";
export default {
  props: ["title", "text", "songList"],
  name: "PlayListCard",
  methods: {
    playCountFormat(playCount) {
      return playCountFormat(playCount);
    }
  }
};
</script>

<style scoped lang="scss">
.play-list-card {
  width: 100%;
  overflow: hidden;
  height: 100%;
  font-size: 0.23rem;

  .card-top {
    width: 100%;
    @include flex-box(row, space-between, center);

    .top-title {
      font-size: 0.35rem;
      font-weight: 700;
      color: $title;
    }
  }

  .card-bottom {
    width: 100%;
    overflow-x: scroll;
    margin-top: 0.2rem;
    @include flex-box(row);

    .bottom-song {
      margin-right: 0.2rem;
      width: 2.1rem;
      height: 100%;
      flex: none;
      position: relative;
      @include flex-box(column);

      .song-img {
        display: block;
        width: 100%;
        border-radius: $default-radius;
      }

      .bottom-name {
        margin-top: 0.1rem;
        color: $title;
      }

      .bottom-play-count {
        position: absolute;
        top: 0.05rem;
        right: 0.05rem;
        color: #ffffff;
        font-size: 0.2rem;
      }
    }
  }
}
</style>
