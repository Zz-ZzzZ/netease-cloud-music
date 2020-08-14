<template>
  <div class="base-song">
    <div class="base-song-for" v-for="(song, index) in songList" :key="index">
      <div class="song-index">{{ index + 1 }}</div>
      <div class="song-info van-ellipsis">
        <p class="info-name">{{ song.al.name }}</p>
        <div class="info-author">
          <p v-for="(ar, index) in song.ar" :key="ar.id">
            {{ song.ar.length - index === 1 ? ar.name : `${ar.name}/` }}
          </p>
          <p>{{ `- ${song.al.name}` }}</p>
        </div>
      </div>
      <div class="song-mv">
        <BaseIcon icon="shipin" v-if="song.mv !== 0" />
      </div>
      <div class="song-more">
        <BaseIcon icon="gengduo" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songList: {
      type: Array,
      default: () => []
    }
  },
  name: "BaseSong"
};
</script>

<style scoped lang="scss">
.base-song {
  width: 100%;

  .base-song-for {
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
      }
      .info-author {
        margin-top: 0.1rem;
        color: $content;
        font-size: 0.21rem;
        @include flex-box(row, flex-start, center);

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
}
</style>
