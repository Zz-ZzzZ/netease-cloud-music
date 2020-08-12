<template>
  <div class="play-list-detail-card">
    <div class="card-top" v-if="JSON.stringify(playListDetail) !== '{}'">
      <img :src="playListDetail.coverImgUrl" class="top-bg" />
      <div class="top-playlist">
        <div class="playlist-cover">
          <img v-lazy="playListDetail.coverImgUrl" />
        </div>
        <div class="playlist-info">
          <p class="info-name">{{ playListDetail.name }}</p>
          <p class="info-nickname">{{ playListDetail.creator.nickname }}</p>
          <p class="info-description van-multi-ellipsis--l2">
            {{ playListDetail.description }}
          </p>
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
  font-size: 0.25rem;
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
      width: $container-width;
      height: 100%;
      position: absolute;
      top: 0;
      left: 3%;
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
          font-size: 0.35rem;
          color: #ffffff;
          font-weight: 610;
        }
        .info-nickname {
          color: $white-smoke;
          //margin-top: 0.2rem;
        }
        .info-description {
          color: $divider;
          //margin-top: 0.2rem;
        }
      }
    }
  }
}
</style>
