<template>
  <div class="top-list">
    <h2>官方榜</h2>
    <div class="official">
      <div
        class="official-container"
        v-for="item in officialList"
        :key="item.id"
        @click="setPlayList(item.id)"
      >
        <div class="container-img">
          <img :src="item.coverImgUrl" />
          <span>{{ item.updateFrequency }}</span>
        </div>
        <div class="container-tracks">
          <p v-for="(item, index) in item.tracks" :key="index" class="tracks">
            {{ index + 1 }}. {{ item.first }} - {{ item.second }}
          </p>
        </div>
      </div>
    </div>

    <h2>更多榜单</h2>
    <div class="other">
      <div
        class="other-container"
        v-for="item in otherList"
        :key="item.id"
        @click="setPlayList(item.id)"
      >
        <div class="container-img">
          <img :src="item.coverImgUrl" />
          <span>{{ item.updateFrequency }}</span>
        </div>
        <div class="container-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTopList } from "@/api/song";

export default {
  name: "TopList",
  data() {
    return {
      topList: []
    };
  },
  methods: {
    setPlayList(id) {
      this.$router.push({ path: `/play-list/${id}` });
    }
  },
  computed: {
    officialList() {
      return this.topList.filter(item => item.tracks.length > 0);
    },
    otherList() {
      return this.topList.filter(item => item.tracks.length === 0);
    }
  },
  async created() {
    const { list } = await getTopList();
    this.topList = list;
  }
};
</script>

<style scoped lang="scss">
.top-list {
  width: $container-width;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
  color: $title;

  .official {
    margin: 0.2rem 0;

    .official-container {
      width: 100%;
      height: 2rem;
      margin-bottom: 0.15rem;
      @include flex-box(row, flex-start, center);

      .container-img {
        width: 1.8rem;
        height: 1.8rem;
        margin-right: 0.2rem;
        position: relative;

        img {
          width: 1.8rem;
          height: 1.8rem;
          border-radius: 5px;
        }

        span {
          position: absolute;
          bottom: 0.05rem;
          left: 0.1rem;
          color: #ffffff;
          font-size: 0.21rem;
        }
      }

      .container-tracks {
        p {
          flex: 1;
          margin: 0.2rem 0;
          color: $content;
          @include text-one-ellipsis;
        }
      }
    }
  }

  .other {
    width: 100%;
    flex-wrap: wrap;
    @include flex-box(row, space-between, center);

    .other-container {
      margin-bottom: 0.1rem;

      .container-img {
        width: 2.15rem;
        height: 2.15rem;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }

        span {
          position: absolute;
          bottom: 0.05rem;
          left: 0.1rem;
          color: #ffffff;
          font-size: 0.21rem;
        }
      }

      .container-name {
        width: 2.1rem;
        margin: 0.2rem 0;
        @include text-one-ellipsis;
      }
    }
  }
}
h2 {
  margin-bottom: 0.2rem;
  font-size: 0.3rem;
}
</style>
