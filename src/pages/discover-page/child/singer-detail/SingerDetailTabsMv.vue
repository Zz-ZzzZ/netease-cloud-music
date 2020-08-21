<template>
  <div class="tabs-mv" ref="mvScroll" v-if="mvList.length > 0">
    <div class="mv-scroll">
      <div class="mv-item" v-for="item in mvList" :key="item.id">
        <div class="item-img">
          <img v-lazy="item.imgurl" />
        </div>
        <div class="item-text">
          <div class="mv-name">{{ item.name }}</div>
          <div class="mv-date">{{ item.publishTime }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="no-mv">暂无视频</div>
</template>

<script>
import { initScrollY } from "@/utils/scroll";

export default {
  props: {
    mvList: {
      type: Array,
      default: () => []
    }
  },
  name: "SingerDetailTabsMv",
  mounted() {
    initScrollY(this.$refs.mvScroll);
  }
};
</script>

<style scoped lang="scss">
.tabs-mv {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .mv-scroll {
    padding-top: 0.2rem;

    .mv-item {
      overflow: hidden;
      flex-wrap: nowrap;
      flex: none;
      padding-bottom: 0.2rem;
      height: 1.5rem;
      @include flex-box(row, flex-start, center);

      .item-img {
        width: 2.3rem;
        height: 1.5rem;

        img {
          width: 100%;
          height: 100%;
          border-radius: $default-radius;
        }
      }

      .item-text {
        width: calc(100% - 2.8rem);
        margin-left: 0.3rem;
        .mv-name {
          font-size: 0.27rem;
          font-weight: bold;
          margin-bottom: 0.1rem;
          @include text-one-ellipsis;
        }

        .mv-date {
          color: $content;
        }
      }
    }
    .all-album {
      margin-top: 0.1rem;
      margin-bottom: 0.2rem;
      color: $content;
      font-size: 0.3rem;
      line-height: 0.3rem;
      @include flex-box(row, center, center);
    }
  }
}

.no-mv {
  margin-top: 0.2rem;
  font-size: 0.3rem;
  color: $content;
  text-align: center;
}
</style>
