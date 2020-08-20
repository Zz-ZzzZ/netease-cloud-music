<template>
  <div class="discover">
    <transition name="view">
      <router-view />
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
}
</style>
