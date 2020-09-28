<template>
  <div class="base-singer">
    <img :src="imgUrl" />
    <div class="name">{{ name }}</div>
    <div class="account" v-if="account">已入驻</div>
  </div>
</template>

<script>
export default {
  props: ["imgUrl", "name", "account"],
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
  }

  .account {
    color: $content;
  }
}
</style>
