<template>
  <div class="bg-container">
    <div class="myself">
      <!-- 个人信息 -->
      <div class="person-info">
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="info-avatar" />
        <div class="info-main">
          <div class="username" @click="showLogin = true">请先登录</div>
          <div class="tag">
            <i class="tag-level">LV.7</i>
          </div>
        </div>
        <BaseIcon icon="arrow-gray" />
      </div>
      <!-- 功能应用 -->
      <div class="person-application-container">
        <div class="person-application">
          <div
            class="application-item"
            v-for="(item, index) in iconList"
            :key="index"
          >
            <BaseIcon :icon="item.name" class="item-icon" />
            <div>{{ item.title }}</div>
          </div>
        </div>
      </div>
      <!-- 我喜欢的音乐 -->
      <div class="person-like">
        <BaseIcon icon="like-red" class="like-icon" />
        <div class="like-main">
          <div class="title">我喜欢的音乐</div>
          <div class="count">999首</div>
        </div>
        <div class="like-heart-beat">
          <BaseIcon icon="heart-beat" class="icon" />
          <div>心动模式</div>
        </div>
      </div>
    </div>
    <Login :show-login="showLogin" />
  </div>
</template>

<script>
import Login from "@/pages/myself-page/child/login/Login";
export default {
  name: "index",
  components: { Login },
  data() {
    return {
      iconList: [
        {
          name: "download",
          title: "本地音乐"
        },
        {
          name: "select",
          title: "云盘"
        },
        {
          name: "comment",
          title: "已购"
        },
        {
          name: "share",
          title: "最近播放"
        },
        {
          name: "radio",
          title: "我的好友"
        },
        {
          name: "rank",
          title: "收藏和赞"
        },
        {
          name: "date",
          title: "我的电台"
        },
        {
          name: "play-list",
          title: "音乐应用"
        }
      ],
      showLogin: false
    };
  }
};
</script>

<style scoped lang="scss">
.bg-container {
  background: #f8f8f8;

  .myself {
    width: $container-width;
    margin: 0 auto;
    height: 100%;

    .person-info {
      margin-top: 0.5rem;
      padding-left: 0.2rem;
      @include flex-box(row, flex-start, center);

      .info-avatar {
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
      }

      .info-main {
        margin-left: 0.3rem;
        flex: 1;

        .username {
          font-size: 0.3rem;
          font-weight: bold;
          letter-spacing: 0.01rem;
          margin-bottom: 0.15rem;
        }

        .tag {
          @include flex-box(row, flex-start, center);

          .tag-level {
            font-weight: 650;
            font-size: 0.2rem;
            background: $global-background;
            border-radius: 20px;
            padding: 0.03rem 0.15rem;
          }
        }
      }
    }

    .person-application-container {
      margin-top: 0.3rem;
      width: 100%;
      background: $global-background;
      border-radius: 10px;
      padding-top: 0.1rem;

      .person-application {
        width: $container-width;
        height: 3rem;
        margin: $margin-center;
        flex-wrap: wrap;
        @include flex-box(row, flex-start, center);

        .application-item {
          flex: none;
          width: 25%;
          height: 1.5rem;
          color: $gray;
          @include flex-box(column, center, center);

          .item-icon {
            width: 0.4rem;
            height: 0.4rem;
            background: linear-gradient(to right, #ff5a4e, #ff1f12);
            padding: 0.1rem;
            border-radius: 50%;
            margin-bottom: 0.15rem;
          }
        }
      }
    }

    .person-like {
      margin-top: 0.3rem;
      width: 100%;
      height: 1.5rem;
      background: $global-background;
      border-radius: 10px;
      @include flex-box(row, flex-start, center);

      .like-icon {
        margin-left: 0.3rem;
        background: $white-smoke;
        padding: 0.25rem;
        border-radius: 10px;
      }

      .like-main {
        flex: 1;
        margin-left: 0.2rem;

        .title {
          font-size: 0.28rem;
        }

        .count {
          font-size: 0.21rem;
          color: $content;
        }
      }

      .like-heart-beat {
        border: 1px solid $border;
        border-radius: 20px;
        font-size: 0.2rem;
        padding: 0.01rem 0.1rem;
        margin-right: 0.2rem;
        @include flex-box(row, flex-start, center);

        .icon {
          width: 0.4rem;
          height: 0.4rem;
        }
      }
    }
  }
}
</style>
