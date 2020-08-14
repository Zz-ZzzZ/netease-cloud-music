<template>
  <div class="song-list-card">
    <div class="card-top">
      <div class="top-title">{{ title }}</div>
      <div class="top-more">
        <slot></slot>
      </div>
    </div>

    <div class="card-bottom play-list-scroll">
      <div class="bottom-scroll" ref="playListScroll">
        <div
          class="bottom-song"
          v-for="item in playList"
          :key="item.id"
          @click="setPlayListId(item.id)"
        >
          <img v-lazy="item.picUrl" class="song-img" />
          <div class="song-name van-multi-ellipsis--l2">{{ item.name }}</div>
          <div class="song-play-count">
            <BaseIcon icon="playCount" class="song-play-icon" />
            <div>{{ playCountFormat(item.playCount) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { playCountFormat } from "@/utils/utils";
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    playList: {
      type: Array,
      default: () => []
    }
  },
  name: "ThePlayListCard",
  data() {
    return {
      scrollWidth: 0
    };
  },
  methods: {
    playCountFormat(playCount) {
      return playCountFormat(playCount);
    },
    setPlayListId(id) {
      this.$emit("click", id);
    }
  },
  updated() {
    this.$refs.playListScroll.style.width = `${this.$refs.playListScroll.scrollWidth}px`;
    // eslint-disable-next-line no-unused-vars
    const scroll = new BScroll(".play-list-scroll", {
      scrollX: true,
      eventPassthrough: "vertical",
      click: true,
      bounce: {
        left: false,
        right: false
      }
    });
  }
};
</script>

<style scoped lang="scss">
.song-list-card {
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
    overflow: hidden;
    margin-top: 0.2rem;

    .bottom-scroll {
      @include flex-box(row);

      .bottom-song {
        width: 2.1rem;
        height: 100%;
        margin-right: 0.2rem;
        flex: none;
        position: relative;
        @include flex-box(column);

        .song-img {
          display: block;
          width: 100%;
          border-radius: $default-radius;
        }

        .song-name {
          margin-top: 0.1rem;
          color: $title;
          font-weight: 610;
        }

        .song-play-icon {
          width: 0.25rem;
          height: 0.25rem;
        }

        .song-play-count {
          position: absolute;
          top: 0.05rem;
          right: 0.05rem;
          color: #ffffff;
          font-size: 0.2rem;
          @include flex-box(row, center, center);
        }
      }
    }
  }
}
</style>
