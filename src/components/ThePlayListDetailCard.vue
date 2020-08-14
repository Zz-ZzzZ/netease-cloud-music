<template>
  <div class="play-list-detail-card">
    <div class="card-top" v-if="JSON.stringify(playListDetail) !== '{}'">
      <img :src="playListDetail.coverImgUrl" class="top-bg" />
      <div class="top-playlist">
        <div class="playlist-flex">
          <div class="playlist-cover">
            <img v-lazy="playListDetail.coverImgUrl" />
          </div>
          <div class="playlist-info">
            <p class="info-name van-multi-ellipsis--l2">
              {{ playListDetail.name }}
            </p>
            <div class="info-nickname">
              <img v-lazy="playListDetail.creator.avatarUrl" />
              <p>{{ playListDetail.creator.nickname }}</p>
              <BaseIcon icon="arrow" class="info-arrow-icon" />
            </div>
            <div class="info-description">
              <p class="van-multi-ellipsis--l2">
                {{ playListDetail.description }}
              </p>
              <BaseIcon icon="arrow" class="info-arrow-icon" />
            </div>
          </div>
        </div>
        <div class="playlist-more-action">
          <div>
            <BaseIcon icon="jianyi" />
            <p>{{ playListDetail.commentCount }}</p>
          </div>
          <div>
            <BaseIcon icon="fenxiang" />
            <p>{{ playListDetail.shareCount }}</p>
          </div>
          <div>
            <BaseIcon icon="xiazai" />
            <p>下载</p>
          </div>
          <div>
            <BaseIcon icon="xuanze" />
            <p>多选</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card-bottom play-list-detail-scroll">
      <div class="bottom-song-count">
        <div class="bottom-song-count-left">
          <BaseIcon icon="play" class="play-icon" />
          <p>播放全部</p>
          <p>(共{{ playListDetail.trackCount }}首)</p>
        </div>
        <div class="bottom-song-count-right">
          <p>+ 收藏({{ playListDetail.subscribedCount }})</p>
        </div>
      </div>
      <div class="bottom-scroll">
        <div ref="playListDetailScroll" class="play-list-detail-scroll">
          <BaseSong
            v-for="(item, index) in songList"
            :index="index + 1"
            :name="item.name"
            :maxbr="item.maxbr"
            :ablum="item.al.name"
            :author="item.ar"
            :mv="item.mv"
            :key="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSong from "@/components/BaseSong";
import BScroll from "better-scroll";
export default {
  components: { BaseSong },
  props: {
    playListDetail: {
      type: Object,
      default: () => ({})
    },
    songList: {
      type: Array,
      default: () => []
    }
  },
  name: "ThePlayListDetailCard",
  updated() {
    this.$refs.playListDetailScroll.style.height = `${this.$refs.playListDetailScroll.scrollHeight}px`;
    // eslint-disable-next-line no-unused-vars
    const scroll = new BScroll(".bottom-scroll", {
      scrollY: true,
      eventPassthrough: "horizontal",
      click: true,
      bounce: {
        top: false,
        bottom: false
      }
    });
  }
};
</script>

<style scoped lang="scss">
.play-list-detail-card {
  width: 100%;
  height: 100%;

  .card-top {
    width: 100%;
    height: 5rem;
    position: relative;
    overflow: hidden;

    .top-bg {
      width: 100%;
      height: 100%;
      -webkit-filter: blur(20px);
      -moz-filter: blur(20px);
      -ms-filter: blur(20px);
      filter: blur(50px);
      transform: scale(3);
    }

    .top-playlist {
      width: 90%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 5%;
      @include flex-box(column, center, center);

      .playlist-flex {
        width: 100%;
        @include flex-box(row, flex-start, center);

        .playlist-cover {
          width: 2.5rem;
          height: 2.5rem;

          img {
            width: 100%;
            height: 100%;
            border-radius: $default-radius;
            display: block;
          }
        }

        .playlist-info {
          width: calc(100% - 2.7rem);
          height: 2.5rem;
          padding-left: 0.2rem;
          @include flex-box(column, space-between);

          .info-name {
            font-size: 0.32rem;
            color: #ffffff;
            font-weight: bold;
          }

          .info-nickname {
            @include flex-box(row, flex-start, center);

            p {
              color: $white-smoke;
              font-size: 0.24rem;
              padding-left: 0.1rem;
            }

            img {
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 50%;
            }
          }
          .info-description {
            width: 100%;
            @include flex-box(row, flex-start, center);

            p {
              width: calc(100% - 0.5rem);
              white-space: pre-line;
              color: $divider;
              font-size: 0.22rem;
            }
          }
        }
      }

      .playlist-more-action {
        width: 100%;
        margin: 0.3rem 0;
        @include flex-box(row, space-around, center);
        font-size: 0.21rem;
        color: #ffffff;
        text-align: center;

        p {
          margin-top: 0.1rem;
          line-height: 0.21rem;
        }
      }
    }
  }

  .card-bottom {
    width: 100%;
    height: calc(100% - 4.45rem);
    background: #ffffff;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    position: relative;
    top: -0.55rem;
    overflow: hidden;
    .bottom-song-count {
      padding: 0.2rem 0;
      width: 100%;
      height: 0.6rem;
      @include flex-box(row, space-between, center);

      .bottom-song-count-left {
        margin-left: 0.35rem;
        @include flex-box(row, flex-start, center);

        .play-icon {
          border: 1px solid $title;
          border-radius: 50%;
          padding: 0.1rem;
          width: 0.15rem;
          height: 0.15rem;
        }

        p:nth-child(2) {
          font-size: 0.28rem;
          margin-left: 0.28rem;
          margin-right: 0.1rem;
          font-weight: bold;
        }

        p:nth-child(3) {
          color: $content;
        }
      }

      .bottom-song-count-right {
        margin-right: 0.35rem;
        //height: 0.7rem;
        color: #ffffff;
        padding: 0.13rem 0.15rem;
        background: $red;
        border-radius: 0.3rem;
      }
    }

    .bottom-scroll {
      width: 100%;
      height: 100%;
      margin: 0 3%;
      overflow: hidden;
      position: relative;
      top: 0;
      left: 0;
      @include flex-box(column, center, flex-start);

      // 这里加一个paddingBottom的原因是scroll只计算了整个滚动条的高度，
      // 没有计算滚动条上面全部播放的那一栏，因此要增加间距
      .play-list-detail-scroll {
        padding-bottom: 1rem;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
}
</style>
