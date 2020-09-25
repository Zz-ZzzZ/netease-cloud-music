<template>
  <div class="song-single">
    <div class="song-img">
      <img v-lazy="imgUrl" class="song-img" />
    </div>
    <div class="song-info">
      <span class="info-name">{{ songName }}</span>
      <span class="info-divider">-</span>
      <span
        class="info-artist"
        v-for="(artistItem, artistIndex) in artists"
        :key="artistItem.id"
      >
        {{
          artists.length - artistIndex === 1
            ? artistItem.name
            : `${artistItem.name}/`
        }}
      </span>
      <p class="info-album">专辑 - {{ albumName }}</p>
    </div>
    <BaseIcon icon="play-red" class="song-play-icon" />
  </div>
</template>

<script>
export default {
  props: ["imgUrl", "songName", "artists", "albumName"],
  name: "BaseSongSingle"
};
</script>

<style scoped lang="scss">
.song-single {
  margin-bottom: 0.2rem;
  width: 100%;
  height: 1.2rem;
  flex: none;
  @include flex-box(row, flex-start, center);

  .song-img {
    width: 1.2rem;
    height: 1.2rem;

    img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: $default-radius;
    }
  }

  .song-info {
    width: calc(100% - 1.2rem - 0.4rem);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.28rem;
    line-height: 0.3rem;
    padding-left: 0.2rem;

    .info-name {
      font-weight: 610;
      color: $title;
      vertical-align: middle;
    }

    .info-divider {
      margin: 0 0.15rem;
    }

    .info-artist {
      color: $content;
      font-size: 0.24rem;
    }

    .info-album {
      width: 100%;
      color: $content;
      margin-top: 0.2rem;
      font-size: 0.2rem;
      @include text-one-ellipsis;
    }
  }

  .song-play-icon {
    width: 0.2rem;
    height: 0.2rem;
    margin-right: 0.1rem;
    border: 1px solid $border;
    border-radius: 50%;
    padding: 0.1rem;
  }
}
</style>
