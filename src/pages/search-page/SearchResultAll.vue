<template>
  <div class="result-all">
    <!--  单曲  -->
    <div v-if="allDataObj.song">
      <TheLayoutCardContainer>
        <template v-slot:top-left>单曲</template>
        <template v-slot:top-right>
          <BaseButton icon="play-black" :show-icon="true">
            播放全部
          </BaseButton>
        </template>
        <template v-slot:bottom>
          <BaseSong
            v-for="(item, index) in filterIndex(allDataObj.song.songs, 5)"
            :key="item.id"
            :name="item.name"
            :fee="item.fee"
            :id="item.id"
            :author="item.ar"
            :ablum="item.al.name"
            :index="index"
            :maxbr="item.privilege.maxbr"
            :mv="item.mv"
            :hide-index="true"
          >
            <template v-slot:name>
              <BaseHighLight :text="item.name" :high-text="keyword" />
            </template>
            <template v-slot:author>
              <BaseHighLight
                v-for="(ar, index) in item.ar"
                :key="ar.id"
                :text="item.ar.length - index === 1 ? ar.name : `${ar.name} / `"
                :high-text="keyword"
              />
              <BaseHighLight
                :text="` - ${item.al.name}`"
                :high-text="keyword"
              />
            </template>
          </BaseSong>
          <BaseCheckMore
            v-if="allDataObj.song.more"
            :text="allDataObj.song.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>

    <!--  歌单  -->
    <div v-if="allDataObj.playList">
      <TheLayoutCardContainer>
        <template v-slot:top-left>歌单</template>
        <template v-slot:bottom>
          <div
            class="play-list"
            v-for="item in filterIndex(allDataObj.playList.playLists, 5)"
            :key="item.userId"
          >
            <img :src="item.coverImgUrl" />
            <div class="play-list-container">
              <div class="name">
                <BaseHighLight :text="item.name" :high-text="keyword" />
              </div>
              <div class="other">
                <span>{{ item.trackCount }}首 </span>
                <span> by {{ item.creator.nickname }} , </span>
                <span>{{ playCountFormat(item.playCount) }}次</span>
              </div>
              <div class="tag">
                <p v-for="item in item.officialTags" :key="item">{{ item }}</p>
              </div>
            </div>
          </div>
          <BaseCheckMore
            v-if="allDataObj.playList.more"
            :text="allDataObj.playList.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>

    <!-- 视频 -->
    <div v-if="allDataObj.video">
      <TheLayoutCardContainer>
        <template v-slot:top-left>视频</template>
        <template v-slot:bottom>
          <BaseMv
            v-for="item in allDataObj.video.videos"
            :key="item.vid"
            :img-url="item.coverUrl"
            :play-count="item.playTime"
          >
            <template v-slot:name>
              <BaseHighLight :text="item.title" :high-text="keyword" />
            </template>
            <template v-slot:other>
              <span>{{ secondToMs(item.durationms / 1000) }} </span>
              <span v-if="item.type"> by </span>
              <BaseHighLight
                v-for="(user, index) in item.creator"
                :key="user.userId"
                :text="
                  item.creator.length - index === 1
                    ? user.userName
                    : `${user.userName} / `
                "
                :high-text="keyword"
              />
            </template>
          </BaseMv>
          <BaseCheckMore
            v-if="allDataObj.video.more"
            :text="allDataObj.video.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>

    <!-- Mlog -->
    <div v-if="allDataObj.mlog">
      <TheLayoutCardContainer>
        <template v-slot:top-left>Mlog</template>
        <template v-slot:bottom>
          <div class="flex-mlog">
            <BaseMlog
              v-for="item in allDataObj.mlog.mlogs"
              :key="item.id"
              :img-url="item.resource.mlogBaseData.coverUrl"
              :title="item.resource.mlogBaseData.text"
              :user-img="item.resource.userProfile.avatarUrl"
              :user-name="item.resource.userProfile.nickname"
              :user-like="item.resource.mlogExtVO.likedCount"
              :tag="item.matchFieldContent"
            />
          </div>
          <BaseCheckMore
            v-if="allDataObj.mlog.more"
            :text="allDataObj.mlog.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>

    <!--  主题  -->
    <div v-if="allDataObj.talk">
      <TheLayoutCardContainer>
        <template v-slot:top-left>主题</template>
        <template v-slot:bottom>
          <BaseTalk
            v-for="item in allDataObj.talk.talks"
            :key="item.talkId"
            :img-url="item.showCover.url"
            :title="item.talkName"
            :follow="item.follows"
            :join="item.participations"
          />
          <BaseCheckMore
            v-if="allDataObj.talk.more"
            :text="allDataObj.talk.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>

    <!--  歌手  -->
    <div v-if="allDataObj.artist">
      <TheLayoutCardContainer>
        <template v-slot:top-left>歌手</template>
        <template v-slot:bottom>
          <BaseSinger
            v-for="item in allDataObj.artist.artists"
            :key="item.id"
            :img-url="item.picUrl"
            :account="item.accountId"
          >
            <template>
              <BaseHighLight :text="item.name" :high-text="keyword" />
            </template>
          </BaseSinger>
          <BaseCheckMore
            v-if="allDataObj.artist.more"
            :text="allDataObj.artist.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>

    <!--  专辑  -->
    <div v-if="allDataObj.album">
      <TheLayoutCardContainer>
        <template v-slot:top-left>专辑</template>
        <template v-slot:bottom>
          <BaseAlbum
            v-for="item in allDataObj.album.albums"
            :key="item.id"
            :img-url="item.picUrl"
          >
            <template v-slot:name>
              <BaseHighLight :text="item.name" :high-text="keyword" />
            </template>
            <template v-slot:other>
              <BaseHighLight
                v-for="(ar, index) in item.artists"
                :key="ar.id"
                :text="
                  item.artists.length - index === 1 ? ar.name : `${ar.name} / `
                "
                :high-text="keyword"
              />
              <span class="date">{{ dateFormat(item.publishTime, 2) }}</span>
            </template>
          </BaseAlbum>
          <BaseCheckMore
            v-if="allDataObj.album.more"
            :text="allDataObj.album.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>

    <!--  电台  -->
    <div v-if="allDataObj.djRadio">
      <TheLayoutCardContainer>
        <template v-slot:top-left>电台</template>
        <template v-slot:bottom>
          <BaseRadio
            v-for="item in allDataObj.djRadio.djRadios"
            :key="item.id"
            :img-url="item.picUrl"
          >
            <template v-slot:name
              ><BaseHighLight :text="item.name" :high-text="keyword"
            /></template>
            <template v-slot:ar>
              <BaseHighLight :text="item.dj.nickname" :high-text="keyword" />
            </template>
          </BaseRadio>
          <BaseCheckMore
            v-if="allDataObj.djRadio.more"
            :text="allDataObj.djRadio.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>

    <!--  用户  -->
    <div v-if="allDataObj.user">
      <TheLayoutCardContainer>
        <template v-slot:top-left>用户</template>
        <template v-slot:bottom>
          <BaseUser
            v-for="item in allDataObj.user.users"
            :key="item.id"
            :img-url="item.avatarUrl"
            :name="item.nickname"
            :followed="item.followed"
            :description="item.description"
          />
          <BaseCheckMore
            v-if="allDataObj.user.more"
            :text="allDataObj.user.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>
  </div>
