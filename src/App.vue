<template>
  <div id="app">
    <NavBar />
    <router-view />
    <Player />
  </div>
</template>

<style lang="scss">
@import "style/base";
</style>
<script>
import NavBar from "./layout/NavBar";
import Player from "./layout/Player";
export default {
  components: { Player, NavBar }
};
</script>
