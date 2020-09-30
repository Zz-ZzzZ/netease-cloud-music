<template>
  <div class="base-singer">
    <img :src="imgUrl" v-if="imgUrl" />
    <img src="../assets/image/empty_img.jpg" v-else />
    <div class="name">
      <slot></slot>
    </div>
    <div class="account" v-if="account">
      <BaseIcon icon="geren" class="person" />
      已入驻
    </div>
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
    width: 1.4rem;
    height: 1.4rem;
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

    .person {
      width: 0.35rem;
      height: 0.35rem;
      background-color: $red;
      border-radius: 100%;
    }
  }
}
</style>
