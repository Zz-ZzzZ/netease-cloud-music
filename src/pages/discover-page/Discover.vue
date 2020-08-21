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

<style scoped lang="scss"></style>
