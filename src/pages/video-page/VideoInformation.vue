<template>
  <div class="video-info">
    <div class="main-container">
      <div class="title">{{ videoInfo.name }}</div>
      <div class="count-tag">
        <p>{{ playCountFormat(videoInfo.playCount) }}次观看</p>
        <div v-for="item in videoInfo.videoGroup" :key="item.id" class="tag">
          {{ item.name }}
        </div>
      </div>
      <div class="publish-time">{{ videoInfo.publishTime }} 发布</div>
      <div class="desc">{{ videoInfo.desc }}</div>
    </div>
    <div class="divider-small"></div>
    <div class="singer">
      <img :src="singerImg" />
      <div class="singer-name">{{ videoInfo.artistName }}</div>
      <BaseIcon icon="arrow-gray" />
    </div>
    <div class="divider-large"></div>
  </div>
</template>
<script>
import { playCountFormat } from "@/utils/utils";

export default {
  name: "VideoInformation",
  props: {
    videoInfo: Object,
    singerImg: String
  },
  methods: {
    playCountFormat(count) {
      return playCountFormat(count);
    }
  }
};
</script>
<style scoped lang="scss">
.video-info {
  width: 100%;
  padding-top: 0.2rem;
  letter-spacing: 0.01rem;

  .main-container {
    width: $container-width;
    margin: 0 auto 0.3rem auto;
    .title {
      font-size: 0.35rem;
      color: $title;
      font-weight: bold;
    }

    .count-tag {
      width: 100%;
      margin-top: 0.2rem;
      color: $content;
      line-height: 0.23rem;
      overflow: auto;
      @include flex-box(row, flex-start, center);

      p {
        flex: none;
      }

      .tag {
        flex: none;
        margin-left: 0.2rem;
        color: $gray;
        background: $white-smoke;
        padding: 0.08rem 0.2rem;
        border-radius: 30px;
      }
    }
    .publish-time {
      color: $gray;
      margin-top: 0.2rem;
      font-size: 0.25rem;
    }

    .desc {
      color: $gray;
      margin-top: 0.2rem;
      font-size: 0.25rem;
      line-height: 0.45rem;
    }
  }

  .singer {
    width: $container-width;
    margin: 0 auto 0 auto;
    height: 1.2rem;
    @include flex-box(row, flex-start, center);

    img {
      object-fit: cover;
      border-radius: 100%;
      width: 0.7rem;
      height: 0.7rem;
    }

    .singer-name {
      flex: 1;
      font-size: 0.27rem;
      margin-left: 0.2rem;
    }
  }
}

.divider-small {
  border: 0.1px solid $border;
}
.divider-large {
  border: 4px solid $border;
}
</style>
