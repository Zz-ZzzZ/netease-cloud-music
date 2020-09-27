<template>
  <div class="base-button" @touchstart="click">
    <BaseIcon :icon="icon" v-if="showIcon" class="button-icon" />
    <div class="button-label">
      <slot></slot>
    </div>
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
  border-radius: 20px;
  padding: 0.04rem 0.13rem;
  box-sizing: border-box;
  @include flex-box(row, center, center);

  .button-icon {
    width: 0.23rem;
    height: 0.23rem;
  }

  .button-label {
    color: $title;
    margin-left: 0.07rem;
  }
}
</style>
