<template>
  <div class="result-all">
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
          />
          <div class="check-more">
            <div>{{ allDataObj.song.moreText }}</div>
            <BaseIcon icon="arrow-gray" />
          </div>
        </template>
      </TheLayoutCardContainer>
    </div>
    <div v-if="allDataObj.playList">
      <TheLayoutCardContainer>
        <template v-slot:top-left>歌单</template>
        <template v-slot:bottom>
          <div
            class="play-list"
            v-for="item in filterIndex(allDataObj.playList.playLists, 5)"
            :key="item.id"
          >
            <img :src="item.coverImgUrl" />
            <div class="play-list-container">
              <div class="name">{{ item.name }}</div>
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
        </template>
      </TheLayoutCardContainer>
      <div class="check-more">
        <div>{{ allDataObj.playList.moreText }}</div>
        <BaseIcon icon="arrow-gray" />
      </div>
    </div>
    <div>
      <TheLayoutCardContainer>
        <template v-slot:top-left>视频</template>
      </TheLayoutCardContainer>
    </div>
  </div>
</template>

<script>
import TheLayoutCardContainer from "@/components/TheLayoutCardContainer";
import BaseSong from "@/components/BaseSong";
import { playCountFormat } from "@/utils/utils";
export default {
  props: {
    allDataObj: {
      type: Object,
      default: () => {}
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
    }
  },
  components: { BaseSong, TheLayoutCardContainer }
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
}

.check-more {
  line-height: 0.25rem;
  color: $content;
  font-size: 0.24rem;
  @include flex-box(row, center, center);
}
</style>