</template>

<script>
import TheLayoutCardContainer from "@/components/TheLayoutCardContainer";
import { dateFormat, playCountFormat, secondToMs } from "@/utils/utils";
import BaseMv from "@/components/BaseMv";
import BaseMlog from "@/components/BaseMlog";
import BaseTalk from "@/components/BaseTalk";
import BaseSinger from "@/components/BaseSinger";
import BaseAlbum from "@/components/BaseAlbum";
import BaseCheckMore from "@/components/BaseCheckMore";
import BaseHighLight from "@/components/BaseHighLight";
import BaseSong from "@/components/BaseSong";
import BaseRadio from "@/components/BaseRadio";
import BaseUser from "@/components/BaseUser";
export default {
  props: {
    allDataObj: {
      type: Object,
      default: () => {}
    },
    keyword: {
      type: String
    }
  },
  name: "SearchResultAll",
  data() {
    return {};
  },
  methods: {
    filterIndex(array, filterIndex) {
      return array.filter((item, index) => index < filterIndex);
    },
    playCountFormat(count) {
      return playCountFormat(count);
    },
    secondToMs(second) {
      return secondToMs(second);
    },
    dateFormat(data, type) {
      return dateFormat(data, type);
    }
  },
  components: {
    BaseUser,
    BaseRadio,
    BaseSong,
    BaseHighLight,
    BaseCheckMore,
    BaseAlbum,
    BaseSinger,
    BaseTalk,
    BaseMlog,
    BaseMv,
    TheLayoutCardContainer
  }
};
</script>

<style scoped lang="scss">
.result-all {
  width: $container-width;
  height: 100%;
  margin: $margin-center;
  color: $title;
  overflow-y: auto;

  .play-list {
    margin-bottom: 0.15rem;
    @include flex-box(row, flex-start, center);

    img {
      width: 1.5rem;
      border-radius: $default-radius;
      margin-right: 0.2rem;
    }

    &-container {
      flex: 1;

      * {
        @include text-one-ellipsis;
      }
      .name {
        font-size: 0.27rem;
      }

      .other {
        margin: 0.1rem 0;
        color: $content;
      }

      .tag {
        font-size: 0.19rem;
        color: $red;
        background-color: #ffe2e4;
        display: inline-block;
        padding: 0 0.05rem;
      }
    }
  }

  .flex-mlog {
    @include flex-box(row, space-between, flex-start);
  }
}
</style>
