<template>
  <van-popup
    v-model="show"
    title="请选择"
    :close-on-click-overlay="false"
    position="bottom"
    round
    closeable
    @close="closeSelectSinger"
  >
    <div class="container-main">
      <h2>请选择需要查看的歌手</h2>
      <div class="singer-info" v-for="item in singerList" :key="item.id">
        <!--        <img v-lazy="item.picUrl" />-->
        <p>{{ item.name }}</p>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    singerList: {
      type: Array,
      default: () => []
    },
    selectSingerShow: {
      type: Boolean,
      default: false
    }
  },
  name: "TheSelectSingerPopup",
  data() {
    return {
      show: this.selectSingerShow
    };
  },
  methods: {
    closeSelectSinger() {
      this.$emit("close");
    }
  },
  watch: {
    selectSingerShow(val) {
      this.show = val;
    }
  }
};
</script>

<style scoped lang="scss">
.container-main {
  //width: 100%;
  margin: 0.3rem;
  .singer-info {
    //width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    @include flex-box(row, flex-start, center);
    img {
      width: 0.8rem;
      height: 0.8rem;
      margin-right: 0.2rem;
    }
    p {
      padding-bottom: 0.05rem;
      font-size: 0.35rem;
      color: $content;
      border-bottom: 1px solid $border;
      font-weight: bold;
    }
  }
}
</style>
