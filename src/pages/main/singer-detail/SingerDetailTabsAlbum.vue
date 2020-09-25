<template>
  <div class="tabs-album" ref="albumScroll" v-if="albumList.length > 0">
    <div class="album-scroll">
      <div v-for="item in albumList" :key="item.id" class="album-item">
        <div class="item-img">
          <img v-lazy="item.blurPicUrl" />
        </div>
        <div class="item-text">
          <div class="album-name">{{ item.name }}</div>
          <div class="album-date">
            <span>
              {{ dateFormat(item.publishTime) }}
            </span>
            <span>
              {{ `${item.size}首` }}
            </span>
          </div>
        </div>
      </div>
      <div class="all-album" v-if="more">
        <span>全部专辑</span>
        <BaseIcon icon="arrow-gray" />
      </div>
    </div>
  </div>
  <div v-else class="no-album">暂无专辑</div>
</template>

<script>
import { dateFormat } from "@/utils/utils";
import { initScrollY } from "@/utils/scroll";

export default {
  props: {
    albumList: {
      type: Array,
      default: () => []
    },
    more: {
      type: Boolean,
      default: false
    }
  },
  name: "SingerDetailTabsAlbum",
  methods: {
    dateFormat(date) {
      return dateFormat(date);
    }
  },
  mounted() {
    initScrollY(this.$refs.albumScroll);
  }
};
</script>

<style scoped lang="scss">
.tabs-album {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .album-scroll {
    padding-top: 0.2rem;

    .album-item {
      padding-bottom: 0.2rem;
      height: 1.1rem;
      @include flex-box(row, flex-start, center);

      .item-img {
        width: 1.1rem;
        height: 1.1rem;

        img {
          width: 100%;
          height: 100%;
          border-radius: $default-radius;
        }
      }

      .item-text {
        width: calc(100% - 1.4rem);
        height: 100%;
        margin-left: 0.3rem;
        @include flex-box(column, center, flex-start);

        .album-name {
          font-size: 0.27rem;
          font-weight: bold;
          margin-bottom: 0.1rem;
          @include text-one-ellipsis;
        }

        .album-date {
          color: $content;

          :first-child {
            margin-right: 0.1rem;
          }
        }
      }
    }
    .all-album {
      color: $content;
      font-size: 0.3rem;
      line-height: 0.3rem;
      @include flex-box(row, center, center);
    }
  }
}

.no-album {
  margin-top: 0.2rem;
  font-size: 0.3rem;
  color: $content;
  text-align: center;
}
</style>
