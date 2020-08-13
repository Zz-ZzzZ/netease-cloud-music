<template>
  <div class="play-list-detail-card">
    <div class="card-top" v-if="JSON.stringify(playListDetail) !== '{}'">
      <img :src="playListDetail.coverImgUrl" class="top-bg" />
      <div class="top-playlist">
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playListDetail: {
      type: Object,
      default: () => {}
    }
  },
  name: "ThePlayListDetailCard"
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
            font-size: 0.26rem;
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
  }
}
</style>
