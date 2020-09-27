<template>
  <div class="base-song">
    <div class="song-index">
      {{ index + 1 }}
    </div>
    <div class="song-info van-ellipsis" @click="playSong">
      <p class="info-name van-ellipsis">{{ name }}</p>
      <div class="info-author">
        <BaseSongTag v-if="fee === 1">VIP</BaseSongTag>
        <BaseSongTag v-if="maxbr > 320000">SQ</BaseSongTag>
        <div class="author-span">
          <span v-for="(ar, index) in author" :key="ar.id">
            {{ author.length - index === 1 ? ar.name : `${ar.name} / ` }}
          </span>
          <span>
            {{ ` - ${ablum}` }}
          </span>
        </div>
      </div>
    </div>
    <div class="song-mv">
      <BaseIcon icon="video" v-if="mv !== 0" />
    </div>
    <div class="song-more" @touchstart="touchMore">
      <BaseIcon icon="more-gray" />
    </div>
  </div>
</template>

<script>
import BaseSongTag from "@/components/BaseSongTag";
export default {
  components: { BaseSongTag },
  props: ["index", "name", "maxbr", "ablum", "author", "mv", "id", "fee"],
  name: "BaseSong",
  methods: {
    touchMore() {
      this.$emit("more");
    },
    playSong() {
      this.$emit("playSong");
    }
  },
  computed: {
    nowPlayIndex() {
      return this.$store.state.playList.nowPlayIndex + 1;
    }
  }
};
</script>

<style scoped lang="scss">
.base-song {
  width: 100%;
  height: 1.2rem;
  @include flex-box(row, flex-start, center);

  .song-index {
    width: 0.6rem;
    text-align: center;
    font-size: 0.28rem;
    color: $content;
  }

  .song-info {
    margin-left: 0.2rem;
    width: 4.8rem;

    .info-name {
      font-size: 0.27rem;
      color: $title;
      font-weight: bold;
    }

    .info-author {
      margin-top: 0.05rem;
      color: $content;
      line-height: 0.3rem;
      vertical-align: middle;
      font-size: 0.22rem;
      @include flex-box(row, flex-start, center);

      .author-span {
        flex: 1;
        @include text-one-ellipsis;
      }

      p:last-child {
        margin-left: 0.1rem;
      }

      p {
        font-size: 0.1rem;
      }
    }
  }

  .song-mv {
    margin: 0 0.3rem;
    width: 0.4rem;
    height: 0.4rem;

    :first-child {
      width: 100%;
      height: 100%;
    }
  }

  .song-more {
    width: 0.35rem;
    height: 0.35rem;

    :first-child {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
