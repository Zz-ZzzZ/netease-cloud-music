<template>
  <div class="singer-detail" v-if="JSON.stringify(singerDetail) !== '{}'">
    <div class="detail-top">
      <img v-lazy="singerDetail.artist.picUrl" />
      <div class="singer-info">
        <span class="info-name">{{ singerDetail.artist.name }}</span>
        <span class="info-name" v-if="singerDetail.artist.trans"
          >({{ singerDetail.artist.trans }})</span
        >
        <div class="info-more">
          <div class="more-left">
            <div v-if="singerDetail.profile">
              <span>关注 {{ singerDetail.profile.follows }}</span>
              <span> | </span>
              <span
                >粉丝
                {{ playCountFormat(singerDetail.profile.followeds) }}</span
              >
            </div>
            <div class="left-desc" v-if="singerDetail.profile">
              {{ singerDetail.profile.mainAuthType.desc }}
            </div>
          </div>
          <div class="more-right">
            <div class="right-follow" v-if="!singerDetail.followed">
              + 关注
            </div>
            <div class="right-follow" v-else>已关注</div>
            <div class="right-contact" v-if="singerDetail.profile">
              + 发私信
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-bottom">
      <van-tabs v-model="active">
        <van-tab title="主页">内容 1</van-tab>
        <van-tab title="歌曲">内容 2</van-tab>
        <van-tab title="专辑">内容 3</van-tab>
        <van-tab title="视频">内容 4</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { playCountFormat } from "@/utils/utils";
import { getSingerDescById } from "@/api/singer";
import { getUserInfoById } from "@/api/user";

export default {
  name: "SingerDetailInfo",
  data() {
    return {
      singerDetail: {},
      active: 1
    };
  },
  methods: {
    playCountFormat(count) {
      return playCountFormat(count);
    }
  },
  async created() {
    let id = this.$route.query.id;
    let singerResult = await getSingerDescById(id);
    if (singerResult.status === 200) {
      if (singerResult.data.artist.accountId) {
        let userResult = await getUserInfoById(
          singerResult.data.artist.accountId
        );
        if (userResult.status === 200) {
          this.singerDetail = singerResult.data;
          this.singerDetail.profile = userResult.data.profile;
        }
      } else {
        this.singerDetail = singerResult.data;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.singer-detail {
  width: 100%;
  height: 100%;
  font-size: 0.25rem;

  .detail-top {
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
      top: 3.5rem;
      left: 5%;

      .info-name {
        font-size: 0.4rem;
        font-weight: bold;
        color: #ffffff;
      }

      .info-more {
        margin-top: 0.15rem;
        color: $white-smoke;
        @include flex-box(row, space-between, center);

        .more-left {
          .left-desc {
            margin-top: 0.15rem;
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
            background: rgba(139, 135, 135, 0.7);
            border-radius: 0.3rem;
            padding: 0.1rem 0.2rem;
          }
        }
      }
    }
  }

  .detail-bottom {
    width: 100%;
    height: calc(100% - 5.45rem);
    background: #ffffff;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    position: relative;
    top: -0.55rem;
    overflow: hidden;
    /deep/.van-tabs {
      width: $container-width;
      margin: 0 auto;
    }
    /deep/.van-tab--active {
      color: $red;
      font-weight: bold;
    }
    /deep/.van-tabs__line {
      background-color: $red;
    }
    /deep/.van-tab__pane {
      margin: 0.2rem 0;
    }
  }
}
</style>
