<template>
  <div id="app">
    <NavBar />
    <transition name="view">
      <router-view />
    </transition>
    <Player />
  </div>
</template>

<script>
import NavBar from "./layout/NavBar";
import Player from "./layout/Player";
export default {
  components: { Player, NavBar }
};
</script>
<style lang="scss">
@import "style/base";
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
</style>
