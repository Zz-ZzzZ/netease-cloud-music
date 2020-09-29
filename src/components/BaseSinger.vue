<template>
  <div class="base-singer">
    <img :src="imgUrl" />
    <div class="name">
      <slot></slot>
    </div>
    <div class="account" v-if="account">已入驻</div>
  </div>
</template>

<script>
export default {
  props: ["imgUrl", "account"],
  name: "BaseSinger"
};
</script>

<style scoped lang="scss">
.base-singer {
  margin-bottom: 0.2rem;
  @include flex-box(row, flex-start, center);

  img {
    object-fit: cover;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
    margin-right: 0.2rem;
  }

  .name {
    flex: 1;
    font-size: 0.27rem;
    @include text-one-ellipsis;
  }

  .account {
    color: $content;
  }
}
</style>
