<template>
  <div class="check-more">
    <div>{{ text }}</div>
    <BaseIcon icon="arrow-gray" />
  </div>
</template>

<script>
export default {
  props: ["text"],
  name: "BaseCheckMore"
};
</script>

<style scoped lang="scss">
.check-more {
  line-height: 0.25rem;
  color: $content;
  font-size: 0.24rem;
  @include flex-box(row, center, center);
}
</style>
