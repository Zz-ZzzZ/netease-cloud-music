<template>
  <div class="base-mv">
    <div class="mv-img">
      <img v-lazy="imgUrl" />
      <div class="mv-play-count">
        <BaseIcon icon="play-count" class="play-count-icon" />
        {{ playCountFormat(playCount) }}
      </div>
    </div>
    <div class="mv-info">
      <div class="mv-name">{{ name }}</div>
      <div class="mv-date">{{ publishTime }}</div>
    </div>
  </div>
</template>

<script>
import { playCountFormat } from "@/utils/utils";

export default {
  props: ["imgUrl", "name", "publishTime", "playCount"],
  name: "BaseMv",
  methods: {
    playCountFormat(count) {
      return playCountFormat(count);
    }
  }
};
</script>

<style scoped lang="scss">
.base-mv {
  overflow: hidden;
  flex-wrap: nowrap;
  flex: none;
  padding-bottom: 0.2rem;
  height: 1.5rem;
  @include flex-box(row, flex-start, center);

  .mv-img {
    width: 2.5rem;
    height: 1.5rem;
    position: relative;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: $default-radius;
    }

    .mv-play-count {
      position: absolute;
      top: 0.05rem;
      right: 0.05rem;
      color: $global-background;
      font-size: 0.19rem;
      @include flex-box(row, flex-start, center);

      .play-count-icon {
        width: 0.23rem;
        height: 0.23rem;
      }
    }
  }

  .mv-info {
    width: calc(100% - 2.8rem);
    margin-left: 0.2rem;

    .mv-name {
      font-size: 0.28rem;
      margin-bottom: 0.15rem;
      @include text-more-ellipsis(2);
    }

    .mv-date {
      font-size: 0.22rem;
      color: $content;
    }
  }
}
</style>
