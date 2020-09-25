<template>
  <div class="home">
    <div class="navbar">
      <div class="navbar-left">
        <van-icon name="ellipsis" size="0.4rem" color="#2d3436" />
      </div>
      <div class="navbar-center">
        <div
          v-for="(item, index) in navbarList"
          :key="item.path"
          @touchstart="changeTab(index, item.path)"
          :class="checkedIndex === index ? 'checked' : ''"
          class="center-tabs"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="navbar-right" @touchstart="$router.push({ path: '/search' })">
        <van-icon name="search" size="0.4rem" color="#2d3436" />
      </div>
    </div>
    <router-view
      class="container"
      :class="playList.length > 0 ? 'show-player' : 'hide-player'"
    ></router-view>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      navbarList: [
        {
          name: "我的",
          path: "/myself"
        },
        {
          name: "发现",
          path: "/"
        },
        {
          name: "云村"
          // path: "/myself"
        },
        {
          name: "视频"
          // path: "/myself"
        }
      ],
      checkedIndex: 1
    };
  },
  computed: {
    playList() {
      return this.$store.state.playList.playList;
    }
  },
  methods: {
    changeTab(index, path) {
      this.checkedIndex = index;
      this.$router.push({ path });
    },
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {}
  }
};
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;

  .navbar {
    width: $container-width;
    height: 1rem;
    border-bottom: $border;
    margin: $margin-center;
    @include flex-box(row, flex-start, center);
    .navbar-left,
    .navbar-right {
      width: 10%;
      @include flex-box(row, center, center);
    }
    .navbar-center {
      width: 80%;
      @include flex-box(row, center, center);
      font-size: 0.3rem;
      color: $content;
      .center-tabs {
        width: 20%;
        @include flex-box(row, center, center);
      }
      .checked {
        font-size: 0.36rem;
        color: $title;
        transition: 0.1s linear;
        font-weight: 700;
      }
    }
  }

  .container {
    width: $container-width;
    margin: 0 auto;
    overflow-y: auto;
    height: 90%;
  }

  .show-player {
    height: calc(100% - 2rem);
  }

  .hide-player {
    height: calc(100% - 1rem);
  }
}
</style>
