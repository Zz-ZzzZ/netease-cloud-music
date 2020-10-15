<template>
  <div class="base-user">
    <img :src="imgUrl" />
    <div class="user-main">
      <div class="name">{{ name }}</div>
      <div class="desc" v-if="description">{{ description }}</div>
    </div>
    <div class="followed">
      <BaseIcon icon="add2" class="add" />
      <div>关注</div>
    </div>
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
  height: 1.5rem;
  margin-bottom: 0.2rem;
  @include flex-box(row, flex-start, center);

  img {
    object-fit: cover;
    width: 1.5rem;
    border-radius: 100%;
    margin-right: 0.2rem;
  }

  .user-main {
    flex: 1;
    overflow-x: hidden;

    .name {
      font-size: 0.27rem;
      @include text-one-ellipsis;
    }

    .desc {
      color: $content;
      margin-top: 0.15rem;
    }
  }
  .followed {
    color: $red;
    border: 1px solid $red;
    border-radius: 0.25rem;
    padding: 0.05rem 0.2rem;
    @include flex-box(row, flex-start, center);
    .add {
      width: 0.27rem;
      height: 0.27rem;
    }
  }
}
</style>
