<template>
  <div class="base-album">
    <div class="album-img">
      <img :src="imgUrl" class="img-main" />
    </div>
    <div class="album-main">
      <div class="album-main-top">
        <slot name="name"></slot>
      </div>
      <div class="album-main-bottom">
        <slot name="other"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["imgUrl", "name", "artist", "date", "highText"],
  name: "BaseAlbum"
};
</script>

<style scoped lang="scss">
.base-album {
  margin-bottom: 0.2rem;
  @include flex-box(row, flex-start, center);

  .album-img {
    width: 1.75rem;
    height: 1.5rem;
    margin-right: 0.2rem;
    background-image: url("../assets/image/album_bg.png");
    background-size: 1.75rem 1.5rem;

    .img-main {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .album-main {
    * {
      @include text-one-ellipsis;
    }

    &-top {
      font-size: 0.28rem;
    }

    &-bottom {
      color: $content;
      margin-top: 0.2rem;

      .date {
        margin-left: 0.15rem;
      }
    }
  }
}
</style>
