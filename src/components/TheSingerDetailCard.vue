<template>
  <div class="singer-detail-card" v-if="JSON.stringify(singerDetail) !== '{}'">
    <div class="card-top">
      <img v-lazy="singerDetail.artist.picUrl" />
      <div class="singer-info">
        <p class="info-name">{{ singerDetail.artist.name }}</p>
        <div class="info-more">
          <div class="more-left">
            <div>
              <span>关注 {{ singerDetail.profile.follows }}</span>
              <span> | </span>
              <span
                >粉丝
                {{ playCountFormat(singerDetail.profile.followeds) }}</span
              >
            </div>
            <div class="left-desc">
              {{ singerDetail.profile.mainAuthType.desc }}
            </div>
          </div>
          <div class="more-right">
            <div class="right-follow">+ 关注</div>
            <div class="right-contact">+ 发私信</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-bottom"></div>
  </div>
</template>

<script>
import { playCountFormat } from "@/utils/utils";

export default {
  props: {
    singerDetail: {
      type: Object,
      default: () => ({})
    }
  },
  name: "TheSingerDetailCard",
  methods: {
    playCountFormat(count) {
      return playCountFormat(count);
    }
  }
};
</script>

<style scoped lang="scss">
.singer-detail-card {
  width: 100%;
  height: 100%;
  font-size: 0.25rem;

  .card-top {
    width: 100%;
    height: 6rem;
    position: relative;
    top: 0;
    left: 0;

    img {
      width: 100%;
      height: 100%;
    }

    .singer-info {
      width: 90%;
      position: absolute;
      top: 3.7rem;
      left: 5%;

      .info-name {
        font-size: 0.4rem;
        font-weight: bold;
        color: #ffffff;
      }

      .info-more {
        margin-top: 0.1rem;
        color: $content;
        @include flex-box(row, space-between, center);

        .more-left {
          .left-desc {
            margin-top: 0.1rem;
          }
        }

        .more-right {
          color: #ffffff;
          @include flex-box(row, flex-start, center);

          .right-follow {
            background: $red;
            border-radius: 0.3rem;
            padding: 0.1rem 0.2rem;
          }

          .right-contact {
            margin-left: 0.1rem;
            background: rgba(139, 135, 135, 0.5);
            border-radius: 0.3rem;
            padding: 0.1rem 0.2rem;
          }
        }
      }
    }
  }
}
</style>
