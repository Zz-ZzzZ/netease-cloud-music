<template>
  <div class="nav-bar">
    <van-icon
      name="arrow-left"
      size="0.4rem"
      class="nav-left"
      color="#ffffff"
    />
    <div class="nav-center">
      <slot></slot>
    </div>
    <div class="nav-right"></div>
  </div>
</template>

<script>
export default {
  name: "BaseNavBar"
};
</script>

<style scoped lang="scss">
.nav-bar {
  width: $container-width;
  height: 1rem;
  background-color: transparent;
  //background: #747d8c;
  position: relative;
  top: 0;
  left: 0;
  margin: 0 auto;
  @include flex-box(row, flex-start, center);

  .nav-left {
  }

  .nav-center {
    flex: 1;
    font-size: 0.32rem;
    margin-left: 0.4rem;
    font-weight: bold;
    color: $background-color;
  }

  .nav-right {
  }
}
</style>
