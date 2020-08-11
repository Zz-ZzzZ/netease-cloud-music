<template>
  <div class="discover">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Discover"
};
</script>

<style scoped>
.discover {
  width: 100%;
  height: calc(100% - 1rem);
  overflow-y: auto;
}
</style>
