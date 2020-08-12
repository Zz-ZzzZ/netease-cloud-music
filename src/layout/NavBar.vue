<template>
  <div>
    <div class="navbar" v-if="$route.meta.showBackBar === false">
      <div class="navbar-left">
        <van-icon name="ellipsis" size="0.4rem" color="#2d3436" />
      </div>
      <div class="navbar-center">
        <div
          v-for="(item, index) in navbarList"
          :key="item.path"
          @touchstart="changeTab(index)"
          :class="checkedIndex === index ? 'checked' : ''"
          class="center-tabs"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="navbar-right">
        <van-icon name="search" size="0.4rem" color="#2d3436" />
      </div>
    </div>
    <van-nav-bar
      v-else
      :title="this.$route.name"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      navbarList: [
        {
          name: "我的"
          // path: "/myself"
        },
        {
          name: "发现"
          // path: "/myself"
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
  methods: {
    changeTab(index) {
      this.checkedIndex = index;
    },
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {}
  }
};
</script>

<style scoped lang="scss">
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
/deep/.van-nav-bar {
  height: 1rem;
}
</style>
