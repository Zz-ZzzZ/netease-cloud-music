<template>
  <van-popup
    v-model="show"
    position="bottom"
    round
    closeable
    :lock-scroll="false"
    @close="$emit('closePlayerPlayListPopup')"
    :lazy-render="false"
  >
    <div class="container">
      <h2>当前播放({{ playList.length }})</h2>
      <div class="container-playlist" ref="scroll">
        <div>
          <div
            class="container-song"
            :class="index === nowPlayIndex ? 'is-playing' : ''"
            v-for="(item, index) in playList"
            :key="item.id"
            ref="songItem"
            @click="$emit('setNowPlayIndex', index)"
          >
            <BaseIcon
              icon="is-playing"
              v-if="index === nowPlayIndex"
              style="margin-right: 0.1rem;"
            />
            <span class="is-vip" v-if="item.fee === 1">VIP</span>
            <div class="song-name">{{ item.name }}</div>
            <span class="song-divider" v-if="item.ar"> - </span>
            <div class="song-ar">
              <span v-for="(ar, index) in item.ar" :key="ar.id">
                {{ item.ar.length - index === 1 ? ar.name : `${ar.name} / ` }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { initScrollY } from "@/utils/scroll";

export default {
  props: ["popupShow", "playList", "nowPlayIndex"],
  name: "PlayerPlayListPopup",
  data() {
    return {
      show: false,
      scrollObj: {}
    };
  },
  watch: {
    popupShow(val) {
      this.show = val;
    }
  },
  updated() {
    this.scrollObj = initScrollY(this.$refs.scroll);
    this.scrollObj.scrollToElement(
      this.$refs.songItem[this.nowPlayIndex],
      100,
      false,
      true
    );
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 90%;
  height: 5.5rem;
  margin: 0.5rem auto;

  .container-playlist {
    width: 100%;
    height: 5rem;
    margin-top: 0.2rem;
    overflow-y: hidden;

    .container-song {
      height: 0.5rem;
      margin-bottom: 0.35rem;
      @include flex-box(row, flex-start, center);
    }

    .is-playing {
      color: $red;
    }

    .is-vip {
      color: $red;
      border: 0.75px solid $red;
      border-radius: 0.05rem;
      padding: 0 0.1rem;
      font-weight: bold;
      margin-right: 0.1rem;
      margin-left: 0.1rem;
    }

    .song-name {
      font-size: 0.28rem;
      @include text-one-ellipsis;
    }

    .song-divider {
      margin: 0 0.1rem;
    }

    .song-ar {
      color: $content;
      @include text-one-ellipsis;
    }
  }
}
</style>
