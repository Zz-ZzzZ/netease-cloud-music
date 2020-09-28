<template>
  <div class="base-album">
    <div class="album-img">
      <img :src="imgUrl" class="img-main" />
    </div>
    <div class="album-main">
      <div class="album-main-top">{{ name }}</div>
      <div class="album-main-bottom">
        <span v-for="(item, index) in artist" :key="item.id">{{
          artist.length - index === 1 ? item.name : `${item.name} / `
        }}</span>
        <span class="date">{{ dateFormat(date, 2) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "@/utils/utils";

export default {
  props: ["imgUrl", "name", "artist", "date"],
  name: "BaseAlbum",
  methods: {
    dateFormat(data, type) {
      return dateFormat(data, type);
    }
  }
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
    &-top {
      font-size: 0.28rem;
      @include text-one-ellipsis;
    }

    &-bottom {
      color: $content;
      margin-top: 0.2rem;
      @include text-one-ellipsis;

      .date {
        margin-left: 0.15rem;
      }
    }
  }
}
</style>
