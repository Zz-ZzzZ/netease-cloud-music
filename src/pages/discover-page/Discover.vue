<template>
  <div class="discover">
    <transition name="view">
      <router-view class="router-view" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "Discover"
};
</script>

<style scoped lang="scss">
.discover {
  width: 100%;
  height: calc(100% - 1rem);
  position: absolute;
  top: 1rem;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  .view-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .view-leave-to {
    opacity: 0;
    transform: translateX(100%);
    position: absolute;
  }
  .view-enter-active,
  .view-leave-active {
    transition: all 0.5s ease;
  }
}
</style>
