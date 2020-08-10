<template>
  <svg class="base-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  name: "BaseIcon",
  computed: {
    iconName() {
      return `#icon${this.iconClass}`;
    }
  }
};
</script>

<style scoped>
.base-icon {
  width: 0.5rem;
  height: 0.5rem;
  vertical-align: -0.075rem;
  fill: currentColor;
  overflow: hidden;
}
</style>
