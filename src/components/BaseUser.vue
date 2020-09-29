<template>
  <div class="base-user">
    <img :src="imgUrl" />
    <div class="user-main">
      <div class="name">{{ name }}</div>
      <div class="desc">{{ description }}</div>
    </div>
    <div class="followed">关注</div>
  </div>
</template>

<script>
export default {
  props: ["imgUrl", "name", "followed", "description"],
  name: "BaseUser"
};
</script>

<style scoped lang="scss">
.base-user {
  margin-bottom: 0.2rem;
  @include flex-box(row, flex-start, center);

  img {
    object-fit: cover;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
    margin-right: 0.2rem;
  }

  .user-main {
    flex: 1;

    .name {
      font-size: 0.27rem;
      @include text-one-ellipsis;
    }

    .desc {
      color: $content;
      margin-top: 0.2rem;
    }
  }
  .followed {
    color: $content;
  }
}
</style>
