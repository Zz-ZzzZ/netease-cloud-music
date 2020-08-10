<template>
  <div class="base-button" @touchstart="click">
    <BaseIcon :icon-class="icon" v-if="showIcon" />
    <slot class="button-label"></slot>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ""
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  name: "BaseButton",
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped lang="scss">
.base-button {
  width: 100%;
  height: 100%;
  border: 1px solid $border;
  border-radius: 10px;
  padding: 0.03rem 0.15rem;
  box-sizing: border-box;
  @include flex-box(row, center, center);
  .button-label {
    color: $title;
  }
}
</style>
