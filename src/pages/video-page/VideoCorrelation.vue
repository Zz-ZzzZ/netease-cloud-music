<template>
  <div class="video-correlation">
    <h3>相关视频</h3>
    <BaseVideo
      v-for="item in correlationList"
      :key="item.vid"
      :img-url="item.coverUrl"
      :play-count="item.playTime"
    >
      <template v-slot:name>
        <div class="correlation-name">
          <BaseSongTag v-if="item.vid">MV</BaseSongTag>
          <span>{{ item.title }}</span>
        </div>
      </template>
      <template v-slot:other>
        <div class="correlation-other">
          <span class="play-time">{{ secondToMs(item.durationms) }}</span>
          <span
            class="user-name"
            v-for="(ar, index) in item.creator"
            :key="ar.userId"
            >{{
              item.creator.length - index === 1
                ? ar.userName
                : `${ar.userName} / `
            }}</span
          >
        </div>
      </template>
    </BaseVideo>
  </div>
</template>

<script>
import BaseVideo from "@/components/BaseVideo";
import { secondToMs } from "@/utils/utils";
import BaseSongTag from "@/components/BaseSongTag";
export default {
  props: {
    correlationList: Array
  },
  methods: {
    secondToMs(second) {
      return secondToMs(second);
    }
  },
  name: "VideoCorrelation",
  components: { BaseSongTag, BaseVideo }
};
</script>

<style scoped lang="scss">
.video-correlation {
  width: $container-width;
  margin: 0.3rem auto 0 auto;

  h3 {
    margin-bottom: 0.3rem;
  }
}

/deep/.tag {
  font-size: 0.15rem;
  position: relative;
  bottom: 0.02rem;
  padding: 0.03rem 0.1rem;
}

.correlation-other {
  line-height: 0.25rem;
  @include flex-box(row, flex-start, center);

  .play-time {
    margin-right: 0.15rem;
  }

  .user-name {
    margin-left: 0.05rem;
  }
}
</style>
