<template>
  <van-popup
    v-model="show"
    :close-on-click-overlay="false"
    position="bottom"
    round
    closeable
    @close="closeMore"
  >
    <div class="container" v-if="JSON.stringify(songObject) !== '{}'">
      <div class="popup-album">
        <img v-lazy="songObject.al.picUrl" />
        <div class="album-box">
          <p class="box-name">{{ songObject.name }}</p>
          <div class="box-author">
            <span v-for="(item, index) in songObject.ar" :key="item.id">
              {{
                songObject.ar.length - index !== 1
                  ? `${item.name} / `
                  : item.name
              }}
            </span>
          </div>
        </div>
      </div>

      <div class="popup-item">
        <BaseIcon icon="add-next" />
        <p class="item-label">下一首播放</p>
      </div>

      <div class="popup-item">
        <BaseIcon icon="add" />
        <p class="item-label">添加到歌单</p>
      </div>

      <div class="popup-item" @touchstart="setSingerId">
        <BaseIcon icon="singer" />
        <p class="item-label">歌手 :</p>
        <div class="item-value">
          <span v-for="(item, index) in songObject.ar" :key="item.id">
            {{
              songObject.ar.length - index !== 1 ? `${item.name} / ` : item.name
            }}
          </span>
        </div>
      </div>

      <div class="popup-item">
        <BaseIcon icon="album" />
        <p class="item-label">专辑 :</p>
        <p class="item-value">{{ songObject.al.name }}</p>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: ["moreButtonPopupShow", "songObject"],
  data() {
    return {
      show: this.moreButtonPopupShow
    };
  },
  name: "TheMoreButtonPopup",
  methods: {
    closeMore() {
      this.$emit("close");
    },
    setSingerId() {
      this.$emit("touchstart");
    }
  },
  watch: {
    moreButtonPopupShow(val) {
      this.show = val;
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 90%;
  margin: 0.7rem auto;

  .popup-album {
    height: 1.2rem;
    @include flex-box(row, flex-start, center);

    img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: $default-radius;
    }

    .album-box {
      // 图片宽度加margin宽度
      width: calc(100% - 1.4rem);
      height: 100%;
      margin-left: 0.2rem;
      @include flex-box(column, center, flex-start);

      .box-name {
        width: 100%;
        font-size: 0.3rem;
        font-weight: bold;
        @include text-one-ellipsis;
      }

      .box-author {
        width: 100%;
        margin-top: 0.2rem;
        font-size: 0.25rem;
        line-height: 0.3rem;
        color: $content;
        vertical-align: middle;
        @include text-one-ellipsis;
      }
    }
  }

  .popup-item {
    margin: 0.5rem 0;
    font-size: 0.27rem;
    line-height: 0.5rem;
    @include flex-box(row, flex-start, center);

    .item-label {
      margin-left: 0.2rem;
      margin-right: 0.1rem;
    }

    .item-value {
      flex: 1;
      font-size: 0.27rem;
      color: $content;
      vertical-align: middle;
      @include text-one-ellipsis;
    }
  }
}
</style>
