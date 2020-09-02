<template>
  <div class="song-single-card">
    <div class="card-top">
      <div class="top-title">{{ title }}</div>
      <div class="top-more">
        <slot></slot>
      </div>
    </div>

    <div class="card-bottom song-single-scroll" ref="songSingleScroll">
      <div class="bottom-scroll" id="bottom-scroll">
        <div
          class="bottom-song"
          v-for="(songItem, index) in songSingleList"
          :key="songItem.id"
          @click="playSong(songSingleList, index)"
        >
          <div class="song-img">
            <img v-lazy="songItem.picUrl" class="song-img" />
          </div>
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
            <p class="info-album">专辑 - {{ songItem.song.album.name }}</p>
          </div>
          <BaseIcon icon="play-red" class="song-play-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initScrollY } from "@/utils/scroll";

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
  name: "TheSongSingleCard",
  methods: {
    playSong(playList, index) {
      this.$store.commit("playList/setPlayList", {
        playList,
        nowPlayIndex: index
      });
    }
  },
  mounted() {
    initScrollY(this.$refs.songSingleScroll);
  }
};
</script>

<style scoped lang="scss">
.song-single-card {
  font-size: 0.22rem;

  .card-top {
    width: 100%;
    height: 0.5rem;
    @include flex-box(row, space-between, center);

    .top-title {
      font-size: 0.32rem;
      font-weight: 700;
      color: $title;
    }
  }
  .card-bottom {
    width: 100%;
    height: calc(100% - 0.5rem);
    position: relative;
    top: 0;
    left: 0;
    overflow: hidden;

    .bottom-scroll {
      position: absolute;
      top: 0;
      left: 0;
      padding-top: 0.2rem;
      @include flex-box(column);

      .bottom-song {
        margin-bottom: 0.2rem;
        width: 7.05rem;
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
    }
  }
}
</style>
