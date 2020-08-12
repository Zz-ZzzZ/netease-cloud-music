<template>
  <div class="play-list-card">
    <div class="card-top">
      <div class="top-title">{{ title }}</div>
      <div class="top-more">
        <slot></slot>
      </div>
    </div>

    <div class="card-bottom">
      <div class="bottom-song" v-for="song in songList" :key="song.id">
        <img v-lazy="song.picUrl" class="song-img" />
        <div class="song-name van-multi-ellipsis--l2">{{ song.name }}</div>
        <div class="song-play-count">
          <BaseIcon icon="playCount" class="song-play-icon" />
          <div>{{ playCountFormat(song.playCount) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { playCountFormat } from "@/utils/utils";
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    songList: {
      type: Array,
      default: () => []
    }
  },
  name: "SongListCard",
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
  height: 100%;
  margin: 0.3rem 0;
  font-size: 0.22rem;

  .card-top {
    width: 100%;
    @include flex-box(row, space-between, center);

    .top-title {
      font-size: 0.32rem;
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

      .song-name {
        margin-top: 0.1rem;
        color: $title;
        font-weight: 610;
      }

      .song-play-icon {
        width: 0.25rem;
        height: 0.25rem;
      }

      .song-play-count {
        position: absolute;
        top: 0.05rem;
        right: 0.05rem;
        color: #ffffff;
        font-size: 0.2rem;
        @include flex-box(row, center, center);
      }
    }
  }
}
</style>
