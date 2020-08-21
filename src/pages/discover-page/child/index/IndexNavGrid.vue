<template>
  <div class="nav-grid">
    <div v-for="(icon, index) in icons" :key="index" class="grid-box">
      <BaseIcon :icon="icon.name" class="grid-icon" />
      <div class="grid-text">{{ icon.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexNavGrid",
  data() {
    return {
      icons: [
        {
          name: "date",
          text: "每日推荐"
        },
        {
          name: "play-list",
          text: "歌单"
        },
        {
          name: "rank",
          text: "排行榜"
        },
        {
          name: "radio",
          text: "电台"
        },
        {
          name: "live",
          text: "直播"
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.nav-grid {
  width: 100%;
  height: 1.5rem;
  font-size: 0.24rem;
  margin: 0.1rem 0;
  @include flex-box(row, flex-start, center);
  .grid-box {
    width: 20%;
    height: 100%;
    @include flex-box(column, center, center);
    .grid-icon {
      width: 0.6rem;
      height: 0.6rem;
      margin-bottom: 0.1rem;
      color: #ffffff;
      background: linear-gradient(to right, #ff5a4e, #ff1f12);
      padding: 0.1rem;
      border-radius: 50%;
    }
    .grid-text {
      color: $title;
    }
  }
}
</style>
