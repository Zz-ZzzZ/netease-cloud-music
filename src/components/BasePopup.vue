<template>
  <van-popup
    v-model="show"
    title="请选择"
    :close-on-click-overlay="false"
    position="bottom"
    round
    closeable
    @close="close"
  >
    <div class="container" v-if="JSON.stringify(songObject) !== '{}'">
      <div class="popup-album">
        <img v-lazy="songObject.al.picUrl" />
        <div class="author-box">
          <p>{{ songObject.al.name }}</p>
          <div class="author">
            <span v-for="(item, index) in songObject.ar" :key="item.id">
              {{
                songObject.ar.length - index !== 1 ? `${item.name}/` : item.name
              }}
            </span>
          </div>
        </div>
      </div>

      <div class="popup-item">
        <BaseIcon icon="xiayishou" />
        <p>下一首播放</p>
      </div>

      <div class="popup-item">
        <BaseIcon icon="tianjia" />
        <p>添加到歌单</p>
      </div>

      <div class="popup-item">
        <BaseIcon icon="geshou" />
        <p>歌手 :</p>
        <p v-for="(item, index) in songObject.ar" :key="item.id">
          {{ songObject.ar.length - index !== 1 ? `${item.name}/` : item.name }}
        </p>
      </div>

      <div class="popup-item">
        <BaseIcon icon="zhuanji" />
        <p>专辑 :</p>
        <p>{{ songObject.al.name }}</p>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: ["actionSheetShow", "songObject"],
  data() {
    return {
      show: false
    };
  },
  name: "BasePopup",
  methods: {
    close() {
      this.$emit("close");
    }
  },
  watch: {
    actionSheetShow(val) {
      this.show = val;
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 0.5rem 0.4rem 0 0.4rem;

  .popup-item {
    font-size: 0.3rem;
    line-height: 0.3rem;
    margin-bottom: 0.6rem;
    @include flex-box(row, flex-start, center);

    :first-child {
      width: 0.45rem;
      height: 0.45rem;
    }

    p:nth-child(2) {
      margin-left: 0.3rem;
      margin-right: 0.1rem;
    }
  }
  .popup-album {
    font-size: 0.3rem;
    margin-bottom: 0.6rem;
    @include flex-box(row, flex-start, center);
    height: 1rem;

    img {
      width: 1rem;
      height: 1rem;
      display: block;
      border-radius: $default-radius;
    }

    .author-box {
      @include flex-box(column, center, space-around);
      margin-left: 0.3rem;

      p:first-child {
        font-size: 0.28rem;
      }

      .author {
        margin-top: 0.1rem;
        font-size: 0.23rem;
        color: $content;
        @include flex-box(row, flex-start, center);
      }
    }
  }
}
</style>
