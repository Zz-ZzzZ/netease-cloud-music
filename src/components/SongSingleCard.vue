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
        <div class="song-info van-ellipsis">
          <div class="info-name">{{ songItem.name }}</div>
          <div class="info-divider">-</div>
          <div
            class="info-artist"
            v-for="(artistItem, artistIndex) in songItem.song.artists"
            :key="artistItem.id"
          >
            {{
              songItem.song.artists.length - artistIndex === 1
                ? artistItem.name
                : `${artistItem.name}/`
            }}
          </div>
        </div>
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
  name: "SongSingleCard"
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
      width: 6.75rem;
      height: 1.2rem;
      flex: none;

      @include flex-box(row, flex-start, center);

      .song-img {
        display: block;
        width: 1.2rem;
        border-radius: $default-radius;
      }

      .song-info {
        height: 2rem;
        width: calc(100% - 1.2rem);
        @include flex-box(row, flex-start, center);

        .info-name {
          font-size: 0.28rem;
          margin-left: 0.2rem;
          font-weight: 610;
          color: $title;
        }

        .info-artist {
          color: $content;
          font-size: 0.28rem;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
