<template>
  <div class="tabs-index">
    <div class="singer-info-top">
      <div class="top-label">歌手简介</div>
      <BaseButton class="top-more">
        更多信息
      </BaseButton>
    </div>
    <div class="singer-info-bottom">
      <p>{{ desc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["desc"],
  name: "SingerDetailTabsIndex"
};
</script>

<style scoped lang="scss">
.tabs-index {
  width: 100%;
  margin: 0.2rem 0;
  .singer-info-top {
    @include flex-box(row, space-between, center);

    .top-label {
      font-size: 0.35rem;
      font-weight: bold;
    }

    .top-more {
      width: 1.4rem;
    }
  }

  .singer-info-bottom {
    margin-top: 0.2rem;
    width: 100%;
    height: 3.5rem;
    @include text-more-ellipsis(7);
    p {
      color: $content;
      line-height: 0.5rem;
      font-size: 0.25rem;
    }
  }
}
</style>
