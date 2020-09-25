<template>
  <div class="singer-detail" v-if="JSON.stringify(singerDetail) !== '{}'">
    <div class="detail-top">
      <div class="top-bg">
        <img v-lazy="singerDetail.artist.picUrl" />
        <div class="bg-mask"></div>
      </div>
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
              <span>粉丝 {{ playCount }}</span>
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
      <van-tabs v-model="active" animated lazy-render>
        <van-tab title="主页">
          <SingerDetailTabsIndex :desc="singerDetail.artist.briefDesc" />
        </van-tab>
        <van-tab title="歌曲">
          <SingerDetailTabsSong
            :play-list="singerDetail.hotSongs"
            :more="singerDetail.more"
          />
        </van-tab>
        <van-tab :title="`专辑 ${singerDetail.artist.albumSize}`">
          <SingerDetailTabsAlbum
            :album-list="albumList.hotAlbums"
            :more="albumList.more"
          />
        </van-tab>
        <van-tab :title="`视频 ${singerDetail.artist.mvSize}`">
          <SingerDetailTabsMv :mv-list="mvList.mvs" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { playCountFormat } from "@/utils/utils";
import { getSingerDescById } from "@/api/singer";
import { getUserInfoById } from "@/api/user";
import { getSongDetailById } from "@/api/song";
import { getSingerAlbumById } from "@/api/album";
import { getSingerMvById } from "@/api/mv";
import SingerDetailTabsIndex from "@/pages/discover-page/child/singer-detail/SingerDetailTabsIndex";
import SingerDetailTabsSong from "@/pages/discover-page/child/singer-detail/SingerDetailTabsSong";
import SingerDetailTabsAlbum from "@/pages/discover-page/child/singer-detail/SingerDetailTabsAlbum";
import SingerDetailTabsMv from "@/pages/discover-page/child/singer-detail/SingerDetailTabsMv";

export default {
  name: "SingerDetailInfo",
  components: {
    SingerDetailTabsMv,
    SingerDetailTabsAlbum,
    SingerDetailTabsSong,
    SingerDetailTabsIndex
  },
  data() {
    return {
      singerDetail: {},
      active: 0,
      albumList: [],
      mvList: []
    };
  },
  computed: {
    playCount() {
      return playCountFormat(this.singerDetail.profile.followeds);
    }
  },
  async created() {
    let id = this.$route.params.id;
    const result = await getSingerDescById(id);
    let trackIds = result.hotSongs.map(item => item.id);
    if (result.artist.accountId) {
      const { profile } = await getUserInfoById(result.artist.accountId);
      this.singerDetail = result;
      this.singerDetail.profile = profile;
    } else {
      this.singerDetail = result;
    }
    const { privileges } = await getSongDetailById(trackIds.toString());
    privileges.forEach((item, index) => {
      this.singerDetail.hotSongs[index]["maxbr"] = item.maxbr;
      this.singerDetail.hotSongs[index]["songFee"] = item.fee;
    });
    this.albumList = await getSingerAlbumById(id);
    this.mvList = await getSingerMvById(id);
  }
};
</script>

<style scoped lang="scss">
.singer-detail {
  width: 100%;
  height: 100%;
  background: #747d8c;

  .detail-top {
    width: 100%;
    height: 6rem;
    position: relative;
    top: 0;
    left: 0;

    .top-bg {
      img {
        width: 100%;
        height: 100%;
      }

      .bg-mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2);
      }
    }

    .singer-info {
      width: $container-width;
      position: absolute;
      top: 3.5rem;
      left: 3%;
      font-size: 0.25rem;

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
      height: 100%;
      margin: 0 auto;
    }
    /deep/.van-tab--active {
      color: $red;
      font-weight: bold;
    }
    /deep/.van-tabs__line {
      background-color: $red;
      z-index: 0;
    }
    /deep/.van-tabs__content {
      height: calc(100% - 44px);
    }
    /deep/.van-tab__pane {
      height: 100%;
    }
  }
}
</style>
