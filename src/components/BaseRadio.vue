<template>
  <div class="base-radio">
    <img :src="imgUrl" />
    <div class="radio-main">
      <div class="name">
        <slot name="name"></slot>
      </div>
      <div class="ar">
        <slot name="ar"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["imgUrl"],
  name: "BaseRadio"
};
</script>

<style scoped lang="scss">
.base-radio {
  margin-bottom: 0.2rem;
  @include flex-box(row, flex-start, center);

  img {
    width: 1.5rem;
    height: 1.5rem;
    object-fit: cover;
    border-radius: $default-radius;
    margin-right: 0.2rem;
  }

  .radio-main {
    * {
      @include text-one-ellipsis;
    }

    .name {
      font-size: 0.27rem;
    }
    .ar {
      color: $content;
      margin-top: 0.15rem;
      @include flex-box(row, flex-start, center);
    }
  }
}
</style>
