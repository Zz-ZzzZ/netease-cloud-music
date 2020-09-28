<template>
  <div class="base-mlog">
    <div class="mlog-img">
      <img :src="imgUrl" />
      <div class="img-tag" v-if="tag">
        {{ tag }}
      </div>
    </div>
    <div class="mlog-title">{{ title }}</div>
    <div class="mlog-user">
      <img :src="userImg" />
      <span class="name">{{ userName }}</span>
      <span class="like">{{ userLike }}赞</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["imgUrl", "tag", "title", "userImg", "userName", "userLike"],
  name: "BaseMlog"
};
</script>

<style scoped lang="scss">
.base-mlog {
  width: 3.4rem;
  height: 4.8rem;
  background-color: #ffffff;
  margin-bottom: 0.2rem;
  box-shadow: $shadow;
  border-radius: $default-radius;
  overflow: hidden;

  .mlog-img {
    width: 100%;
    height: 3.3rem;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .img-tag {
      color: #ffffff;
      position: absolute;
      bottom: 0.15rem;
      left: 0.15rem;
      right: 0.15rem;
      padding: 0.05rem 0.1rem;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 1rem;
      text-align: center;
      @include text-one-ellipsis;
    }
  }

  .mlog-title {
    height: 0.65rem;
    margin: 0.2rem 0.2rem;
    @include text-more-ellipsis(2);
  }

  .mlog-user {
    margin: 0 0.2rem;
    color: $content;
    @include flex-box(row, flex-start, center);

    img {
      width: 0.3rem;
      border-radius: 100%;
      margin-right: 0.1rem;
    }

    .name {
      flex: 1;
      @include text-one-ellipsis;
    }

    .like {
      line-height: 0.21rem;
      font-size: 0.21rem;
    }
  }
}
</style>
