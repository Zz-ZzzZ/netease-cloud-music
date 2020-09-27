<template>
  <span class="tag">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "BaseSongTag"
};
</script>

<style scoped lang="scss">
.tag {
  font-size: 0.13rem;
  line-height: 0.16rem;
  color: $red;
  border: 0.75px solid $red;
  border-radius: 0.01rem;
  padding: 0 0.05rem 0 0.05rem;
  font-weight: bold;
  margin-right: 0.1rem;
}
</style>
