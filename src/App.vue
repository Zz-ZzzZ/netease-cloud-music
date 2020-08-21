<template>
  <div id="app">
    <NavBar />
    <transition name="view">
      <router-view class="router-view" />
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
.router-view {
  width: 100%;
  height: calc(100% - 2rem);
  overflow-y: scroll;
  overflow-x: hidden;
}
.view-enter {
  visibility: hidden;
  opacity: 0;
}
.view-leave-to {
  display: none;
}
.view-enter-active,
.view-leave-active {
  transition: opacity 0.5s ease;
}
.view-enter-to,
.view-leave {
  visibility: visible;
  opacity: 1;
}
</style>
