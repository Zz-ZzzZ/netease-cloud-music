<template>
  <div id="app">
    <transition name="view">
      <router-view class="router-view" />
    </transition>
    <Player v-show="playList.length > 0" />
  </div>
</template>

<script>
import Player from "./layout/Player";
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Player },
  computed: {
    playList() {
      return this.$store.state.playList.playList;
    }
  }
};
</script>
<style lang="scss">
@import "style/base";
.router-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.view-enter,
.view-leave-to {
  opacity: 0;
}
.view-leave-to {
  display: none;
}
.view-enter-active,
.view-leave-active {
  transition: opacity 0.5s;
}
.view-enter-to,
.view-leave {
  opacity: 1;
}
</style>
