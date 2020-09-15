<template>
  <div class="comments-card">
    <div class="scroll-container" ref="scroll">
      <div>
        <div class="comments-normal" v-if="comments && comments.length > 0">
          <h4>评论({{ total }})</h4>
          <div class="hot-user" v-for="item in comments" :key="item.commentId">
            <div class="user-header">
              <img v-lazy="item.user.avatarUrl" class="header-img" />
              <div style="flex: 1">
                <div class="header-name">{{ item.user.nickname }}</div>
                <div class="header-date">
                  <span>{{ dateFormat(item.time, 1) }}</span>
                  <span v-if="item.isHot"> · 精彩评论</span>
                </div>
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
  props: ["comments", "total"],
  name: "TheCommentsCard",
  data() {
    return {
      scrollObj: undefined,
      selectComments: [
        {
          name: "推荐"
        },
        {
          name: "最新"
        },
        {
          name: "最热"
        }
      ],
      selectCommentsCheckIndex: 0,
      commentsDefault: this.comments
    };
  },
  methods: {
    dateFormat(date, type) {
      return dateFormat(date, type);
    }
  },
  mounted() {
    this.scrollObj = initScrollY(this.$refs.scroll, true);
    this.scrollObj.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  watch: {
    comments() {
      this.scrollObj.finishPullUp();
    }
  }
};
</script>

<style scoped lang="scss">
.comments-card {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  color: $title;

  .scroll-container {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .comments-hot,
    .comments-normal {
      padding: 0.2rem 0;

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
            font-size: 0.18rem;
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
          line-height: 0.5rem;
          padding-bottom: 0.2rem;
          border-bottom: 0.1px solid $white-smoke;
          color: #000000;
        }
      }
    }
  }
}
</style>
