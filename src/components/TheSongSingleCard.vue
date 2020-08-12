<template>
  <div class="song-single-card">
    <div class="card-top">
      <div class="top-title">{{ title }}</div>
      <div class="top-more">
        <slot></slot>
      </div>
    </div>

    <div class="card-bottom">
      <div
        class="bottom-song"
        v-for="songItem in songSingleList"
        :key="songItem.id"
      >
        <img v-lazy="songItem.picUrl" class="song-img" />
        <div class="song-info">
          <span class="info-name">{{ songItem.name }}</span>
          <span class="info-divider">-</span>
          <span
            class="info-artist"
            v-for="(artistItem, artistIndex) in songItem.song.artists"
            :key="artistItem.id"
          >
            {{
              songItem.song.artists.length - artistIndex === 1
                ? artistItem.name
                : `${artistItem.name}/`
            }}
          </span>
        </div>
        <BaseIcon icon="play-red" class="song-play-icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    songSingleList: {
      type: Array,
      default: () => []
    }
  },
  name: "TheSongSingleCard"
};
</script>

<style scoped lang="scss">
.song-single-card {
  width: 100%;
  height: 100%;
  overflow: hidden;
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
    height: 100%;
    overflow-x: scroll;
    margin-top: 0.2rem;
    flex-wrap: wrap;
    @include flex-box(column);

    .bottom-song {
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      width: 100%;
      height: 1.2rem;
      flex: none;

      @include flex-box(row, flex-start, center);

      .song-img {
        display: block;
        width: 1.2rem;
        border-radius: $default-radius;
      }

      .song-info {
        width: calc(100% - 1.4rem - 0.5rem);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.28rem;
        line-height: 0.3rem;

        .info-name {
          margin-left: 0.2rem;
          font-weight: 610;
          color: $title;
          vertical-align: middle;
        }

        .info-divider {
          margin: 0 0.15rem;
          //vertical-align: middle;
        }

        .info-artist {
          color: $content;
          font-size: 0.23rem;
          //margin-left: 0.05rem;
        }
      }

      .song-play-icon {
        margin-left: 0.2rem;
        width: 0.2rem;
        height: 0.2rem;
        border: 1px solid $border;
        border-radius: 50%;
        padding: 0.1rem;
      }
    }
  }
}
</style>
