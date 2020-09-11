<template>
  <div class="comments-card">
    <div class="comments-zone-title">
      <h2></h2>
      <div class="select-comments-sort">
        <div class="comments-checked">推荐</div>
        <div>最热</div>
        <div>最新</div>
      </div>
    </div>
    <div
      class="scroll-container"
      ref="scroll"
      v-if="JSON.stringify(comments) !== '{}'"
    >
      <div>
        <div class="comments-hot" v-if="comments.hotComments.length > 0">
          <h4>精彩评论</h4>
          <div
            class="hot-user"
            v-for="item in comments.hotComments"
            :key="item.commentId"
          >
            <div class="user-header">
              <img v-lazy="item.user.avatarUrl" class="header-img" />
              <div style="flex: 1">
                <div class="header-name">{{ item.user.nickname }}</div>
                <div class="header-date">{{ dateFormat(item.time, 1) }}</div>
              </div>
              <div style="color: #9295a1">{{ item.likedCount }}</div>
              <BaseIcon icon="good" class="good-icon" />
            </div>
            <div class="user-center">{{ item.content }}</div>
            <div class="user-footer"></div>
          </div>
        </div>
        <div class="comments-normal">
          <h4>评论</h4>
          <div
            class="hot-user"
            v-for="item in comments.comments"
            :key="item.commentId"
          >
            <div class="user-header">
              <img v-lazy="item.user.avatarUrl" class="header-img" />
              <div style="flex: 1">
                <div class="header-name">{{ item.user.nickname }}</div>
                <div class="header-date">{{ dateFormat(item.time, 1) }}</div>
              </div>
              <div style="color: #9295a1">{{ item.likedCount }}</div>
              <BaseIcon icon="good" class="good-icon" />
            </div>
            <div class="user-center">{{ item.content }}</div>
            <div class="user-footer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "@/utils/utils";
import { initScrollY } from "@/utils/scroll";

export default {
  props: {
    comments: {
      type: Object,
      default: () => {}
    }
  },
  name: "TheCommentsCard",
  methods: {
    dateFormat(date, type) {
      return dateFormat(date, type);
    }
  },
  updated() {
    initScrollY(this.$refs.scroll);
  }
};
</script>

<style scoped lang="scss">
.comments-card {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  color: $title;

  .comments-zone-title {
    width: 100%;
    height: 0.35rem;
    background: #ffffff;
    overflow: hidden;
    @include flex-box(row, space-between, center);

    .select-comments-sort {
      width: 2rem;
      @include flex-box(row, space-between, center);

      .comments-checked {
        font-weight: bold;
      }
    }
  }

  .scroll-container {
    width: 100%;
    height: calc(100% - 0.35rem);
    overflow: hidden;

    .comments-hot,
    .comments-normal {
      margin: 0.2rem 0;

      .hot-user {
        width: 100%;
        margin: 0.2rem 0;

        .user-header {
          width: 100%;
          @include flex-box(row, flex-start, center);

          .header-img {
            width: 0.7rem;
            border-radius: 100%;
            margin-right: 0.2rem;
          }

          .header-name {
            font-size: 0.25rem;
          }

          .header-date {
            color: #bfbebe;
            font-size: 0.2rem;
            margin-top: 0.02rem;
          }

          .good-icon {
            width: 0.4rem;
            height: 0.4rem;
            margin-left: 0.05rem;
            margin-bottom: 0.05rem;
          }
        }

        .user-center {
          margin-top: 0.15rem;
          margin-left: 0.9rem;
          font-size: 0.25rem;
          padding-bottom: 0.2rem;
          border-bottom: 0.5px solid $white-smoke;
          color: #000000;
        }
      }
    }
  }
}
</style>
