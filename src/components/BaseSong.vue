<template>
  <div class="base-song">
    <div class="song-index">{{ index }}</div>
    <div class="song-info van-ellipsis">
      <p class="info-name">{{ name }}</p>
      <div class="info-author">
        <p v-show="maxbr > 320000">SQ</p>
        <p v-for="(ar, index) in author" :key="ar.id">
          {{ author.length - index === 1 ? ar.name : `${ar.name}/` }}
        </p>
        <p>
          {{ ` - ${ablum}` }}
        </p>
      </div>
    </div>
    <div class="song-mv">
      <BaseIcon icon="shipin" v-if="mv !== 0" />
    </div>
    <div class="song-more" @touchstart="touchMore">
      <BaseIcon icon="gengduo" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["index", "name", "maxbr", "ablum", "author", "mv"],
  name: "BaseSong",
  methods: {
    touchMore() {
      this.$emit("touchstart");
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
      font-size: 0.3rem;
      color: $title;
      font-weight: bold;
    }

    .info-author {
      margin-top: 0.05rem;
      color: $content;
      font-size: 0.21rem;
      line-height: 0.21rem;
      @include flex-box(row, flex-start, center);

      p:first-child {
        color: $red;
        border: 0.75px solid $red;
        font-size: 0.15rem;
        border-radius: 0.05rem;
        padding: 0.01rem 0.1rem;
        font-weight: bold;
        margin-right: 0.1rem;
      }

      p:last-child {
        margin-left: 0.1rem;
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
