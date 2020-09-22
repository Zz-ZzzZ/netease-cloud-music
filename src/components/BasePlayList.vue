<template>
  <div class="base-playlist" @click="setPlayListId()">
    <img v-lazy="picUrl" class="playlist-img" />
    <div class="playlist-name van-multi-ellipsis--l2">{{ name }}</div>
    <div class="playlist-play-count">
      <BaseIcon icon="play-count" class="playlist-play-icon" />
      <div>{{ playCountFormat(playCount) }}</div>
    </div>
  </div>
</template>

<script>
import { playCountFormat } from "@/utils/utils";
export default {
  props: ["picUrl", "name", "playCount"],
  name: "BasePlayList",
  methods: {
    setPlayListId() {
      this.$emit("setPlayListId");
    },
    playCountFormat(id) {
      return playCountFormat(id);
    }
  }
};
</script>

<style scoped lang="scss">
.base-playlist {
  width: 2.1rem;
  height: 100%;
  flex: none;
  position: relative;
  @include flex-box(column);

  .playlist-img {
    display: block;
    width: 100%;
    border-radius: $default-radius;
  }

  .playlist-name {
    margin-top: 0.1rem;
    color: $title;
    font-size: 0.21rem;
    line-height: 0.33rem;
  }

  .playlist-play-icon {
    width: 0.25rem;
    height: 0.25rem;
  }

  .playlist-play-count {
    position: absolute;
    top: 0.05rem;
    right: 0.05rem;
    color: #ffffff;
    font-size: 0.2rem;
    @include flex-box(row, center, center);
  }
}
</style>
