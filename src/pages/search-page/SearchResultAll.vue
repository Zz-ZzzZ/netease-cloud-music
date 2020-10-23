<template>
  <div class="result-all" v-if="searchResult">
    <!--  单曲  -->
    <div v-if="searchResult.song">
      <TheLayoutCardContainer>
        <template v-slot:top-left>单曲</template>
        <template v-slot:top-right>
          <BaseButton icon="play-black" :show-icon="true">
            播放全部
          </BaseButton>
        </template>
        <template v-slot:bottom>
          <BaseSong
            v-for="(item, index) in filterIndex(searchResult.song.songs, 5)"
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
            v-if="searchResult.song.more"
            :text="searchResult.song.moreText"
            @click="checkMore(1)"
          />
        </template>
      </TheLayoutCardContainer>
    </div>

    <!--  歌单  -->
    <div v-if="searchResult.playList">
      <TheLayoutCardContainer>
        <template v-slot:top-left>歌单</template>
        <template v-slot:bottom>
          <div
            class="play-list"
            v-for="item in filterIndex(searchResult.playList.playLists, 5)"
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
            v-if="searchResult.playList.more"
            :text="searchResult.playList.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>

    <!-- 视频 -->
    <div v-if="searchResult.video">
      <TheLayoutCardContainer>
        <template v-slot:top-left>视频</template>
        <template v-slot:bottom>
          <BaseVideo
            v-for="item in searchResult.video.videos"
            :key="item.vid"
            :img-url="item.coverUrl"
            :play-count="item.playTime"
          >
            <template v-slot:name>
              <BaseSongTag v-if="!item.type">MV</BaseSongTag>
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
          </BaseVideo>
          <BaseCheckMore
            v-if="searchResult.video.more"
            :text="searchResult.video.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>

    <!-- Mlog -->
    <div v-if="searchResult.mlog">
      <TheLayoutCardContainer>
        <template v-slot:top-left>Mlog</template>
        <template v-slot:bottom>
          <div class="flex-mlog">
            <BaseMlog
              v-for="item in searchResult.mlog.mlogs"
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
            v-if="searchResult.mlog.more"
            :text="searchResult.mlog.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>

    <!--  主题  -->
    <div v-if="searchResult.talk">
      <TheLayoutCardContainer>
        <template v-slot:top-left>主题</template>
        <template v-slot:bottom>
          <BaseTalk
            v-for="item in searchResult.talk.talks"
            :key="item.talkId"
            :img-url="item.showCover.url"
            :title="item.talkName"
            :follow="item.follows"
            :join="item.participations"
          />
          <BaseCheckMore
            v-if="searchResult.talk.more"
            :text="searchResult.talk.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>

    <!--  歌手  -->
    <div v-if="searchResult.artist">
      <TheLayoutCardContainer>
        <template v-slot:top-left>歌手</template>
        <template v-slot:bottom>
          <BaseSinger
            v-for="item in searchResult.artist.artists"
            :key="item.id"
            :img-url="item.picUrl"
            :account="item.accountId"
          >
            <template>
              <BaseHighLight :text="item.name" :high-text="keyword" />
            </template>
          </BaseSinger>
          <BaseCheckMore
            v-if="searchResult.artist.more"
            :text="searchResult.artist.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>

    <!--  专辑  -->
    <div v-if="searchResult.album">
      <TheLayoutCardContainer>
        <template v-slot:top-left>专辑</template>
        <template v-slot:bottom>
          <BaseAlbum
            v-for="item in searchResult.album.albums"
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
            v-if="searchResult.album.more"
            :text="searchResult.album.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>

    <!--  电台  -->
    <div v-if="searchResult.djRadio">
      <TheLayoutCardContainer>
        <template v-slot:top-left>电台</template>
        <template v-slot:bottom>
          <BaseRadio
            v-for="item in searchResult.djRadio.djRadios"
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
            v-if="searchResult.djRadio.more"
            :text="searchResult.djRadio.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>

    <!--  用户  -->
    <div v-if="searchResult.user">
      <TheLayoutCardContainer>
        <template v-slot:top-left>用户</template>
        <template v-slot:bottom>
          <BaseUser
            v-for="item in searchResult.user.users"
            :key="item.id"
            :img-url="item.avatarUrl"
            :name="item.nickname"
            :followed="item.followed"
            :description="item.description"
          />
          <BaseCheckMore
            v-if="searchResult.user.more"
            :text="searchResult.user.moreText"
          />
        </template>
      </TheLayoutCardContainer>
    </div>
  </div>
</template>

<script>
import TheLayoutCardContainer from "@/components/TheLayoutCardContainer";
import { dateFormat, playCountFormat, secondToMs } from "@/utils/utils";
import BaseVideo from "@/components/BaseVideo";
import BaseMlog from "@/components/BaseMlog";
import BaseTalk from "@/components/BaseTalk";
import BaseSinger from "@/components/BaseSinger";
import BaseAlbum from "@/components/BaseAlbum";
import BaseCheckMore from "@/components/BaseCheckMore";
import BaseHighLight from "@/components/BaseHighLight";
import BaseSong from "@/components/BaseSong";
import BaseRadio from "@/components/BaseRadio";
import BaseUser from "@/components/BaseUser";
import { getSearchResultByKeyword } from "@/api/search";
import BaseSongTag from "@/components/BaseSongTag";
export default {
  props: {
    keyword: {
      type: String
    }
  },
  name: "SearchResultAll",
  data() {
    return {
      searchResult: undefined
    };
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
    },
    checkMore(index) {
      this.$parent.$parent.active = index;
    }
  },
  async created() {
    const { result } = await getSearchResultByKeyword(this.keyword);
    this.searchResult = result;
  },
  mounted() {
    console.log(this.$parent);
  },
  components: {
    BaseSongTag,
    BaseUser,
    BaseRadio,
    BaseSong,
    BaseHighLight,
    BaseCheckMore,
    BaseAlbum,
    BaseSinger,
    BaseTalk,
    BaseMlog,
    BaseVideo,
    TheLayoutCardContainer
  }
};
</script>

<style scoped lang="scss">
.result-all {
  color: $title;

  .play-list {
    height: 1.5rem;
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
